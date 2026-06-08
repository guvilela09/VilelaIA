import { Router } from "express";
import { db } from "@vilelaia/db";
import { conversationsTable, messagesTable } from "@vilelaia/db";
import { eq, desc, count } from "drizzle-orm";
import { CreateConversationBody, SendMessageBody, GetConversationParams, DeleteConversationParams, ListMessagesParams, SendMessageParams } from "@vilelaia/api-zod";
import Groq from "groq-sdk";

const router = Router();

let groq: Groq | null = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

const SYSTEM_PROMPT = `Você é um agente especialista em desenvolvimento web, design de interfaces, e criação de software para a web. Seu nome é Agente Vilela.

Suas especialidades incluem:
- Landing pages de alta conversão: estrutura, copywriting persuasivo, hierarquia visual, CTAs eficazes
- Design de interfaces (UI/UX): princípios de design, sistemas de design, acessibilidade, responsividade
- Desenvolvimento frontend: React, Next.js, Tailwind CSS, animações, performance
- Desenvolvimento backend: Node.js, APIs REST e GraphQL, bancos de dados, autenticação
- E-commerce e SaaS: arquitetura, fluxos de conversão, onboarding, métricas
- SEO técnico e otimização de performance
- Melhores práticas de código: clean code, componentização, TypeScript, testes

Ao responder:
- Seja direto e prático. Forneça exemplos de código quando relevante.
- Use Markdown para formatar respostas: headers, listas, blocos de código com sintaxe correta.
- Para landing pages e sites, forneça estrutura de seções, copy sugerido, e código HTML/CSS/React quando solicitado.
- Para questões técnicas, explique o raciocínio e forneça implementações completas e funcionais.
- Não seja genérico. Adapte cada resposta ao contexto específico do usuário.
- Responda em português quando o usuário escrever em português.`;

// GET /api/conversations
router.get("/conversations", async (req, res) => {
  try {
    const conversations = await db.select().from(conversationsTable).orderBy(desc(conversationsTable.updatedAt));

    const messageCounts = await db
      .select({ conversationId: messagesTable.conversationId, count: count() })
      .from(messagesTable)
      .groupBy(messagesTable.conversationId);

    const countMap = new Map(messageCounts.map((m: typeof messageCounts[0]) => [m.conversationId, Number(m.count)]));

    const result = conversations.map((c: typeof conversations[0]) => ({
      id: c.id,
      title: c.title,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      messageCount: countMap.get(c.id) ?? 0,
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list conversations");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/conversations
router.post("/conversations", async (req, res) => {
  try {
    const parsed = CreateConversationBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const [conversation] = await db
      .insert(conversationsTable)
      .values({ title: parsed.data.title })
      .returning();

    res.status(201).json({
      id: conversation.id,
      title: conversation.title,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
      messageCount: 0,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create conversation");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/conversations/:id
router.get("/conversations/:id", async (req, res) => {
  try {
    const parsed = GetConversationParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [conversation] = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.id, parsed.data.id));

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    const [{ msgCount }] = await db
      .select({ msgCount: count() })
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversation.id));

    res.json({
      id: conversation.id,
      title: conversation.title,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
      messageCount: Number(msgCount),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get conversation");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/conversations/:id
router.delete("/conversations/:id", async (req, res) => {
  try {
    const parsed = DeleteConversationParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    await db.delete(messagesTable).where(eq(messagesTable.conversationId, parsed.data.id));
    await db.delete(conversationsTable).where(eq(conversationsTable.id, parsed.data.id));

    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete conversation");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/conversations/:id/messages
router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const parsed = ListMessagesParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const msgs = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, parsed.data.id))
      .orderBy(messagesTable.createdAt);

    res.json(
      msgs.map((m: typeof msgs[0]) => ({
        id: m.id,
        conversationId: m.conversationId,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list messages");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/conversations/:id/messages — SSE streaming
router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const paramsParsed = SendMessageParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const bodyParsed = SendMessageBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const conversationId = paramsParsed.data.id;
    const userContent = bodyParsed.data.content;

    // Check conversation exists
    const [conversation] = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.id, conversationId));

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    // Save user message
    await db.insert(messagesTable).values({
      conversationId,
      role: "user",
      content: userContent,
    });

    // Update conversation title if it's the first message
    const [{ msgCount }] = await db
      .select({ msgCount: count() })
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId));

    if (Number(msgCount) === 1) {
      const shortTitle = userContent.slice(0, 60) + (userContent.length > 60 ? "..." : "");
      await db
        .update(conversationsTable)
        .set({ title: shortTitle, updatedAt: new Date() })
        .where(eq(conversationsTable.id, conversationId));
    } else {
      await db
        .update(conversationsTable)
        .set({ updatedAt: new Date() })
        .where(eq(conversationsTable.id, conversationId));
    }

    // Get conversation history
    const history = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId))
      .orderBy(messagesTable.createdAt);

    const chatMessages = history.map((m: typeof history[0]) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let fullResponse = "";

    if (!groq) {
      res.write(`data: ${JSON.stringify({ error: "GROQ_API_KEY not configured" })}\n\n`);
      res.end();
      return;
    }

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatMessages],
      stream: true,
      max_tokens: 8192,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Save assistant message
    await db.insert(messagesTable).values({
      conversationId,
      role: "assistant",
      content: fullResponse,
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Failed to send message");
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
      res.end();
    }
  }
});

export default router;
