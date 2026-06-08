import OpenAI from 'openai';
import { TaskRequest, TaskResponse, AgentConfig } from './types.js';

export class FrontendAgent {
  private client: OpenAI;
  private config: AgentConfig;
  private systemPrompt: string;

  constructor(config: AgentConfig = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.OPENCODE_GO_API_KEY,
      apiUrl: config.apiUrl || 'https://opencode.ai/zen/go/v1',
      model: config.model || 'qwen3.7-plus',
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 2048,
      language: config.language || 'pt-BR',
    };

    this.client = new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.apiUrl,
    });

    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    const language = this.config.language === 'pt-BR' ? 'portugues' : 'ingles';
    return `Voce e um Programador Senior especializado em Frontend com mais de 10 anos de experiencia.

ESPECIALIDADES:
- HTML5 semantico e acessivel
- CSS3 avancado (Flexbox, Grid, Animations)
- JavaScript vanilla com padroes modernos (ES2020+)
- React e hooks avancados
- TypeScript com tipos precisos
- Acessibilidade Web (WCAG 2.1)
- Performance e otimizacao
- Design patterns e best practices

COMPORTAMENTO:
1. Sempre explique o que esta fazendo e por que
2. Sugira melhorias e alternativas
3. Considere acessibilidade, performance e seguranca
4. Use comentarios claros no codigo
5. Siga as convencoes de nomenclatura
6. Teste suas solucoes mentalmente

FORMATO DE RESPOSTA:
- Para codigo: Use blocos de codigo com sintaxe highlighting
- Para explicacoes: Use markdown
- Para reviews: Liste pontos positivos e melhorias
- Para templates: Forneça arquivos completos e prontos

Responda em ${language}.`;
  }

  async process(task: TaskRequest): Promise<TaskResponse> {
    try {
      const userMessage = this.buildUserMessage(task);

      const startTime = Date.now();
      const response = await this.client.chat.completions.create({
        model: this.config.model || 'qwen3.7-plus',
        max_tokens: this.config.maxTokens || 2048,
        temperature: this.config.temperature,
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userMessage },
        ],
      });

      const executionTime = Date.now() - startTime;
      const result = response.choices?.[0]?.message?.content || '';

      return {
        success: true,
        result,
        metadata: {
          tokensUsed: response.usage?.total_tokens,
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
        `Crie um componente/pagina com a seguinte descricao:\n"${t.description}"\n${t.context ? `Contexto: ${t.context}` : ''}`,
      
      fix: (t) =>
        `Encontre e corrija os problemas neste codigo:\n\`\`\`\n${t.context}\n\`\`\`\nProblema: ${t.description}`,
      
      review: (t) =>
        `Faca uma review tecnica deste codigo e sugira melhorias:\n\`\`\`\n${t.context}\n\`\`\`\nFoco: ${t.description}`,
      
      explain: (t) =>
        `Explique o que este codigo faz e como funciona:\n\`\`\`\n${t.context}\n\`\`\``,
      
      generate: (t) =>
        `Gere codigo para: ${t.description}${t.language ? `\nLinguagem: ${t.language}` : ''}`,
      
      refactor: (t) =>
        `Refatore este codigo para melhorar: ${t.description}\n\`\`\`\n${t.context}\n\`\`\``,
      
      'landing-page': (t) =>
        `Crie uma Landing Page de ALTA CONVERSAO com as seguintes caracteristicas:\n\nDescricao: "${t.description}"\nTemplate: ${t.template || 'modern'}\n\nREQUISITOS OBRIGATORIOS:\n1. Hero Section com CTA persuasivo\n2. Social Proof (logos, numeros, depoimentos)\n3. Beneficios/Features detalhados\n4. Secao de Precos (se aplicavel)\n5. FAQ completo\n6. CTA final poderoso\n7. Formulario de captura\n8. Mobile responsive\n9. SEO otimizado (meta tags, schema.org, Open Graph)\n10. Performance otimizada\n\nForneça o codigo completo HTML/CSS/JS pronto para usar.`,
      
      'website': (t) =>
        `Crie um Website PROFISSIONAL completo com:\n\nDescricao: "${t.description}"\nTemplate: ${t.template || 'modern'}\n\nPAGINAS OBRIGATORIAS:\n1. Home (Hero, Sobre, Servicos, Depoimentos, Blog, CTA)\n2. Sobre Nos (Historia, Missao, Valores, Equipe)\n3. Servicos (Lista completa com detalhes)\n4. Blog (Listagem e artigo modelo)\n5. Contato (Formulario, Mapa, Info)\n\nREQUISITOS:\n- Header fixo com navegacao intuitiva\n- Footer completo com links e redes sociais\n- Design responsivo mobile-first\n- SEO on-page otimizado\n- Velocidade de carregamento < 3s\n- Acessibilidade WCAG 2.1\n\nForneça o codigo completo HTML/CSS pronto para usar.`,
      
      'webapp': (t) =>
        `Crie uma Aplicacao Web Moderna com:\n\nDescricao: "${t.description}"\nFramework: ${t.language || 'react'}\n\nREQUISITOS:\n- Componentes reutilizaveis\n- State management\n- Formularios com validacao\n- Tratamento de erros\n- Loading states\n- Autenticacao (se necessario)\n- Testes unitarios\n- TypeScript (quando aplicavel)\n- Performance otimizada\n- Acessibilidade\n\nForneça a estrutura completa do projeto e codigo fonte.`,
      
      'seo': (t) =>
        `Analise e otimize o SEO deste codigo:\n\n\`\`\`\n${t.context}\n\`\`\`\n\nFoco: ${t.description}\n\nVERIFICAR:\n1. Meta tags (title, description, keywords)\n2. Schema.org structured data\n3. Open Graph e Twitter Cards\n4. Canonical URLs\n5. Sitemap XML\n6. Robots.txt\n7. Core Web Vitals\n8. HTML semantico\n9. Imagens (alt text, lazy loading)\n10. Links internos\n\nForneça o codigo otimizado e relatorio de melhorias.`,
    };

    return messages[task.type](task);
  }

  validateApiKey(): boolean {
    return Boolean(this.config.apiKey);
  }
}
