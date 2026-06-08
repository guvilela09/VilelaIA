#!/usr/bin/env node

/**
 * Setup script para o Frontend Agent CLI
 * Configura o agente para uso local e VS Code
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  console.log('\n🚀 Frontend Agent CLI - Setup\n');

  // 1. Verificar GROQ API Key
  console.log('📋 Passo 1: Configurar API Key');
  const hasEnv = fs.existsSync('.env.local');
  let apiKey = process.env.GROQ_API_KEY;

  if (!apiKey && hasEnv) {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const match = envContent.match(/GROQ_API_KEY=(.+)/);
    if (match) {
      apiKey = match[1];
      console.log('✓ API Key encontrada em .env.local');
    }
  }

  if (!apiKey) {
    const userInput = await question(
      '\n🔑 Cole sua GROQ API Key (obtenha em https://console.groq.com): '
    );

    if (userInput) {
      apiKey = userInput;
      fs.writeFileSync('.env.local', `GROQ_API_KEY=${apiKey}\n`);
      console.log('✓ API Key salva em .env.local');
    }
  }

  // 2. Instalar dependências
  console.log('\n📦 Passo 2: Instalar dependências');
  console.log('Execute: pnpm install');

  // 3. Build do CLI
  console.log('\n🔨 Passo 3: Compilar CLI');
  console.log('Execute: pnpm -C artifacts/frontend-agent-cli run build');

  // 4. Criar executável
  console.log('\n⚙️  Passo 4: Criar executável Windows');
  const createExe = await question(
    '\nVocê quer criar um .exe para usar de qualquer lugar? (s/n): '
  );

  if (createExe.toLowerCase() === 's') {
    console.log('\nExecute: pnpm -C artifacts/frontend-agent-cli run build:exe');
  }

  // 5. Instalar extensão VS Code
  console.log('\n🎨 Passo 5: Instalar extensão VS Code');
  const installVscodeExt = await question(
    'Deseja instalar a extensão VS Code? (s/n): '
  );

  if (installVscodeExt.toLowerCase() === 's') {
    console.log('\nExecute: code --install-extension ./artifacts/frontend-agent-cli/vscode-extension');
  }

  console.log('\n✅ Setup concluído!');
  console.log('\n💡 Próximos passos:');
  console.log('   1. Execute: pnpm install');
  console.log('   2. Build o CLI: pnpm -C artifacts/frontend-agent-cli run build');
  console.log('   3. Teste: agent build "um botão com animação"');
  console.log('   4. Instale no VS Code: code --install-extension ./artifacts/frontend-agent-cli/vscode-extension');

  rl.close();
}

setup().catch(console.error);
