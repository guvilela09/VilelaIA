@echo off
REM VilelaIA CLI - Instalacao Global

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   VilelaIA CLI - Instalacao Global
echo ========================================
echo.

echo [1/4] Verificando Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado
    echo Instale em: https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo OK: Node.js %NODE_VERSION% instalado

echo.
echo [2/4] Verificando pnpm...
pnpm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: pnpm nao encontrado
    echo Instale: npm install -g pnpm
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('pnpm -v') do set PNPM_VERSION=%%i
echo OK: pnpm %PNPM_VERSION% instalado

echo.
echo [3/4] Compilando VilelaIA CLI...
cd artifacts\frontend-agent-cli
call pnpm run build
if %errorlevel% neq 0 (
    echo ERRO: Falha ao compilar CLI
    pause
    exit /b 1
)
echo OK: CLI compilado com sucesso

echo.
echo [4/4] Instalando globalmente...
call npm link
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar globalmente
    echo Tente executar este script como Administrador
    pause
    exit /b 1
)

echo.
echo ========================================
echo   VilelaIA CLI instalado com sucesso!
echo ========================================
echo.
echo O comando 'vilela' agora esta disponivel globalmente.
echo.
echo Exemplos de uso:
echo   vilela landing-page "Landing page para SaaS"
echo   vilela website "Website institucional"
echo   vilela seo -f index.html
echo   vilela --help
echo.
echo Configuracao da API Key:
echo   1. Visite: https://console.groq.com
echo   2. Crie uma conta e gere uma API Key
echo   3. Execute: vilela config --set-key SUA_CHAVE
echo.
pause
