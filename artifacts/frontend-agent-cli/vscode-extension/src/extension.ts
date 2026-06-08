import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';

export class FrontendAgentProvider implements vscode.ChatParticipantHandler {
  async provideChatParticipantResponse(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<void> {
    const message = request.prompt;
    const editor = vscode.window.activeTextEditor;
    const selectedCode = editor?.document.getText(editor.selection) || '';

    stream.progress('🤖 Processando sua solicitação...');

    try {
      // Parse do comando (ex: /build, /fix, etc)
      const command = this.parseCommand(message);
      const description = message.replace(/^\/\w+\s*/, '');

      // Executa o agente CLI
      const result = await this.executeAgent(command, description, selectedCode);

      stream.markdown(result);

      // Se for código, oferece opção de inserir
      if (command === 'build' || command === 'generate') {
        const insertAction = await vscode.window.showInformationMessage(
          '💡 Inserir código no editor?',
          'Sim',
          'Copiar',
          'Cancelar'
        );

        if (insertAction === 'Sim' && editor) {
          editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.end, '\n' + result);
          });
        } else if (insertAction === 'Copiar') {
          await vscode.env.clipboard.writeText(result);
          vscode.window.showInformationMessage('✅ Copiado para clipboard!');
        }
      }
    } catch (error) {
      stream.markdown(`❌ Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private parseCommand(message: string): string {
    const match = message.match(/^\/(\w+)/);
    return match ? match[1] : 'build';
  }

  private executeAgent(command: string, description: string, code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const args = [command, description];
      if (code) {
        args.push('-c', code);
      }

      cp.execFile('agent', args, { timeout: 30000 }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
        } else {
          resolve(stdout);
        }
      });
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provider = new FrontendAgentProvider();

  // Registra o chat participant
  const participant = vscode.chat.createChatParticipant(
    'frontend-agent',
    provider
  );

  participant.iconPath = new vscode.ThemeIcon('sparkle');

  // Comandos rápidos
  context.subscriptions.push(
    vscode.commands.registerCommand('frontend-agent.build', async () => {
      const input = await vscode.window.showInputBox({
        prompt: '📝 Descreva o que você quer construir',
        placeHolder: 'ex: um formulário de login com validação',
      });

      if (input) {
        await vscode.chat.openChatPanel();
        await vscode.commands.executeCommand('workbench.action.chat.open');
      }
    }),

    vscode.commands.registerCommand('frontend-agent.review', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('Nenhum arquivo aberto');
        return;
      }

      vscode.window.showInformationMessage(
        '👀 Code review iniciado...',
        '✓ OK'
      );
    })
  );
}

export function deactivate() {}
