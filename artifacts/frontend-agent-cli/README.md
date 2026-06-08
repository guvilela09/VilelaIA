# Frontend Agent CLI - Documentação

## 🚀 Instalação Rápida

### Windows

```powershell
# 1. Clone/acesse o repositório
cd c:\Projeto\AgenteIA

# 2. Instale dependências
pnpm install

# 3. Compile o CLI
pnpm -C artifacts/frontend-agent-cli run build

# 4. Configure a API Key (obtenha em https://console.groq.com)
$env:GROQ_API_KEY = "sua_chave_aqui"

# 5. Teste o agent
.\artifacts\frontend-agent-cli\dist\cli.js build "um botão com animação"
```

### Criar Executável (.exe)

```powershell
# Instale pkg globalmente
npm install -g pkg

# Crie o executável
pnpm -C artifacts/frontend-agent-cli run build:exe

# O arquivo estará em: artifacts/frontend-agent-cli/dist/agent.exe
# Adicione ao PATH do Windows para usar de qualquer lugar
```

---

## 📋 Comandos Disponíveis

### 1. **Build** - Criar novo código
```bash
agent build "um formulário de login com validação"
agent build "componente React de abas" -l react
agent build "página HTML com CSS moderno" -l html
```

### 2. **Fix** - Corrigir bugs
```bash
agent fix "função não retorna resultado correto" -f app.js
agent fix "erro de layout no mobile" -c "seu código aqui"
```

### 3. **Review** - Code review detalhado
```bash
agent review -f componente.jsx
agent review -f index.css -d deep
```

### 4. **Explain** - Entender código
```bash
agent explain -f funcao.js
agent explain -c "const sum = (a, b) => a + b"
```

### 5. **Generate** - Gerar código em linguagem específica
```bash
agent generate "uma função que valida email" -l js
agent generate "um componente de modal" -l react -f Modal.jsx
```

### 6. **Refactor** - Melhorar código existente
```bash
agent refactor app.js -d "adicionar tipagem TypeScript"
agent refactor styles.css -d "otimizar performance"
```

### 7. **Teach** - Aprender sobre tópicos
```bash
agent teach "CSS Grid" -l intermediate
agent teach "React Hooks" -l advanced
agent teach "Acessibilidade Web" -l beginner
```

---

## 🎨 VS Code - Slash Commands

### Instalação da Extensão

```powershell
code --install-extension ./artifacts/frontend-agent-cli/vscode-extension
```

### Usar no VS Code

1. **Abra o Chat** (Ctrl+I ou Cmd+I)
2. **Digite um comando:**

```
@frontend-agent /build um componente de dropdown
@frontend-agent /fix o código está lento
@frontend-agent /review analisar este arquivo
@frontend-agent /explain o que faz este código?
```

### Atalhos

- **Ctrl+Shift+R** (Win/Linux) / **Cmd+Shift+R** (Mac): Code Review rápido

---

## 💡 Comentários Especiais no Código

Adicione comentários especiais no seu código para o agente processar:

```javascript
// @agent build me um validador de formulário robusto
function validateForm(data) {
  // ... seu código aqui
}

// @agent fix esse algoritmo está muito lento
function sortArray(arr) {
  // ... código ineficiente
}

// @agent refactor melhorar legibilidade e adicionar tipos
const processData = (input) => {
  // ... código complexo
};
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

```bash
# .env.local ou variáveis do sistema
GROQ_API_KEY=your_api_key_here
GROQ_MODEL=mixtral-8x7b-32768  # opcional
AGENT_LANGUAGE=pt-BR            # pt-BR ou en
```

### Comando Config

```bash
# Ver configuração
agent config --show

# Definir API Key
agent config --set-key "sua_chave_aqui"
```

---

## 🎓 Especialidades do Agente

✅ **HTML5** - Semântico e acessível
✅ **CSS3** - Flexbox, Grid, Animations
✅ **JavaScript** - ES2020+, patterns modernos
✅ **React** - Hooks, Context, Performance
✅ **TypeScript** - Tipos precisos
✅ **Acessibilidade** - WCAG 2.1
✅ **Performance** - Otimização e boas práticas
✅ **Testing** - Vitest, Jest, Testing Library

---

## 🔧 Troubleshooting

### Erro: "GROQ_API_KEY não configurada"

```powershell
# Windows - Configure variável de ambiente permanentemente
[Environment]::SetEnvironmentVariable("GROQ_API_KEY", "sua_chave", "User")

# Ou crie um arquivo .env.local
echo "GROQ_API_KEY=sua_chave" > .env.local
```

### Erro: "agent: comando não encontrado"

```powershell
# Use o caminho completo
.\artifacts\frontend-agent-cli\dist\cli.js build "seu comando"

# Ou adicione ao PATH do Windows
# 1. Copie agent.exe para C:\Program Files\agent\ (crie a pasta)
# 2. Adicione "C:\Program Files\agent" ao PATH
```

### A extensão VS Code não funciona

```bash
# Recompile a extensão
pnpm -C artifacts/frontend-agent-cli/vscode-extension run build

# Reinstale no VS Code
code --uninstall-extension frontend-agent.frontend-agent-vscode
code --install-extension ./artifacts/frontend-agent-cli/vscode-extension
```

---

## 🚀 Exemplos Práticos

### Exemplo 1: Build de componente React

```bash
agent build "componente de card com imagem, título e descrição" -l react
```

Resultado: Componente pronto para usar com TypeScript!

### Exemplo 2: Fix de performance

```bash
agent fix "renderização está lenta" -f MyComponent.jsx
```

Resultado: Sugestões de otimização + código refatorado

### Exemplo 3: Code Review completo

```bash
agent review -f api/users.ts -d deep
```

Resultado: Review detalhada com pontos positivos e melhorias

---

## 📊 Resumo de Uso

| Tarefa | Comando | Exemplo |
|--------|---------|---------|
| Criar código | `build` | `agent build "um botão"` |
| Corrigir bugs | `fix` | `agent fix "não funciona" -f file.js` |
| Revisar | `review` | `agent review -f file.js` |
| Entender | `explain` | `agent explain -f file.js` |
| Gerar | `generate` | `agent generate "função de email" -l js` |
| Refatorar | `refactor` | `agent refactor file.js` |
| Aprender | `teach` | `agent teach "React Hooks"` |

---

## 🆘 Suporte

Para mais informações:
- Site Groq: https://groq.com
- API Docs: https://console.groq.com/docs
- GitHub: https://github.com/groq/groq-sdk-python

Aproveite seu Frontend Agent! 🚀
