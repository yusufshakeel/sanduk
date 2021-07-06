'use strict';

const jsonInputMessage = document.getElementById('json-input-message');
const formatBtn = document.getElementById('format-btn');
const foldAllBtn = document.getElementById('foldAll-btn');

let inputEditor;
let outputEditor;

window.onload = () => {
  inputEditor = window.ace.edit('json-input');
  inputEditor.setTheme('ace/theme/dracula');
  inputEditor.session.setMode('ace/mode/json');
  inputEditor.session.setUseWrapMode(true);

  outputEditor = window.ace.edit('json-output');
  outputEditor.setTheme('ace/theme/dracula');
  outputEditor.session.setMode('ace/mode/json');
  outputEditor.session.setUseWrapMode(true);

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
      const json = JSON.stringify(JSON.parse(input), null, 2);
      outputEditor.setValue(json);
    } catch (e) {
      showError(e.message);
    }
  });

  foldAllBtn.addEventListener('click', () => {
    outputEditor.getSession().foldAll(1);
  });
};
