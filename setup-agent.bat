@echo off
REM Frontend Agent CLI - Setup e Teste

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     Frontend Agent CLI - Diagnóstico e Setup                  ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo ⏳ Verificando Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado
    echo 💡 Instale em: https://nodejs.org
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% instalado

REM Verificar pnpm
echo.
echo ⏳ Verificando pnpm...
pnpm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pnpm não encontrado
    echo 💡 Instale: npm install -g pnpm
    exit /b 1
)
for /f "tokens=*" %%i in ('pnpm -v') do set PNPM_VERSION=%%i
echo ✅ pnpm %PNPM_VERSION% instalado

REM Verificar CLI compilado
echo.
echo ⏳ Verificando CLI compilado...
if exist "artifacts\frontend-agent-cli\dist\cli.js" (
    echo ✅ CLI compilado encontrado
) else (
    echo ❌ CLI não compilado
    echo 💡 Execute: pnpm -C artifacts/frontend-agent-cli run build
    exit /b 1
)

REM Verificar GROQ_API_KEY
echo.
echo ⏳ Verificando GROQ_API_KEY...
if "%GROQ_API_KEY%"=="" (
    echo ❌ GROQ_API_KEY não configurada
    echo.
    echo 📋 COMO CONFIGURAR:
    echo ═════════════════
    echo 1. Visite: https://console.groq.com
    echo 2. Faça login ou crie conta
    echo 3. Vá em: Settings → API Keys
    echo 4. Copie sua chave
    echo.
    echo 5. PowerShell (como Admin):
    echo    ^[Environment^]::SetEnvironmentVariable^(
    echo      "GROQ_API_KEY", 
    echo      "sua_chave_aqui", 
    echo      "User"
    echo    ^)
    echo.
    echo 6. Feche e abra PowerShell de novo
    echo.
) else (
    echo ✅ GROQ_API_KEY configurada
)

REM Listar estrutura
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║ ESTRUTURA DO PROJETO                                           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
tree /F artifacts\frontend-agent-cli /L

REM Menu de ações
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║ OPÇÕES                                                         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 1 - Testar agente (se API Key configurada)
echo 2 - Abrir README (documentação)
echo 3 - Abrir QUICK_START (guia rápido PT-BR)
echo 4 - Criar executável .exe (requer pkg)
echo 5 - Sair
echo.

choice /C 12345 /M "Escolha uma opção (1-5): "

if %errorlevel% == 1 (
    goto TEST
) else if %errorlevel% == 2 (
    goto README
) else if %errorlevel% == 3 (
    goto QUICKSTART
) else if %errorlevel% == 4 (
    goto BUILDEXE
) else (
    goto END
)

:TEST
echo.
echo 🤖 Testando agente...
echo.
if "%GROQ_API_KEY%"=="" (
    echo ❌ GROQ_API_KEY não configurada!
    echo Configure primeiro (opção 1 do setup)
    pause
    exit /b 1
)

.\artifacts\frontend-agent-cli\dist\cli.js build "um botão com animação CSS"
pause
goto END

:README
echo.
start artifacts\frontend-agent-cli\README.md
goto END

:QUICKSTART
echo.
start AGENT_QUICK_START.md
goto END

:BUILDEXE
echo.
echo ⏳ Instalando pkg globalmente...
npm install -g pkg

echo.
echo 🔨 Compilando para .exe...
pnpm -C artifacts/frontend-agent-cli run build:exe

echo.
echo ✅ Executável criado em:
echo    artifacts\frontend-agent-cli\dist\agent.exe
echo.
echo 💡 Para usar de qualquer lugar, adicione ao PATH:
echo    1. Copie agent.exe para C:\Program Files\agent\
echo    2. Adicione C:\Program Files\agent ao PATH do Windows
echo.
pause
goto END

:END
echo.
echo ═════════════════════════════════════════════════════════════════
echo Até logo! 👋
echo ═════════════════════════════════════════════════════════════════
pause
endlocal
