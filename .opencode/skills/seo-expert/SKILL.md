---
name: seo-expert
description: Use quando precisar criar, otimizar ou revisar código com foco em SEO técnico, meta tags, schema.org, Core Web Vitals, sitemap, robots.txt, Open Graph, Twitter Cards e todas as melhores práticas de otimização para mecanismos de busca.
---

# SEO Expert Skill

## Especialidades

### 1. Meta Tags Otimizadas

```html
<!-- Title Tag: 50-60 caracteres -->
<title>Keyword Principal - Benefício | Marca</title>

<!-- Meta Description: 150-160 caracteres -->
<meta name="description" content="Descrição persuasiva com keyword principal e CTA. Máximo 160 caracteres." />

<!-- Canonical URL -->
<link rel="canonical" href="https://www.dominio.com/pagina" />

<!-- Hreflang para internacionalização -->
<link rel="alternate" hreflang="pt-br" href="https://www.dominio.com/pt-br/pagina" />
<link rel="alternate" hreflang="en" href="https://www.dominio.com/en/pagina" />
```

### 2. Open Graph (Facebook/LinkedIn)

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Título Otimizado" />
<meta property="og:description" content="Descrição com keyword" />
<meta property="og:image" content="https://www.dominio.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://www.dominio.com/pagina" />
<meta property="og:site_name" content="Nome do Site" />
<meta property="og:locale" content="pt_BR" />
```

### 3. Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@usuario" />
<meta name="twitter:creator" content="@autor" />
<meta name="twitter:title" content="Título" />
<meta name="twitter:description" content="Descrição" />
<meta name="twitter:image" content="https://www.dominio.com/twitter-image.jpg" />
```

### 4. Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Nome da Página",
  "description": "Descrição da página",
  "url": "https://www.dominio.com/pagina",
  "image": "https://www.dominio.com/imagem.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Nome da Empresa",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.dominio.com/logo.png"
    }
  },
  "mainEntity": {
    "@type": "Article",
    "headline": "Título do Artigo",
    "author": {
      "@type": "Person",
      "name": "Nome do Autor"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01"
  }
}
```

### 5. Sitemap XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.dominio.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.dominio.com/sobre</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 6. Robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.dominio.com/sitemap.xml
```

### 7. Core Web Vitals

**LCP (Largest Contentful Paint)**: < 2.5 segundos
- Otimizar imagens com lazy loading
- Usar CDN para assets estáticos
- Minimizar CSS/JS crítico

**FID (First Input Delay)**: < 100ms
- Reduzir JavaScript bloqueante
- Usar web workers para tarefas pesadas
- Implementar code splitting

**CLS (Cumulative Layout Shift)**: < 0.1
- Definir dimensões em imagens e vídeos
- Evitar inserir conteúdo dinâmico acima do conteúdo existente
- Usar font-display: swap

### 8. HTML Semântico

```html
<header>
  <nav aria-label="Menu principal">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/sobre">Sobre</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título Principal (único H1)</h1>
    <section>
      <h2>Subtítulo</h2>
      <p>Conteúdo...</p>
    </section>
  </article>
  
  <aside>
    <h2>Conteúdo Relacionado</h2>
  </aside>
</main>

<footer>
  <p>&copy; 2024 Marca</p>
</footer>
```

### 9. Performance

```html
<!-- Preload de recursos críticos -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/css/critical.css" as="style" />
<link rel="preload" href="/js/main.js" as="script" />

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="//cdn.example.com" />

<!-- Lazy loading de imagens -->
<img src="image.jpg" loading="lazy" width="800" height="600" alt="Descrição" />
```

### 10. URL Structure

```
✅ Bom:
https://www.dominio.com/categoria/subcategoria/pagina
https://www.dominio.com/blog/2024/01/titulo-do-post

❌ Ruim:
https://www.dominio.com/p?id=123&cat=456
https://www.dominio.com/pagina-com-muitas-palavras-e-que-nao-e-otimizada
```

## Checklist de SEO

- [ ] Title tag com 50-60 caracteres
- [ ] Meta description com 150-160 caracteres
- [ ] H1 único por página
- [ ] Hierarquia de headings (H1 > H2 > H3)
- [ ] Imagens com alt text descritivo
- [ ] Schema.org structured data
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Canonical URL
- [ ] Sitemap XML atualizado
- [ ] Robots.txt configurado
- [ ] SSL/HTTPS ativo
- [ ] Mobile-friendly
- [ ] Core Web Vitals otimizados
- [ ] URLs limpas e descritivas
- [ ] Links internos estratégicos
- [ ] Conteúdo original e de qualidade
- [ ] Velocidade de carregamento < 3 segundos
