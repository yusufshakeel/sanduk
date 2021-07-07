'use strict';

const jsonInputMessage = document.getElementById('json-input-message');
const formatBtn = document.getElementById('format-btn');
const foldOutputBtn = document.getElementById('fold-output-btn');

let inputEditor;
let outputEditor;

const theme = 'ace/theme/cobalt';
// cobalt, idle_fingers, merbivore_soft
// dracula*, gruvbox*, tomorrow_night_eighties*
const mode = 'ace/mode/json';

window.onload = () => {
  inputEditor = window.ace.edit('json-input');
  inputEditor.setTheme(theme);
  inputEditor.session.setMode(mode);
  // inputEditor.session.setUseWrapMode(true);

  outputEditor = window.ace.edit('json-output');
  outputEditor.setTheme(theme);
  outputEditor.session.setMode(mode);
  // outputEditor.session.setUseWrapMode(true);

  function hideError() {
    jsonInputMessage.innerHTML = '';
  }

  function showError(message) {
    jsonInputMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    setTimeout(hideError, 5000);
  }

  formatBtn.addEventListener('click', () => {
    try {
      hideError();
      const input = inputEditor.getValue();
      if (!input.length) {
        return;
      }
      const json = JSON.stringify(JSON.parse(input), null, 2);
      outputEditor.setValue(json);
    } catch (e) {
      showError(e.message);
    }
  });

  foldOutputBtn.addEventListener('click', () => {
    outputEditor.getSession().foldAll(1);
  });
};
