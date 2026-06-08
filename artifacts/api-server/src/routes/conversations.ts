import { Router } from "express";
import { db } from "@vilelaia/db";
import { conversationsTable, messagesTable } from "@vilelaia/db";
import { eq, desc, count } from "drizzle-orm";
import { CreateConversationBody, SendMessageBody, GetConversationParams, DeleteConversationParams, ListMessagesParams, SendMessageParams } from "@vilelaia/api-zod";
import OpenAI from "openai";

const router = Router();

let openai: OpenAI | null = null;

if (process.env.OPENCODE_GO_API_KEY) {
  openai = new OpenAI({ 
    apiKey: process.env.OPENCODE_GO_API_KEY,
    baseURL: "https://opencode.ai/zen/go/v1"
  });
}

const SYSTEM_PROMPT = `Voce e um agente especialista em desenvolvimento web, design de interfaces, e criacao de software para a web. Seu nome e VilelaIA.

Suas especialidades incluem:
- Landing pages de alta conversao: estrutura, copywriting persuasivo, hierarquia visual, CTAs eficazes
- Design de interfaces (UI/UX): principios de design, sistemas de design, acessibilidade, responsividade
- Desenvolvimento frontend: React, Next.js, Tailwind CSS, animacoes, performance
- Desenvolvimento backend: Node.js, APIs REST e GraphQL, bancos de dados, autenticacao
- E-commerce e SaaS: arquitetura, fluxos de conversao, onboarding, metricas
- SEO tecnico e otimizacao de performance
- Melhores praticas de codigo: clean code, componentizacao, TypeScript, testes

Ao responder:
- Seja direto e pratico. Forneça exemplos de codigo quando relevante.
- Use Markdown para formatar respostas: headers, listas, blocos de codigo com sintaxe correta.
- Para landing pages e sites, forneça estrutura de secoes, copy sugerido, e codigo HTML/CSS/React quando solicitado.
- Para questoes tecnicas, explique o raciocinio e forneça implementacoes completas e funcionais.
- Nao seja generico. Adapte cada resposta ao contexto especifico do usuario.
- Responda em portugues quando o usuario escrever em portugues.`;

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

    const [conversation] = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.id, conversationId));

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    await db.insert(messagesTable).values({
      conversationId,
      role: "user",
      content: userContent,
    });

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

    const history = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId))
      .orderBy(messagesTable.createdAt);

    const chatMessages = history.map((m: typeof history[0]) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let fullResponse = "";

    if (!openai) {
      res.write(`data: ${JSON.stringify({ error: "OPENCODE_GO_API_KEY not configured" })}\n\n`);
      res.end();
      return;
    }

    const stream = await openai.chat.completions.create({
      model: "qwen3.7-plus",
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
