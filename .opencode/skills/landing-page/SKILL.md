---
name: landing-page
description: Use quando precisar criar landing pages de alta conversão com design persuasivo, SEO otimizado, copywriting profissional, CTAs poderosos, social proof e todas as melhores práticas para maximizar conversões.
---

# Landing Page Skill

## Estrutura de Landing Page de Alta Conversão

### 1. Hero Section (Acima da Dobradura)

```html
<section class="hero" id="hero">
  <div class="hero-content">
    <h1>Título Principal com Benefício Claro</h1>
    <p class="hero-subtitle">Subtítulo que expande o benefício e gera interesse</p>
    <div class="hero-cta">
      <a href="#cta" class="btn-primary">Comece Agora - É Grátis</a>
      <p class="cta-note">Não precisa de cartão de crédito. Cancele quando quiser.</p>
    </div>
  </div>
  <div class="hero-image">
    <img src="hero-image.webp" alt="Descrição da imagem" width="600" height="400" loading="eager" />
  </div>
</section>
```

### 2. Social Proof (Prova Social)

```html
<section class="social-proof" id="prova-social">
  <div class="logos">
    <p>Empresas que confiam em nós:</p>
    <div class="logo-grid">
      <img src="logo1.svg" alt="Logo Empresa 1" width="120" height="40" />
      <img src="logo2.svg" alt="Logo Empresa 2" width="120" height="40" />
      <img src="logo3.svg" alt="Logo Empresa 3" width="120" height="40" />
    </div>
  </div>
  
  <div class="stats">
    <div class="stat">
      <span class="stat-number">10,000+</span>
      <span class="stat-label">Clientes Satisfeitos</span>
    </div>
    <div class="stat">
      <span class="stat-number">98%</span>
      <span class="stat-label">Taxa de Satisfação</span>
    </div>
    <div class="stat">
      <span class="stat-number">5x</span>
      <span class="stat-label">Mais Rápido</span>
    </div>
  </div>
</section>
```

### 3. Benefícios (Features)

```html
<section class="benefits" id="beneficios">
  <h2>Por que escolher nosso produto?</h2>
  
  <div class="benefits-grid">
    <div class="benefit-card">
      <div class="benefit-icon">
        <img src="icon-speed.svg" alt="" width="48" height="48" />
      </div>
      <h3>Velocidade Extrema</h3>
      <p>Carregue suas páginas 5x mais rápido com nossa infraestrutura otimizada.</p>
    </div>
    
    <div class="benefit-card">
      <div class="benefit-icon">
        <img src="icon-security.svg" alt="" width="48" height="48" />
      </div>
      <h3>Segurança Total</h3>
      <p>Seus dados protegidos com criptografia de nível bancário.</p>
    </div>
    
    <div class="benefit-card">
      <div class="benefit-icon">
        <img src="icon-support.svg" alt="" width="48" height="48" />
      </div>
      <h3>Suporte 24/7</h3>
      <p>Nossa equipe está sempre pronta para ajudar você.</p>
    </div>
  </div>
</section>
```

### 4. Depoimentos

```html
<section class="testimonials" id="depoimentos">
  <h2>O que nossos clientes dizem</h2>
  
  <div class="testimonials-grid">
    <article class="testimonial">
      <div class="testimonial-content">
        <p>"Resultado incrível! Em apenas 3 meses, minhas vendas aumentaram 200%."</p>
      </div>
      <div class="testimonial-author">
        <img src="author1.webp" alt="Foto de Maria Silva" width="60" height="60" />
        <div>
          <strong>Maria Silva</strong>
          <span>CEO, TechStart</span>
        </div>
      </div>
      <div class="testimonial-rating">
        <span>★★★★★</span>
      </div>
    </article>
  </div>
</section>
```

### 5. Pricing (Preços)

```html
<section class="pricing" id="precos">
  <h2>Planos para todos os tamanhos</h2>
  
  <div class="pricing-grid">
    <div class="pricing-card">
      <div class="pricing-header">
        <h3>Básico</h3>
        <div class="price">
          <span class="currency">R$</span>
          <span class="amount">49</span>
          <span class="period">/mês</span>
        </div>
      </div>
      <ul class="pricing-features">
        <li>✓ 1 Usuário</li>
        <li>✓ 10GB de Armazenamento</li>
        <li>✓ Suporte por Email</li>
        <li>✗ Relatórios Avançados</li>
        <li>✗ API Access</li>
      </ul>
      <a href="#cta" class="btn-secondary">Começar Agora</a>
    </div>
    
    <div class="pricing-card featured">
      <div class="pricing-badge">Mais Popular</div>
      <div class="pricing-header">
        <h3>Profissional</h3>
        <div class="price">
          <span class="currency">R$</span>
          <span class="amount">99</span>
          <span class="period">/mês</span>
        </div>
      </div>
      <ul class="pricing-features">
        <li>✓ 5 Usuários</li>
        <li>✓ 50GB de Armazenamento</li>
        <li>✓ Suporte Prioritário</li>
        <li>✓ Relatórios Avançados</li>
        <li>✗ API Access</li>
      </ul>
      <a href="#cta" class="btn-primary">Começar Agora</a>
    </div>
    
    <div class="pricing-card">
      <div class="pricing-header">
        <h3>Enterprise</h3>
        <div class="price">
          <span class="currency">R$</span>
          <span class="amount">199</span>
          <span class="period">/mês</span>
        </div>
      </div>
      <ul class="pricing-features">
        <li>✓ Usuários Ilimitados</li>
        <li>✓ Armazenamento Ilimitado</li>
        <li>✓ Suporte 24/7</li>
        <li>✓ Relatórios Avançados</li>
        <li>✓ API Access</li>
      </ul>
      <a href="#cta" class="btn-secondary">Falar com Vendas</a>
    </div>
  </div>
</section>
```

### 6. FAQ (Perguntas Frequentes)

```html
<section class="faq" id="faq">
  <h2>Perguntas Frequentes</h2>
  
  <div class="faq-list">
    <details class="faq-item">
      <summary>Como funciona o período de teste?</summary>
      <p>Oferecemos 14 dias grátis para todos os planos. Não precisa de cartão de crédito para começar.</p>
    </details>
    
    <details class="faq-item">
      <summary>Posso cancelar a qualquer momento?</summary>
      <p>Sim! Você pode cancelar sua assinatura a qualquer momento sem multa ou taxa adicional.</p>
    </details>
    
    <details class="faq-item">
      <summary>Vocês oferecem suporte em português?</summary>
      <p>Sim! Nossa equipe de suporte fala português e está disponível 24/7.</p>
    </details>
  </div>
</section>
```

### 7. CTA Final

```html
<section class="final-cta" id="cta">
  <div class="cta-content">
    <h2>Pronto para transformar seu negócio?</h2>
    <p>Junte-se a mais de 10,000 empresas que já estão crescendo conosco.</p>
    
    <form class="cta-form">
      <input type="email" placeholder="Seu melhor email" required aria-label="Email" />
      <button type="submit" class="btn-primary">Começar Agora - Grátis</button>
    </form>
    
    <p class="cta-note">Não precisa de cartão de crédito. Cancele quando quiser.</p>
  </div>
</section>
```

## CSS para Landing Page

```css
/* Reset e Base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #64748b;
  --success: #22c55e;
  --background: #ffffff;
  --text: #1e293b;
  --text-light: #64748b;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text);
  line-height: 1.6;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
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

/* Benefícios */
.benefits {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Pricing */
.pricing {
  padding: 6rem 2rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.pricing-card.featured {
  border: 2px solid var(--primary);
  transform: scale(1.05);
}

.pricing-badge {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.price .amount {
  font-size: 3rem;
  font-weight: 800;
}

/* FAQ */
.faq {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
}

.faq-item summary {
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.faq-item summary::before {
  content: '+';
  margin-right: 0.5rem;
}

.faq-item[open] summary::before {
  content: '-';
}

/* CTA Final */
.final-cta {
  padding: 6rem 2rem;
  background: var(--primary);
  color: white;
  text-align: center;
}

.cta-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.cta-form input {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 300px;
}

/* Responsivo */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .benefits-grid,
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-form {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-form input {
    min-width: auto;
    width: 100%;
    max-width: 300px;
  }
}
```

## Copywriting Tips

### Headlines que Convertem
- Use números específicos: "Aumente suas vendas em 200%"
- Foque no benefício: "Economize 10 horas por semana"
- Crie urgência: "Oferta por tempo limitado"
- Use prova social: "Junte-se a 10,000+ clientes"

### CTAs Poderosos
- "Comece Agora - É Grátis"
- "Teste por 14 Dias Grátis"
- "Baixe o Guia Gratuito"
- "Fale com um Especialista"

### Social Proof
- Logos de clientes
- Números impressionantes
- Depoimentos reais
- Estudos de caso
- Certificações e prêmios

## Checklist de Landing Page

- [ ] Hero section com CTA claro
- [ ] Social proof visível
- [ ] Benefícios bem explicados
- [ ] Depoimentos autênticos
- [ ] Preços claros
- [ ] FAQ completo
- [ ] CTA final persuasivo
- [ ] Formulário simples
- [ ] Mobile responsive
- [ ] Velocidade de carregamento < 3s
- [ ] SEO otimizado
- [ ] Analytics configurado
- [ ] A/B testing pronto
