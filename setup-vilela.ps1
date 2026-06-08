# VilelaIA CLI - Instalacao Global

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VilelaIA CLI - Instalacao Global" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "[1/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "OK: Node.js $nodeVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Node.js nao encontrado" -ForegroundColor Red
    Write-Host "Instale em: https://nodejs.org" -ForegroundColor Yellow
    pause
    exit 1
}

# Verificar pnpm
Write-Host ""
Write-Host "[2/4] Verificando pnpm..." -ForegroundColor Yellow
try {
    $pnpmVersion = pnpm -v
    Write-Host "OK: pnpm $pnpmVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "ERRO: pnpm nao encontrado" -ForegroundColor Red
    Write-Host "Instale: npm install -g pnpm" -ForegroundColor Yellow
    pause
    exit 1
}

# Compilar CLI
Write-Host ""
Write-Host "[3/4] Compilando VilelaIA CLI..." -ForegroundColor Yellow
Set-Location artifacts\frontend-agent-cli
try {
    pnpm run build
    Write-Host "OK: CLI compilado com sucesso" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Falha ao compilar CLI" -ForegroundColor Red
    pause
    exit 1
}

# Instalar globalmente
Write-Host ""
Write-Host "[4/4] Instalando globalmente..." -ForegroundColor Yellow
try {
    npm link
    Write-Host "OK: CLI instalado globalmente" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Falha ao instalar globalmente" -ForegroundColor Red
    Write-Host "Tente executar este script como Administrador" -ForegroundColor Yellow
    pause
    exit 1
}

Set-Location ..\..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  VilelaIA CLI instalado com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "O comando 'vilela' agora esta disponivel globalmente." -ForegroundColor Cyan
Write-Host ""
Write-Host "Exemplos de uso:" -ForegroundColor Yellow
Write-Host "  vilela landing-page `"Landing page para SaaS`""
Write-Host "  vilela website `"Website institucional`""
Write-Host "  vilela seo -f index.html"
Write-Host "  vilela --help"
Write-Host ""
Write-Host "Configuracao da API Key:" -ForegroundColor Yellow
Write-Host "  1. Visite: https://console.groq.com"
Write-Host "  2. Crie uma conta e gere uma API Key"
Write-Host "  3. Execute: vilela config --set-key SUA_CHAVE"
Write-Host ""
pause
