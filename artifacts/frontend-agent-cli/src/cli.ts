#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { FrontendAgent } from './agent.js';
import { TaskRequest } from './types.js';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('vilela')
  .description('VilelaIA - Agente de IA com expertise em SEO, Landing Pages e Websites')
  .version('1.0.0');

// Comando: build
program
  .command('build <description>')
  .description('🏗️  Build um componente, página ou estrutura')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-c, --context <context>', 'Contexto adicional')
  .option('-l, --language <language>', 'Linguagem: html, css, js, react, ts')
  .action(async (description, options) => {
    await executeTask('build', description, options);
  });

// Comando: fix
program
  .command('fix <description>')
  .description('🔧 Corrigir bugs ou problemas no código')
  .option('-f, --file <file>', 'Arquivo com o código problemático')
  .option('-c, --context <context>', 'Código para revisar')
  .action(async (description, options) => {
    if (options.file && fs.existsSync(options.file)) {
      options.context = fs.readFileSync(options.file, 'utf-8');
    }
    await executeTask('fix', description, options);
  });

// Comando: review
program
  .command('review')
  .description('👀 Fazer code review detalhado')
  .option('-f, --file <file>', 'Arquivo para revisar')
  .option('-d, --depth <depth>', 'Profundidade: basic, standard, deep', 'standard')
  .action(async (options) => {
    if (!options.file || !fs.existsSync(options.file)) {
      console.error(chalk.red('❌ Arquivo não encontrado'));
      process.exit(1);
    }

    const context = fs.readFileSync(options.file, 'utf-8');
    const description = `Review ${options.depth} do arquivo`;
    await executeTask('review', description, { context });
  });

// Comando: explain
program
  .command('explain')
  .description('💡 Explicar código ou conceito')
  .option('-f, --file <file>', 'Arquivo para explicar')
  .option('-c, --code <code>', 'Código para explicar')
  .action(async (options) => {
    let context = options.code;
    
    if (options.file && fs.existsSync(options.file)) {
      context = fs.readFileSync(options.file, 'utf-8');
    }

    if (!context) {
      console.error(chalk.red('❌ Forneça código com -f ou -c'));
      process.exit(1);
    }

    await executeTask('explain', 'Explique este código', { context });
  });

// Comando: generate
program
  .command('generate <description>')
  .description('⚙️  Gerar código novo')
  .option('-l, --language <language>', 'Linguagem: html, css, js, react, ts', 'js')
  .option('-f, --file <file>', 'Salvar em arquivo')
  .action(async (description, options) => {
    const task: TaskRequest = {
      type: 'generate',
      description,
      language: options.language,
    };

    const agent = new FrontendAgent();
    if (!agent.validateApiKey()) {
      console.error(chalk.red('❌ GROQ_API_KEY não configurada'));
      console.log(chalk.yellow('💡 Configure: export GROQ_API_KEY=sua_chave'));
      process.exit(1);
    }

    const spinner = ora(chalk.cyan(`🤖 Gerando ${options.language}...`)).start();

    const response = await agent.process(task);
    spinner.stop();

    if (response.success && response.result) {
      console.log(chalk.green('\n✅ Código gerado com sucesso!\n'));
      console.log(response.result);

      if (options.file) {
        fs.writeFileSync(options.file, response.result);
        console.log(chalk.green(`\n✨ Salvo em: ${options.file}`));
      }

      console.log(chalk.gray(`\n📊 Tokens: ${response.metadata?.tokensUsed} | Tempo: ${response.metadata?.executionTime}ms`));
    } else {
      console.error(chalk.red(`\n❌ ${response.error}`));
      process.exit(1);
    }
  });

// Comando: refactor
program
  .command('refactor <file>')
  .description('♻️  Refatorar código existente')
  .option('-d, --description <description>', 'O que melhorar', 'melhorar qualidade e performance')
  .action(async (file, options) => {
    if (!fs.existsSync(file)) {
      console.error(chalk.red('❌ Arquivo não encontrado'));
      process.exit(1);
    }

    const context = fs.readFileSync(file, 'utf-8');
    await executeTask('refactor', options.description, { context, file });
  });

// Comando: teach
program
  .command('teach <topic>')
  .description('🎓 Aprenda sobre um tópico frontend')
  .option('-l, --level <level>', 'Nível: beginner, intermediate, advanced', 'intermediate')
  .action(async (topic, options) => {
    const agent = new FrontendAgent({ language: 'pt-BR' });
    
    if (!agent.validateApiKey()) {
      console.error(chalk.red('❌ GROQ_API_KEY não configurada'));
      process.exit(1);
    }

    const spinner = ora(chalk.cyan(`📚 Ensinando ${topic}...`)).start();

    const response = await agent.process({
      type: 'explain',
      description: `Ensine sobre "${topic}" no nível ${options.level}. Inclua exemplos práticos e dicas.`,
    });

    spinner.stop();

    if (response.success) {
      console.log(chalk.green('\n✅ Aula preparada!\n'));
      console.log(response.result);
    } else {
      console.error(chalk.red(`\n❌ ${response.error}`));
      process.exit(1);
    }
  });

// Comando: landing-page (lp)
program
  .command('landing-page <description>')
  .alias('lp')
  .description('🎯 Criar Landing Page de alta conversão')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-t, --template <template>', 'Template: modern, classic, minimal, bold', 'modern')
  .action(async (description, options) => {
    await executeTask('landing-page', description, { ...options, template: options.template });
  });

// Comando: website (site)
program
  .command('website <description>')
  .alias('site')
  .description('🌐 Criar Website profissional completo')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-t, --template <template>', 'Template: modern, classic, minimal, bold', 'modern')
  .action(async (description, options) => {
    await executeTask('website', description, { ...options, template: options.template });
  });

// Comando: webapp (app)
program
  .command('webapp <description>')
  .alias('app')
  .description('⚡ Criar Aplicação Web moderna')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-l, --language <language>', 'Framework: react, vue, angular, nextjs, nuxt', 'react')
  .action(async (description, options) => {
    await executeTask('webapp', description, options);
  });

// Comando: seo
program
  .command('seo')
  .description('🔍 Otimizar SEO de código existente')
  .option('-f, --file <file>', 'Arquivo para otimizar')
  .option('-c, --code <code>', 'Código para otimizar')
  .option('-d, --description <description>', 'Foco da otimização', 'SEO geral')
  .action(async (options) => {
    let context = options.code;
    
    if (options.file && fs.existsSync(options.file)) {
      context = fs.readFileSync(options.file, 'utf-8');
    }

    if (!context) {
      console.error(chalk.red('❌ Forneça código com -f ou -c'));
      process.exit(1);
    }

    await executeTask('seo', options.description, { context });
  });

// Comando: config
program
  .command('config')
  .description('⚙️  Gerenciar configurações')
  .option('--set-key <key>', 'Definir GROQ_API_KEY')
  .option('--show', 'Mostrar configuração atual')
  .action((options) => {
    if (options.setKey) {
      process.env.GROQ_API_KEY = options.setKey;
      console.log(chalk.green('✅ API Key configurada!'));
    } else if (options.show) {
      console.log(chalk.cyan('\n📋 Configuração:'));
      console.log(`GROQ_API_KEY: ${process.env.GROQ_API_KEY ? '✓ Configurada' : '✗ Não configurada'}`);
    }
  });

// Função auxiliar
async function executeTask(type: any, description: string, options: any) {
  const agent = new FrontendAgent({ language: 'pt-BR' });

  if (!agent.validateApiKey()) {
    console.error(chalk.red('\n❌ GROQ_API_KEY não configurada!'));
    console.log(chalk.yellow('\n💡 Configure com:'));
    console.log(`   set GROQ_API_KEY=sua_chave_groq`);
    console.log(chalk.gray('\n   Obtenha em: https://console.groq.com\n'));
    process.exit(1);
  }

  const taskType = type === 'lp' ? 'landing-page' : type === 'site' ? 'website' : type === 'app' ? 'webapp' : type;
  const spinner = ora(chalk.cyan(`🤖 Processando ${taskType}...`)).start();

  const response = await agent.process({
    type: taskType,
    description,
    context: options.context,
    file: options.file,
    language: options.language,
    template: options.template,
  });

  spinner.stop();

  if (response.success && response.result) {
    console.log(chalk.green('\n✅ Sucesso!\n'));
    console.log(response.result);

    if (options.file) {
      fs.writeFileSync(options.file, response.result);
      console.log(chalk.green(`\n✨ Salvo em: ${options.file}`));
    }

    console.log(chalk.gray(`\n📊 Tokens: ${response.metadata?.tokensUsed} | Tempo: ${response.metadata?.executionTime}ms`));
  } else {
    console.error(chalk.red(`\n❌ ${response.error}`));
    process.exit(1);
  }
}

program.parse(process.argv);
