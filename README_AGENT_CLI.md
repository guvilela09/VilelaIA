# 🎉 Frontend Agent CLI - Instalação Completa!

Você tem um **Programador Senior Frontend na sua máquina**! 🚀

---

## ✅ O que foi criado?

```
artifacts/frontend-agent-cli/
├── src/
│   ├── cli.ts          → Comandos do terminal
│   ├── agent.ts        → Motor de IA (Groq)
│   └── types.ts        → Tipos TypeScript
├── vscode-extension/
│   ├── src/extension.ts    → Integração VS Code
│   └── package.json
├── dist/
│   ├── cli.js          ✅ Compilado e pronto
│   └── agent.js        ✅ Compilado e pronto
├── package.json        → Dependências
└── README.md           → Documentação
```

---

## 🚀 Começar Agora (3 passos)

### 1️⃣ Obter API Key (Gratuita)

Visite: **https://console.groq.com**
- Faça login com Google, GitHub ou email
- Settings → API Keys → Create New Key
- Copie a chave

### 2️⃣ Configurar no Windows

**PowerShell (como Administrador):**

```powershell
[Environment]::SetEnvironmentVariable("GROQ_API_KEY", "sua_chave_aqui", "User")
```

Feche PowerShell e abra novamente para a mudança valer.

**Ou edite `.env.local`:**

```
echo "GROQ_API_KEY=sua_chave_aqui" > .env.local
```

### 3️⃣ Testar

```powershell
cd c:\Projeto\AgenteIA

# Teste rápido
.\artifacts\frontend-agent-cli\dist\cli.js build "um botão com hover animation"
```

---

## 💡 Comandos Principais

| Comando | O que faz | Exemplo |
|---------|----------|---------|
| `build` | Criar código novo | `agent build "componente React de contador"` |
| `fix` | Corrigir bugs | `agent fix "não funciona" -f file.js` |
| `review` | Code review | `agent review -f file.js` |
| `explain` | Entender código | `agent explain -f file.js` |
| `generate` | Gerar em linguagem | `agent generate "validador" -l ts` |
| `refactor` | Melhorar código | `agent refactor file.js` |
| `teach` | Aprender | `agent teach "React Hooks"` |

---

## 🎨 Usar no VS Code

```powershell
# Instalar extensão
code --install-extension ./artifacts/frontend-agent-cli/vscode-extension
```

No VS Code:
- **Ctrl+I** → Abrir Chat
- Digite: `@frontend-agent /build um dropdown`
- **Ctrl+Shift+R** → Code Review rápido

---

## 📖 Documentação

- **AGENT_QUICK_START.md** → Guia completo em PT-BR
- **artifacts/frontend-agent-cli/README.md** → Referência técnica
- **INSTALLATION_COMPLETE.txt** → Resumo visual

---

## 📦 Criar Executável (.exe) - Opcional

```powershell
npm install -g pkg

pnpm -C artifacts/frontend-agent-cli run build:exe

# Cria: artifacts/frontend-agent-cli/dist/agent.exe
```

Depois adicione ao PATH para usar de qualquer lugar:

```powershell
# Copy para Program Files
Copy-Item "artifacts/frontend-agent-cli/dist/agent.exe" "C:\Program Files\agent\" -Force

# Adicione ao PATH (Settings → Environment Variables)
```

---

## 🎓 Especialidades

O agente domina:
- ✅ HTML5 semântico
- ✅ CSS3 (Flexbox, Grid, Animations)
- ✅ JavaScript ES2020+
- ✅ React & Hooks
- ✅ TypeScript
- ✅ Acessibilidade (WCAG)
- ✅ Performance & Otimização
- ✅ Testes (Vitest, Jest)

---

## 🔥 Casos de Uso

### Construir Componente
```powershell
agent build "formulário de login com validação e design modern"
```
→ Código pronto para usar!

### Corrigir Bug
```powershell
agent fix "a função retorna undefined" -f processData.js
```
→ Bugfix + explicação!

### Aprender
```powershell
agent teach "React Hooks" -l beginner
```
→ Aula + exemplos!

### Refatorar
```powershell
agent refactor app.js -d "adicionar TypeScript"
```
→ Código melhorado!

---

## ⚠️ Troubleshooting

### ❌ "GROQ_API_KEY não configurada"

```powershell
# Verificar se está configurada
$env:GROQ_API_KEY

# Se vazio, configure
[Environment]::SetEnvironmentVariable("GROQ_API_KEY", "sua_chave", "User")
```

### ❌ "agent: comando não encontrado"

Use o caminho completo:
```powershell
.\artifacts\frontend-agent-cli\dist\cli.js build "..."
```

### ❌ Erro de timeout

Aumentar timeout no comando:
```powershell
# Espera mais tempo
$env:GROQ_TIMEOUT = "60000"
```

---

## 📞 Recursos

- **Groq API**: https://console.groq.com
- **Documentação**: https://groq.com/docs
- **Modelos**: https://console.groq.com/docs/models

---

## 🎯 Resumo

Você agora pode:

1. ✅ Executar `agent build "descrição"` no terminal
2. ✅ Usar `/build`, `/fix`, `/review` no VS Code
3. ✅ Adicionar comentários no código: `// @agent build ...`
4. ✅ Criar .exe executável para usar de qualquer lugar
5. ✅ Aprender frontend enquanto trabalha

---

**Está pronto para começar! 🚀**

1. Configure a API Key
2. Teste: `agent build "um botão bonito"`
3. Instale no VS Code (opcional)
4. Comece a usar no seu projeto!

Aproveite seu Programador Senior Frontend! 🎉

---

**Precisa de ajuda?**

1. Leia: `AGENT_QUICK_START.md` (PT-BR)
2. Leia: `artifacts/frontend-agent-cli/README.md` (Completo)
3. Execute: `.\setup-agent.bat` (Menu interativo)

---

Bom coding! 💻✨
