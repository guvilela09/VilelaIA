# VilelaIA

Agente de IA especializado em **SEO**, **Landing Pages**, **Websites Profissionais** e **Aplicações Web Modernas**.

---

## O que este agente faz?

VilelaIA e o melhor Desenvolvedor Senior Frontend que voce pode ter na sua maquina. Ele domina:

### SEO Tecnico Avancado
- Meta tags otimizadas (title, description, keywords)
- Schema.org structured data
- Open Graph e Twitter Cards
- Sitemap XML e robots.txt
- Core Web Vitals (LCP, FID, CLS)
- Server-side rendering (SSR) e Static Site Generation (SSG)
- Canonical URLs e hreflang

### Landing Pages de Alta Conversao
- Hero Section persuasiva com CTA claro
- Social proof (logos, numeros, depoimentos)
- Beneficios detalhados
- Secao de Precos
- FAQ completo
- CTA final poderoso
- Mobile responsive
- Performance otimizada

### Websites Profissionais
- Header com navegacao intuitiva
- Paginas: Home, Sobre, Servicos, Blog, Contato
- Footer completo com links e redes sociais
- SEO on-page otimizado
- Acessibilidade WCAG 2.1

### Aplicacoes Web Modernas
- React/Next.js/Vue/Nuxt/Angular
- TypeScript com tipos precisos
- State management
- Formularios com validacao
- Testing (unit, integration, e2e)
- CI/CD pipeline

---

## Como Usar

### 1. Configurar a API Key

```powershell
# PowerShell
$env:GROQ_API_KEY = "sua_chave_aqui"

# Ou adicionar ao .env.local
echo "GROQ_API_KEY=sua_chave_aqui" > .env.local
```

Obtenha sua chave em: https://console.groq.com

### 2. Instalar o CLI globalmente

```powershell
# Na raiz do projeto
cd artifacts/frontend-agent-cli
npm run build
npm link
```

Agora o comando `vilela` estara disponivel globalmente no terminal.

### 3. Executar Comandos

#### Criar Landing Page
```powershell
vilela landing-page "Landing page para plataforma de gestao de projetos"
vilela lp "Landing page para clinica de estetica"
```

#### Criar Website
```powershell
vilela website "Website institucional para empresa de tecnologia"
vilela site "Website para escritorio de advocacia"
```

#### Criar Aplicacao Web
```powershell
vilela webapp "Dashboard de vendas com graficos e metricas"
vilela app "Sistema de gestao de clientes" -l react
```

#### Otimizar SEO
```powershell
vilela seo -f index.html
vilela seo -c "<html>...</html>" -d "Otimizar para mobile"
```

#### Outros Comandos
```powershell
vilela build "formulario de login com validacao"
vilela fix "a funcao retorna undefined" -f arquivo.js
vilela review -f arquivo.js
vilela explain -f arquivo.js
vilela refactor arquivo.js -d "adicionar TypeScript"
vilela teach "React Hooks" -l advanced
```

---

## Estrutura do Projeto

```
VilelaIA/
├── opencode.json                    # Configuração principal
├── .opencode/
│   ├── agents/
│   │   └── senior-frontend.md       # Agente Senior Frontend
│   └── skills/
│       ├── seo-expert/
│       │   └── SKILL.md             # Skill de SEO
│       ├── landing-page/
│       │   └── SKILL.md             # Skill de Landing Pages
│       ├── website-development/
│       │   └── SKILL.md             # Skill de Websites
│       └── web-application/
│           └── SKILL.md             # Skill de Web Apps
├── artifacts/
│   ├── frontend-agent-cli/          # CLI VilelaIA
│   │   └── src/
│   │       ├── cli.ts               # Interface CLI
│   │       ├── agent.ts             # Motor de IA
│   │       └── types.ts             # Tipos TypeScript
│   ├── web-agent/                   # Interface Web
│   └── api-server/                  # API Backend
```

---

## Web Interface

Para rodar a interface web:

```powershell
# Na raiz do projeto
pnpm run dev:web
```

A interface web estara disponivel em http://localhost:5173

---

## Deploy

### Netlify (Frontend Web)
O projeto ja esta configurado para deploy no Netlify via `netlify.toml`.

### Render (API Server)
O projeto ja esta configurado para deploy no Render via `render.yaml`.

---

## Stack Tecnologica

- **HTML5** semantico e acessivel
- **CSS3** (Flexbox, Grid, Animations, Tailwind)
- **JavaScript/TypeScript** ES2024+
- **React/Next.js** para SPAs e SSR
- **Vue/Nuxt** para projetos progressivos
- **Angular** para enterprise
- **Node.js** para SSR/SSG

---

## Licenca

MIT

---

**VilelaIA - Feito para desenvolvedores que querem o melhor em SEO e conversao.**
