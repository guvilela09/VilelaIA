# VilelaIA - Deploy no GitHub

## Passo 1: Login no GitHub CLI

Abra o PowerShell e execute:

```powershell
gh auth login
```

Siga as instrucoes:
1. Escolha "GitHub.com"
2. Escolha "HTTPS"
3. Escolha "Login with a web browser"
4. Copie o codigo e abra a URL no navegador
5. Autorize o acesso

## Passo 2: Criar repositorio e fazer push

Apos o login, execute:

```powershell
# Criar repositorio publico
gh repo create VilelaIA --public --source=. --remote=origin

# Fazer push
git add .
git commit -m "Initial commit: VilelaIA - Agente de IA para SEO, Landing Pages e Websites"
git branch -M main
git push -u origin main
```

## Passo 3: Deploy Web (Netlify)

1. Acesse https://app.netlify.com
2. Clique em "Add new site" > "Import an existing project"
3. Conecte seu GitHub
4. Selecione o repositorio VilelaIA
5. As configuracoes ja estao no netlify.toml
6. Clique em "Deploy site"

## Passo 4: Deploy API (Render)

1. Acesse https://render.com
2. Clique em "New +" > "Web Service"
3. Conecte seu GitHub
4. Selecione o repositorio VilelaIA
5. Configure:
   - Name: vilelaia-api
   - Root Directory: artifacts/api-server
   - Build Command: pnpm install && pnpm run build
   - Start Command: pnpm run start
6. Adicione as variaveis de ambiente:
   - DATABASE_URL
   - GROQ_API_KEY
7. Clique em "Create Web Service"

## Comandos Uteis

```powershell
# Verificar status do CLI
gh auth status

# Listar repositorios
gh repo list

# Verificar status do deploy
gh run list

# Abrir repositorio no navegador
gh repo view --web
```
