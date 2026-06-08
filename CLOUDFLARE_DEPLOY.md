# Deploy na Cloudflare - VilelaIA

## Pre-requisitos

1. Conta no Cloudflare
2. Wrangler CLI instalado: `npm install -g wrangler`
3. Login no Cloudflare: `wrangler login`

## Configurar Secrets

### API (Cloudflare Workers)

```bash
wrangler secret put DATABASE_URL
wrangler secret put OPENCODE_GO_API_KEY
```

### Frontend (Cloudflare Pages)

Nenhuma variavel de ambiente necessaria para o frontend.

## Deploy via GitHub Actions

1. Adicione os seguintes secrets no repositorio GitHub:
   - `CLOUDFLARE_API_TOKEN` - Token da API Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID` - ID da sua conta Cloudflare

2. O deploy sera automatico em cada push para `main`

## Deploy Manual

### API

```bash
wrangler deploy
```

### Frontend

```bash
pnpm --filter vilelaia-web run build
npx wrangler pages deploy artifacts/web-agent/dist/public --project-name=vilelaia-web
```

## Criar Projeto no Cloudflare

### Via Dashboard

1. **Workers**: https://dash.cloudflare.com/?to=/:account/workers-and-pages/create
   - Nome: `vilelaia-api`
   - Runtime: Workers

2. **Pages**: https://dash.cloudflare.com/?to=/:account/workers-and-pages/create
   - Nome: `vilelaia-web`
   - Conecte ao repositorio GitHub
   - Build command: `pnpm install && pnpm --filter vilelaia-web run build`
   - Output directory: `artifacts/web-agent/dist/public`

## Variaveis de Ambiente no Cloudflare Dashboard

**Workers (API):**
- `DATABASE_URL` - PostgreSQL connection string
- `OPENCODE_GO_API_KEY` - Sua chave OpenCode Go

**Pages (Frontend):**
- Nenhuma variavel necessaria

## Dominio Customizado

1. No Dashboard Cloudflare, va em Workers & Pages
2. Selecione o projeto
3. Custom domains > Set up a custom domain

## Monitoramento

- **Workers**: https://dash.cloudflare.com/?to=/:account/workers-and-pages/view/vilelaia-api
- **Pages**: https://dash.cloudflare.com/?to=/:account/workers-and-pages/view/vilelaia-web

## Troubleshooting

### Erro: "No account found"

```bash
wrangler whoami
wrangler login
```

### Erro: "Secret not found"

```bash
wrangler secret put DATABASE_URL
wrangler secret put OPENCODE_GO_API_KEY
```
