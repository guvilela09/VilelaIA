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

program
  .command('build <description>')
  .description('Build um componente, pagina ou estrutura')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-c, --context <context>', 'Contexto adicional')
  .option('-l, --language <language>', 'Linguagem: html, css, js, react, ts')
  .action(async (description, options) => {
    await executeTask('build', description, options);
  });

program
  .command('fix <description>')
  .description('Corrigir bugs ou problemas no codigo')
  .option('-f, --file <file>', 'Arquivo com o codigo problemático')
  .option('-c, --context <context>', 'Codigo para revisar')
  .action(async (description, options) => {
    if (options.file && fs.existsSync(options.file)) {
      options.context = fs.readFileSync(options.file, 'utf-8');
    }
    await executeTask('fix', description, options);
  });

program
  .command('review')
  .description('Fazer code review detalhado')
  .option('-f, --file <file>', 'Arquivo para revisar')
  .option('-d, --depth <depth>', 'Profundidade: basic, standard, deep', 'standard')
  .action(async (options) => {
    if (!options.file || !fs.existsSync(options.file)) {
      console.error(chalk.red('Arquivo nao encontrado'));
      process.exit(1);
    }

    const context = fs.readFileSync(options.file, 'utf-8');
    const description = `Review ${options.depth} do arquivo`;
    await executeTask('review', description, { context });
  });

program
  .command('explain')
  .description('Explicar codigo ou conceito')
  .option('-f, --file <file>', 'Arquivo para explicar')
  .option('-c, --code <code>', 'Codigo para explicar')
  .action(async (options) => {
    let context = options.code;
    
    if (options.file && fs.existsSync(options.file)) {
      context = fs.readFileSync(options.file, 'utf-8');
    }

    if (!context) {
      console.error(chalk.red('Forneça codigo com -f ou -c'));
      process.exit(1);
    }

    await executeTask('explain', 'Explique este codigo', { context });
  });

program
  .command('generate <description>')
  .description('Gerar codigo novo')
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
      console.error(chalk.red('OPENCODE_GO_API_KEY nao configurada'));
      console.log(chalk.yellow('Configure: vilela config --set-key sua_chave'));
      process.exit(1);
    }

    const spinner = ora(chalk.cyan(`Gerando ${options.language}...`)).start();

    const response = await agent.process(task);
    spinner.stop();

    if (response.success && response.result) {
      console.log(chalk.green('\nCodigo gerado com sucesso!\n'));
      console.log(response.result);

      if (options.file) {
        fs.writeFileSync(options.file, response.result);
        console.log(chalk.green(`\nSalvo em: ${options.file}`));
      }

      console.log(chalk.gray(`\nTokens: ${response.metadata?.tokensUsed} | Tempo: ${response.metadata?.executionTime}ms`));
    } else {
      console.error(chalk.red(`\n${response.error}`));
      process.exit(1);
    }
  });

program
  .command('refactor <file>')
  .description('Refatorar codigo existente')
  .option('-d, --description <description>', 'O que melhorar', 'melhorar qualidade e performance')
  .action(async (file, options) => {
    if (!fs.existsSync(file)) {
      console.error(chalk.red('Arquivo nao encontrado'));
      process.exit(1);
    }

    const context = fs.readFileSync(file, 'utf-8');
    await executeTask('refactor', options.description, { context, file });
  });

program
  .command('teach <topic>')
  .description('Aprenda sobre um topico frontend')
  .option('-l, --level <level>', 'Nivel: beginner, intermediate, advanced', 'intermediate')
  .action(async (topic, options) => {
    const agent = new FrontendAgent({ language: 'pt-BR' });
    
    if (!agent.validateApiKey()) {
      console.error(chalk.red('OPENCODE_GO_API_KEY nao configurada'));
      process.exit(1);
    }

    const spinner = ora(chalk.cyan(`Ensinando ${topic}...`)).start();

    const response = await agent.process({
      type: 'explain',
      description: `Ensine sobre "${topic}" no nivel ${options.level}. Inclua exemplos praticos e dicas.`,
    });

    spinner.stop();

    if (response.success) {
      console.log(chalk.green('\nAula preparada!\n'));
      console.log(response.result);
    } else {
      console.error(chalk.red(`\n${response.error}`));
      process.exit(1);
    }
  });

program
  .command('landing-page <description>')
  .alias('lp')
  .description('Criar Landing Page de alta conversao')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-t, --template <template>', 'Template: modern, classic, minimal, bold', 'modern')
  .action(async (description, options) => {
    await executeTask('landing-page', description, { ...options, template: options.template });
  });

program
  .command('website <description>')
  .alias('site')
  .description('Criar Website profissional completo')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-t, --template <template>', 'Template: modern, classic, minimal, bold', 'modern')
  .action(async (description, options) => {
    await executeTask('website', description, { ...options, template: options.template });
  });

program
  .command('webapp <description>')
  .alias('app')
  .description('Criar Aplicacao Web moderna')
  .option('-f, --file <file>', 'Arquivo para salvar o resultado')
  .option('-l, --language <language>', 'Framework: react, vue, angular, nextjs, nuxt', 'react')
  .action(async (description, options) => {
    await executeTask('webapp', description, options);
  });

program
  .command('seo')
  .description('Otimizar SEO de codigo existente')
  .option('-f, --file <file>', 'Arquivo para otimizar')
  .option('-c, --code <code>', 'Codigo para otimizar')
  .option('-d, --description <description>', 'Foco da otimizacao', 'SEO geral')
  .action(async (options) => {
    let context = options.code;
    
    if (options.file && fs.existsSync(options.file)) {
      context = fs.readFileSync(options.file, 'utf-8');
    }

    if (!context) {
      console.error(chalk.red('Forneça codigo com -f ou -c'));
      process.exit(1);
    }

    await executeTask('seo', options.description, { context });
  });

program
  .command('config')
  .description('Gerenciar configuracoes')
  .option('--set-key <key>', 'Definir OPENCODE_GO_API_KEY')
  .option('--show', 'Mostrar configuracao atual')
  .action((options) => {
    if (options.setKey) {
      process.env.OPENCODE_GO_API_KEY = options.setKey;
      console.log(chalk.green('API Key configurada!'));
    } else if (options.show) {
      console.log(chalk.cyan('\nConfiguracao:'));
      console.log(`OPENCODE_GO_API_KEY: ${process.env.OPENCODE_GO_API_KEY ? 'Configurada' : 'Nao configurada'}`);
      console.log(`Modelo: qwen3.7-plus`);
      console.log(`Endpoint: https://opencode.ai/zen/go/v1`);
    }
  });

async function executeTask(type: any, description: string, options: any) {
  const agent = new FrontendAgent({ language: 'pt-BR' });

  if (!agent.validateApiKey()) {
    console.error(chalk.red('\nOPENCODE_GO_API_KEY nao configurada!'));
    console.log(chalk.yellow('\nConfigure com:'));
    console.log(`   vilela config --set-key sua_chave_opencode_go`);
    console.log(chalk.gray('\n   Obtenha em: https://opencode.ai/auth\n'));
    process.exit(1);
  }

  const taskType = type === 'lp' ? 'landing-page' : type === 'site' ? 'website' : type === 'app' ? 'webapp' : type;
  const spinner = ora(chalk.cyan(`Processando ${taskType}...`)).start();

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
    console.log(chalk.green('\nSucesso!\n'));
    console.log(response.result);

    if (options.file) {
      fs.writeFileSync(options.file, response.result);
      console.log(chalk.green(`\nSalvo em: ${options.file}`));
    }

    console.log(chalk.gray(`\nTokens: ${response.metadata?.tokensUsed} | Tempo: ${response.metadata?.executionTime}ms`));
  } else {
    console.error(chalk.red(`\n${response.error}`));
    process.exit(1);
  }
}

program.parse(process.argv);
