# Deploy do Projeto

## Frontend no Netlify

1. Suba este repositório no GitHub.
2. No Netlify, crie um novo site a partir do repositório.
3. Use `artifacts/web-agent` como diretório base do projeto.
4. Configure o build command:

   ```bash
   pnpm install && pnpm run build
   ```

5. Configure o publish directory:

   ```bash
   artifacts/web-agent/dist/public
   ```

6. Defina a variável de ambiente no Netlify:

   - `VITE_API_URL` = `https://<seu-backend>.onrender.com`

7. Faça o deploy.

> O frontend está configurado para usar `VITE_API_URL` em produção. Se a variável não estiver definida, o app tentará usar a URL relativa `/api`.

## Backend em serviço gratuito (Render)

1. Suba este repositório no GitHub.
2. Crie um novo serviço Web no Render.
3. Aponte o root para `artifacts/api-server`.
4. Use o build command:

   ```bash
   pnpm install && pnpm run build
   ```

5. Use o start command:

   ```bash
   pnpm run start
   ```

6. Defina variáveis de ambiente no Render:

   - `DATABASE_URL` = sua conexão Postgres
   - `PORT` = `8000`

7. Se quiser, use `render.yaml` presente na raiz para configurar o serviço automaticamente.

## GitHub Actions configurado

O projeto agora inclui um workflow de CI em `.github/workflows/ci.yml` que:

- instala dependências com `pnpm install`
- executa `typecheck` no backend e frontend
- compila o backend em `artifacts/api-server`
- compila o frontend em `artifacts/web-agent`

Também há um workflow de deploy do frontend em `.github/workflows/netlify-deploy.yml`.

### Para usar o deploy automático do Netlify

Defina estes segredos no GitHub:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

Quando você fizer push para `main`, o workflow irá:

- construir o frontend
- publicar o site no Netlify

## Ajustes já aplicados no código

- `artifacts/web-agent/src/main.tsx`: usa `VITE_API_URL` se estiver definida no ambiente.
- `artifacts/web-agent/src/components/chat-area.tsx`: evita renderizar dois elementos vazios ao mesmo tempo.
- `netlify.toml` já está presente para deploy do frontend.
- `render.yaml` já está presente para ajudar a configurar o backend no Render.

## URLs de exemplo

- Frontend: `https://<seu-site-netlify>.netlify.app`
- Backend: `https://<seu-backend>.onrender.com`

> No Netlify, configure `VITE_API_URL` para apontar ao backend público.
