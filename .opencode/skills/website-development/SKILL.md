---
name: website-development
description: Use quando precisar criar websites profissionais completos com design responsivo, navegação intuitiva, SEO on-page, blog integrado, páginas institucionais e todas as melhores práticas de desenvolvimento web moderno.
---

# Website Development Skill

## Estrutura de Website Profissional

### 1. Header com Navegação

```html
<header class="site-header" id="header">
  <div class="container">
    <a href="/" class="logo" aria-label="Página Inicial">
      <img src="logo.svg" alt="Nome da Marca" width="150" height="40" />
    </a>
    
    <nav class="main-nav" aria-label="Menu Principal">
      <button class="menu-toggle" aria-expanded="false" aria-controls="menu">
        <span class="hamburger"></span>
      </button>
      
      <ul id="menu" class="nav-list">
        <li><a href="/" class="active">Home</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/servicos">Serviços</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contato">Contato</a></li>
        <li><a href="/cliente" class="btn-login">Área do Cliente</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### 2. Hero Section

```html
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <span class="hero-tag">Nova Coleção 2024</span>
      <h1>Transforme Sua Presença Digital</h1>
      <p class="hero-description">
        Criamos experiências digitais que convertem visitantes em clientes.
        Soluções completas para seu negócio crescer online.
      </p>
      <div class="hero-buttons">
        <a href="/servicos" class="btn-primary">Nossos Serviços</a>
        <a href="/contato" class="btn-secondary">Fale Conosco</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="hero.webp" alt="Descrição da imagem" width="500" height="400" />
    </div>
  </div>
</section>
```

### 3. Sobre Nós

```html
<section class="about" id="sobre">
  <div class="container">
    <div class="about-grid">
      <div class="about-image">
        <img src="team.webp" alt="Nossa equipe" width="600" height="400" loading="lazy" />
      </div>
      <div class="about-content">
        <span class="section-tag">Quem Somos</span>
        <h2>Soluções Digitais de Alta Performance</h2>
        <p>
          Há mais de 10 anos no mercado, ajudamos empresas a alcançar seus
          objetivos através de soluções digitais inovadoras e eficientes.
        </p>
        <ul class="about-features">
          <li>
            <span class="check">✓</span>
            Equipe especializada e certificada
          </li>
          <li>
            <span class="check">✓</span>
            Mais de 500 projetos entregues
          </li>
          <li>
            <span class="check">✓</span>
            Suporte dedicado pós-entrega
          </li>
        </ul>
        <a href="/sobre" class="btn-primary">Saiba Mais</a>
      </div>
    </div>
  </div>
</section>
```

### 4. Serviços

```html
<section class="services" id="servicos">
  <div class="container">
    <span class="section-tag">Nossos Serviços</span>
    <h2>O Que Podemos Fazer Por Você</h2>
    
    <div class="services-grid">
      <article class="service-card">
        <div class="service-icon">
          <img src="icon-web.svg" alt="" width="48" height="40" />
        </div>
        <h3>Desenvolvimento Web</h3>
        <p>
          Sites e sistemas web sob medida, com as melhores tecnologias
          do mercado e foco em performance.
        </p>
        <a href="/servicos/web" class="service-link">Saiba Mais →</a>
      </article>
      
      <article class="service-card">
        <div class="service-icon">
          <img src="icon-seo.svg" alt="" width="48" height="40" />
        </div>
        <h3>SEO & Marketing Digital</h3>
        <p>
          Otimização para mecanismos de busca e estratégias de marketing
          para aumentar sua visibilidade online.
        </p>
        <a href="/servicos/seo" class="service-link">Saiba Mais →</a>
      </article>
      
      <article class="service-card">
        <div class="service-icon">
          <img src="icon-design.svg" alt="" width="48" height="40" />
        </div>
        <h3>UI/UX Design</h3>
        <p>
          Design centrado no usuário que gera conversões e melhora
          a experiência do seu público.
        </p>
        <a href="/servicos/design" class="service-link">Saiba Mais →</a>
      </article>
    </div>
  </div>
</section>
```

### 5. Blog

```html
<section class="blog" id="blog">
  <div class="container">
    <span class="section-tag">Blog</span>
    <h2>Últimas Publicações</h2>
    
    <div class="blog-grid">
      <article class="blog-card">
        <a href="/blog/como-aumentar-vendas-online" class="blog-image">
          <img src="blog1.webp" alt="Thumbnail do artigo" width="400" height="250" loading="lazy" />
          <span class="blog-category">Marketing</span>
        </a>
        <div class="blog-content">
          <time datetime="2024-01-15">15 Jan 2024</time>
          <h3>
            <a href="/blog/como-aumentar-vendas-online">
              Como Aumentar Suas Vendas Online em 2024
            </a>
          </h3>
          <p>Descubra as melhores estratégias para impulsionar suas vendas no ambiente digital.</p>
          <a href="/blog/como-aumentar-vendas-online" class="read-more">Leia Mais →</a>
        </div>
      </article>
      
      <article class="blog-card">
        <a href="/blog/seo-para-iniciantes" class="blog-image">
          <img src="blog2.webp" alt="Thumbnail do artigo" width="400" height="250" loading="lazy" />
          <span class="blog-category">SEO</span>
        </a>
        <div class="blog-content">
          <time datetime="2024-01-10">10 Jan 2024</time>
          <h3>
            <a href="/blog/seo-para-iniciantes">
              Guia Completo de SEO para Iniciantes
            </a>
          </h3>
          <p>Aprenda os fundamentos de SEO e comece a ranquear no Google.</p>
          <a href="/blog/seo-para-iniciantes" class="read-more">Leia Mais →</a>
        </div>
      </article>
    </div>
    
    <div class="blog-cta">
      <a href="/blog" class="btn-secondary">Ver Todos os Artigos</a>
    </div>
  </div>
</section>
```

### 6. Footer

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="logo-white.svg" alt="Nome da Marca" width="150" height="40" />
        <p>Transformando negócios através de soluções digitais desde 2014.</p>
        <div class="social-links">
          <a href="https://facebook.com/marca" aria-label="Facebook">
            <img src="facebook.svg" alt="" width="24" height="24" />
          </a>
          <a href="https://instagram.com/marca" aria-label="Instagram">
            <img src="instagram.svg" alt="" width="24" height="24" />
          </a>
          <a href="https://linkedin.com/company/marca" aria-label="LinkedIn">
            <img src="linkedin.svg" alt="" width="24" height="24" />
          </a>
        </div>
      </div>
      
      <div class="footer-links">
        <h4>Links Rápidos</h4>
        <ul>
          <li><a href="/sobre">Sobre Nós</a></li>
          <li><a href="/servicos">Serviços</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
      </div>
      
      <div class="footer-links">
        <h4>Serviços</h4>
        <ul>
          <li><a href="/servicos/web">Desenvolvimento Web</a></li>
          <li><a href="/servicos/seo">SEO</a></li>
          <li><a href="/servicos/design">UI/UX Design</a></li>
          <li><a href="/servicos/marketing">Marketing Digital</a></li>
        </ul>
      </div>
      
      <div class="footer-contact">
        <h4>Contato</h4>
        <address>
          <p>📍 Rua Exemplo, 123 - São Paulo, SP</p>
          <p>📞 <a href="tel:+5511999999999">(11) 99999-9999</a></p>
          <p>✉️ <a href="mailto:contato@marca.com">contato@marca.com</a></p>
        </address>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 Marca. Todos os direitos reservados.</p>
      <ul class="footer-legal">
        <li><a href="/politica-privacidade">Política de Privacidade</a></li>
        <li><a href="/termos-de-uso">Termos de Uso</a></li>
        <li><a href="/cookies">Cookies</a></li>
      </ul>
    </div>
  </div>
</footer>
```

## CSS para Website

```css
/* Reset e Variáveis */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #64748b;
  --background: #ffffff;
  --surface: #f8fafc;
  --text: #1e293b;
  --text-light: #64748b;
  --border: #e2e8f0;
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text);
  line-height: 1.6;
  background: var(--background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
}

.nav-list a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-list a:hover,
.nav-list a.active {
  color: var(--primary);
}

.btn-login {
  background: var(--primary);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

/* Hero */
.hero {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-tag {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

/* Botões */
.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s, transform 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-secondary {
  display: inline-block;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--primary);
  text-decoration: none;
  border: 2px solid var(--primary);
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}

/* Section Tags */
.section-tag {
  display: inline-block;
  color: var(--primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

/* About */
.about {
  padding: 6rem 0;
}

.about .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-features {
  list-style: none;
  margin: 2rem 0;
}

.about-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.check {
  color: var(--primary);
  font-weight: bold;
}

/* Services */
.services {
  padding: 6rem 0;
  background: var(--surface);
}

.services .container {
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: #dbeafe;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.service-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

/* Blog */
.blog {
  padding: 6rem 0;
}

.blog .container {
  text-align: center;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  text-align: left;
}

.blog-image {
  position: relative;
  display: block;
}

.blog-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.blog-content {
  padding: 1.5rem;
}

.blog-content time {
  color: var(--text-light);
  font-size: 0.875rem;
}

.blog-content h3 {
  margin: 0.5rem 0;
}

.blog-content h3 a {
  color: var(--text);
  text-decoration: none;
}

.blog-content h3 a:hover {
  color: var(--primary);
}

.read-more {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.blog-cta {
  margin-top: 2rem;
}

/* Footer */
.site-footer {
  background: #1e293b;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

.footer-brand p {
  color: #94a3b8;
  margin: 1rem 0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.footer-links h4,
.footer-contact h4 {
  margin-bottom: 1.5rem;
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: white;
}

.footer-contact address {
  font-style: normal;
  color: #94a3b8;
}

.footer-contact p {
  margin-bottom: 0.75rem;
}

.footer-contact a {
  color: #94a3b8;
  text-decoration: none;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid #334155;
  color: #94a3b8;
}

.footer-legal {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.footer-legal a {
  color: #94a3b8;
  text-decoration: none;
}

.footer-legal a:hover {
  color: white;
}

/* Responsivo */
@media (max-width: 768px) {
  .hero .container,
  .about .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero-buttons,
  .services-grid,
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .nav-list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: var(--shadow-lg);
  }
  
  .nav-list.active {
    display: flex;
  }
}
```

## Páginas Essenciais

### Home
- Hero Section
- Sobre Resumido
- Serviços em Destaque
- Depoimentos
- Blog Recente
- CTA Final

### Sobre
- História da Empresa
- Missão, Visão e Valores
- Equipe
- Timeline
- Certificações

### Serviços
- Lista Completa de Serviços
- Detalhe de Cada Serviço
- Casos de Sucesso
- Processo de Trabalho

### Blog
- Lista de Artigos
- Categorias e Tags
- Busca
- Artigo Individual

### Contato
- Formulário de Contato
- Mapa
- Informações de Contato
- Redes Sociais

## Checklist de Website

- [ ] Navegação intuitiva e responsiva
- [ ] Header fixo com logo e menu
- [ ] Hero Section persuasiva
- [ ] Páginas essenciais criadas
- [ ] Blog integrado
- [ ] Formulário de contato funcional
- [ ] Footer completo com links
- [ ] SEO on-page otimizado
- [ ] Mobile-first design
- [ ] Velocidade de carregamento < 3s
- [ ] Analytics configurado
- [ ] SSL/HTTPS ativo
- [ ] Redes sociais integradas
- [ ] Política de Privacidade
- [ ] Termos de Uso
