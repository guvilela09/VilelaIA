export interface AgentConfig {
  apiKey?: string;
  apiUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  language?: 'pt-BR' | 'en';
}

export interface TaskRequest {
  type: 'build' | 'fix' | 'review' | 'explain' | 'generate' | 'refactor' | 'landing-page' | 'website' | 'webapp' | 'seo';
  description: string;
  context?: string;
  file?: string;
  language?: string;
  template?: 'modern' | 'classic' | 'minimal' | 'bold';
}

export interface TaskResponse {
  success: boolean;
  result?: string;
  error?: string;
  metadata?: {
    tokensUsed?: number;
    executionTime?: number;
  };
}

export interface FrontendSpecialist {
  html: boolean;
  css: boolean;
  javascript: boolean;
  react: boolean;
  typescript: boolean;
  accessibility: boolean;
  performance: boolean;
}
