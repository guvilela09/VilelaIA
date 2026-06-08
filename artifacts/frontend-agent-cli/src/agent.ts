import Groq from 'groq-sdk';
import { TaskRequest, TaskResponse, AgentConfig } from './types.js';

export class FrontendAgent {
  private client: Groq;
  private config: AgentConfig;
  private systemPrompt: string;

  constructor(config: AgentConfig = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.GROQ_API_KEY,
      model: config.model || 'mixtral-8x7b-32768',
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 2048,
      language: config.language || 'pt-BR',
    };

    this.client = new Groq({
      apiKey: this.config.apiKey,
    });

    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    const language = this.config.language === 'pt-BR' ? 'português' : 'inglês';
    return `Você é um Programador Senior especializado em Frontend com mais de 10 anos de experiência.

ESPECIALIDADES:
✓ HTML5 semântico e acessível
✓ CSS3 avançado (Flexbox, Grid, Animations)
✓ JavaScript vanilla com padrões modernos (ES2020+)
✓ React e hooks avançados
✓ TypeScript com tipos precisos
✓ Acessibilidade Web (WCAG 2.1)
✓ Performance e otimização
✓ Design patterns e best practices

COMPORTAMENTO:
1. Sempre explique o que está fazendo e por quê
2. Sugira melhorias e alternatives
3. Considere acessibilidade, performance e segurança
4. Use comentários claros no código
5. Siga as convenções de nomenclatura
6. Teste suas soluções mentalmente

FORMATO DE RESPOSTA:
- Para código: Use blocos de código com sintaxe highlighting
- Para explicações: Use markdown
- Para reviews: Liste pontos positivos e melhorias
- Para templates: Forneça arquivos completos e prontos

Responda em ${language}.`;
  }

  async process(task: TaskRequest): Promise<TaskResponse> {
    try {
      const userMessage = this.buildUserMessage(task);

      const startTime = Date.now();
      const response = await (this.client.chat.completions as any).create({
        model: this.config.model || 'mixtral-8x7b-32768',
        max_tokens: this.config.maxTokens || 2048,
        temperature: this.config.temperature,
        system: this.systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      });

      const executionTime = Date.now() - startTime;
      const result = response.choices?.[0]?.message?.content || '';

      return {
        success: true,
        result,
        metadata: {
          tokensUsed: response.usage?.input_tokens,
          executionTime,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Erro ao processar tarefa: ${errorMessage}`,
      };
    }
  }

  private buildUserMessage(task: TaskRequest): string {
    const messages: Record<TaskRequest['type'], (t: TaskRequest) => string> = {
      build: (t) => 
        `Crie um componente/página com a seguinte descrição:\n"${t.description}"\n${t.context ? `Contexto: ${t.context}` : ''}`,
      
      fix: (t) =>
        `Encontre e corrija os problemas neste código:\n\`\`\`\n${t.context}\n\`\`\`\nProblema: ${t.description}`,
      
      review: (t) =>
        `Faça uma review técnica deste código e sugira melhorias:\n\`\`\`\n${t.context}\n\`\`\`\nFoco: ${t.description}`,
      
      explain: (t) =>
        `Explique o que este código faz e como funciona:\n\`\`\`\n${t.context}\n\`\`\``,
      
      generate: (t) =>
        `Gere código para: ${t.description}${t.language ? `\nLinguagem: ${t.language}` : ''}`,
      
      refactor: (t) =>
        `Refatore este código para melhorar: ${t.description}\n\`\`\`\n${t.context}\n\`\`\``,
      
      'landing-page': (t) =>
        `Crie uma Landing Page de ALTA CONVERSÃO com as seguintes características:\n\nDescrição: "${t.description}"\nTemplate: ${t.template || 'modern'}\n\nREQUISITOS OBRIGATÓRIOS:\n1. Hero Section com CTA persuasivo\n2. Social Proof (logos, números, depoimentos)\n3. Benefícios/Features detalhados\n4. Seção de Preços (se aplicável)\n5. FAQ completo\n6. CTA final poderoso\n7. Formulário de captura\n8. Mobile responsive\n9. SEO otimizado (meta tags, schema.org, Open Graph)\n10. Performance otimizada\n\nForneça o código completo HTML/CSS/JS pronto para usar.`,
      
      'website': (t) =>
        `Crie um Website PROFissional completo com:\n\nDescrição: "${t.description}"\nTemplate: ${t.template || 'modern'}\n\nPÁGINAS OBRIGATÓRIAS:\n1. Home (Hero, Sobre, Serviços, Depoimentos, Blog, CTA)\n2. Sobre Nós (História, Missão, Valores, Equipe)\n3. Serviços (Lista completa com detalhes)\n4. Blog (Listagem e artigo modelo)\n5. Contato (Formulário, Mapa, Info)\n\nREQUISITOS:\n- Header fixo com navegação intuitiva\n- Footer completo com links e redes sociais\n- Design responsivo mobile-first\n- SEO on-page otimizado\n- Velocidade de carregamento < 3s\n- Acessibilidade WCAG 2.1\n\nForneça o código completo HTML/CSS pronto para usar.`,
      
      'webapp': (t) =>
        `Crie uma Aplicação Web Moderna com:\n\nDescrição: "${t.description}"\nFramework: ${t.language || 'react'}\n\nREQUISITOS:\n- Componentes reutilizáveis\n- State management\n- Formulários com validação\n- Tratamento de erros\n- Loading states\n- Autenticação (se necessário)\n- Testes unitários\n- TypeScript (quando aplicável)\n- Performance otimizada\n- Acessibilidade\n\nForneça a estrutura completa do projeto e código fonte.`,
      
      'seo': (t) =>
        `Analise e otimize o SEO deste código:\n\n\`\`\`\n${t.context}\n\`\`\`\n\nFoco: ${t.description}\n\nVERIFICAR:\n1. Meta tags (title, description, keywords)\n2. Schema.org structured data\n3. Open Graph e Twitter Cards\n4. Canonical URLs\n5. Sitemap XML\n6. Robots.txt\n7. Core Web Vitals\n8. HTML semântico\n9. Imagens (alt text, lazy loading)\n10. Links internos\n\nForneça o código otimizado e relatório de melhorias.`,
    };

    return messages[task.type](task);
  }

  validateApiKey(): boolean {
    return Boolean(this.config.apiKey);
  }
}
