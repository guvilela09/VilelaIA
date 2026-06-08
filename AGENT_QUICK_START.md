# 🚀 Frontend Agent CLI - Guia de Início Rápido

## O que é?

Um **Programador Senior de Frontend** que funciona localmente na sua máquina! 
- 💻 Roda como CLI no terminal
- 🎨 Integra com VS Code
- 🤖 Usa IA para gerar, revisar e corrigir código
- 📚 Ensina React, JavaScript, CSS enquanto trabalha

---

## ⚡ Instalação Rápida (5 minutos)

### 1️⃣ Obter API Key Groq (gratuita)

```
Visite: https://console.groq.com
- Faça login ou crie conta (gratuita)
- Vá em: Settings → API Keys
- Copie sua chave
```

### 2️⃣ Clonar e instalar

```powershell
cd c:\Projeto\AgenteIA
pnpm install
```

### 3️⃣ Configurar a chave

**Opção A - Variável do Sistema (melhor):**
```powershell
# Windows - Vai funcionar em qualquer terminal
[Environment]::SetEnvironmentVariable("GROQ_API_KEY", "sua_chave_aqui", "User")

# Depois feche e abra o PowerShell de novo para a mudança valer
```

**Opção B - Arquivo .env.local:**
```powershell
echo "GROQ_API_KEY=sua_chave_aqui" > .env.local
```

### 4️⃣ Compilar o CLI

```powershell
pnpm -C artifacts/frontend-agent-cli run build
```

### 5️⃣ Testar

```powershell
# Teste rápido
.\artifacts\frontend-agent-cli\dist\cli.js build "um botão com animação e hover"

# Deve aparecer algo assim:
# 🤖 Processando build...
# ✅ Sucesso!
# [Código gerado aqui]
```

---

## 📦 Criar Executável Windows (.exe)

Depois de compilar, você pode criar um arquivo `.exe` para usar de qualquer lugar:

```powershell
# Instale o pkg (apenas uma vez)
npm install -g pkg

# Na pasta do projeto
pnpm -C artifacts/frontend-agent-cli run build:exe

# Arquivo criado em: artifacts/frontend-agent-cli/dist/agent.exe
```

**Opcional: Adicionar ao PATH**
```powershell
# Crie a pasta
mkdir "C:\Program Files\AgentIA"

# Copie o arquivo
Copy-Item "artifacts/frontend-agent-cli/dist/agent.exe" "C:\Program Files\AgentIA\"

# Adicione ao PATH (Admin):
# 1. Windows + X → System
# 2. Advanced system settings → Environment Variables
# 3. System variables → Path → New
# 4. Cole: C:\Program Files\AgentIA
# 5. OK, OK, OK e reinicie

# Agora pode usar de qualquer lugar:
agent build "um formulário"
```

---

## 🎯 Exemplos de Uso

### Build - Criar código novo

```powershell
# Componente React simples
agent build "componente React de contador"

# Com seleção de linguagem
agent build "um modal em HTML com CSS" -l html

# Salvar em arquivo
agent build "tabela de dados com filtro" -l react -f DataTable.jsx

# Com contexto específico
agent build "um hook customizado para fetch" -c "use axios, retorne loading, data, error"
```

**Resultado:** Componente pronto para usar!

---

### Fix - Corrigir bugs

```powershell
# Corrigir um arquivo específico
agent fix "função retorna undefined" -f app.js

# Com contexto inline
agent fix "botão não responde ao clique" -c "
function Button() {
  return <button onClick={() => alert('test')}>Click</button>
}
"
```

**Resultado:** Código corrigido + explicação

---

### Review - Análise detalhada

```powershell
# Review básico
agent review -f componente.jsx

# Review profunda
agent review -f api.js -d deep

# Você vê:
# ✓ Pontos positivos
# ⚠️ Possíveis bugs
# 🚀 Otimizações
# 📋 Recomendações
```

---

### Explain - Entender código

```powershell
# Explicar um arquivo
agent explain -f funcao.js

# Explicar um snippet
agent explain -c "const reducer = (state, action) => ({ ...state, ...action })"
```

**Resultado:** Explicação clara + exemplos

---

### Generate - Código novo com linguagem específica

```powershell
# JavaScript puro
agent generate "validador de email robusto" -l js

# React com Hooks
agent generate "componente de abas (tabs)" -l react

# TypeScript
agent generate "interface para usuário no banco de dados" -l ts
```

---

### Refactor - Melhorar código existente

```powershell
# Refatorar e otimizar
agent refactor app.js -d "adicionar TypeScript e melhorar performance"

# Simplificar
agent refactor styles.css -d "usar CSS Grid ao invés de Flexbox"
```

---

### Teach - Aprender um tópico

```powershell
# Aulas interativas
agent teach "React Hooks" -l advanced
agent teach "CSS Grid" -l beginner  
agent teach "async/await" -l intermediate

# Resultado: Explainação + exemplos práticos
```

---

## 🎨 Integrar com VS Code

### Instalar Extensão

```powershell
code --install-extension ./artifacts/frontend-agent-cli/vscode-extension
```

### Usar no Chat

1. Abra o VS Code
2. **Ctrl+I** (ou Cmd+I no Mac) para abrir o Chat
3. Digite:

```
@frontend-agent /build um componente de dropdown
@frontend-agent /fix o código está dando erro
@frontend-agent /review analisar este arquivo
```

### Atalhos

- **Ctrl+Shift+R** = Code Review rápido do arquivo aberto

---

## 💡 Dicas Pro

### 1️⃣ Usar dentro de um arquivo

```javascript
// No seu arquivo, escreva:
// @agent build me um validador de CPF completo

function validateCPF(cpf) {
  // Deixe vazio, o agente vai implementar
}
```

Depois execute:
```powershell
agent build "validador de CPF" -f seu-arquivo.js
```

### 2️⃣ Code Review antes de comitar

```powershell
# Review profunda do projeto
agent review -f src/components/App.jsx -d deep

# Salve as sugestões e aplique
```

### 3️⃣ Refatorar incrementalmente

```powershell
# Primeiro: TypeScript
agent refactor app.js -d "adicionar tipos TypeScript"

# Depois: Performance
agent refactor app.ts -d "otimizar renderização React"

# Por fim: Testes
agent refactor app.ts -d "adicionar testes com Vitest"
```

### 4️⃣ Gerar estrutura de projeto

```powershell
# Layout de página
agent generate "landing page moderna com Hero Section e CTA" -l react

# Componentes isolados
agent generate "card de produto com imagem, preço e botão" -l react

# Hook reutilizável
agent generate "useForm hook customizado com validação" -l react
```

---

## 🚨 Troubleshooting

### Erro: "GROQ_API_KEY not found"

**Solução:**
```powershell
# Verifique se configurou
$env:GROQ_API_KEY

# Se vazio, configure
[Environment]::SetEnvironmentVariable("GROQ_API_KEY", "sua_chave", "User")

# Feche PowerShell e abra de novo
```

### Erro: "agent: comando não encontrado"

**Solução:**
```powershell
# Use o caminho completo
.\artifacts\frontend-agent-cli\dist\cli.js build "seu comando"

# Ou crie um alias PowerShell (add ao seu perfil):
function agent { & .\artifacts\frontend-agent-cli\dist\cli.js @args }
```

### Extensão VS Code não funciona

**Solução:**
```powershell
# Recompile
pnpm -C artifacts/frontend-agent-cli/vscode-extension run build

# Reinstale
code --uninstall-extension frontend-agent.frontend-agent-vscode
code --install-extension ./artifacts/frontend-agent-cli/vscode-extension
```

---

## 📚 Especialidades do Agente

✅ **HTML5** - Semântico e acessível  
✅ **CSS3** - Flexbox, Grid, Animations, SASS  
✅ **JavaScript ES2020+** - Padrões modernos  
✅ **React** - Hooks, Context, Performance, SSR  
✅ **TypeScript** - Tipos precisos e interfaces  
✅ **Acessibilidade** - WCAG 2.1 AA  
✅ **Performance** - Web Vitals, otimização  
✅ **Testing** - Vitest, Jest, React Testing Library  
✅ **CSS-in-JS** - Tailwind, styled-components  

---

## 🔗 Recursos Úteis

- **Groq API**: https://console.groq.com
- **Documentação**: https://groq.com/docs
- **Modelos disponíveis**: https://console.groq.com/docs/speech-text

---

## 🎯 Próximos Passos

1. ✅ Configure a API Key
2. ✅ Compile o CLI
3. ✅ Faça um teste: `agent build "um botão bonito"`
4. ✅ Use no VS Code
5. ✅ Refatore seus projetos antigos

**Agora você tem um Programador Senior Frontend na sua máquina!** 🚀

Aproveite! 🎉
