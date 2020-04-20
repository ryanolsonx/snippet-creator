const vscode = require('vscode');
const { createBody } = require('./utils');

async function gatherSnippet() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;

  if (!editor || selection.isEmpty) {
    vscode.window.showWarningMessage(
      'Cannot create snippet from empty string. Select some text first.'
    );
    return;
  }

  const prefix = await vscode.window.showInputBox({
    prompt: 'Enter snippet prefix'
  });

  let description
  if (vscode.workspace.getConfiguration().get("snippet-creator.autoDescription")) {
    description = prefix
  } else {
    description = await vscode.window.showInputBox({
      prompt: 'Enter snippet description'
    });
  }


  return {
    language: editor.document.languageId,
    prefix,
    description,
    body: createBody(
      editor.document.getText(selection),
      editor.document.languageId
    )
  };
}

module.exports = gatherSnippet;
