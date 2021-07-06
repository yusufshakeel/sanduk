'use strict';

const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const jsonInputMessage = document.getElementById('json-input-message');
const formatBtn = document.getElementById('format-btn');

let inputEditor;
let outputEditor;

window.onload = () => {
  inputEditor = window.CodeMirror.fromTextArea(jsonInput, {
    mode: { name: 'javascript', json: true },
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    theme: 'dracula',
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    foldOptions: {
      widget: (from, to) => {
        let count = undefined;

        // Get open / close token
        let startToken = '{',
          endToken = '}';
        let prevLine = inputEditor.getLine(from.line);
        if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
          (startToken = '['), (endToken = ']');
        }

        // Get json content
        let internal = inputEditor.getRange(from, to);
        let toParse = startToken + internal + endToken;

        // Get key count
        try {
          let parsed = JSON.parse(toParse);
          count = Object.keys(parsed).length;
        } catch (e) {
          //
        }

        return count ? `\u21A4${count}\u21A6` : '\u2194';
      }
    }
  });

  outputEditor = window.CodeMirror.fromTextArea(jsonOutput, {
    mode: { name: 'javascript', json: true },
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    theme: 'dracula',
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    foldOptions: {
      widget: (from, to) => {
        let count = undefined;

        // Get open / close token
        let startToken = '{',
          endToken = '}';
        let prevLine = outputEditor.getLine(from.line);
        if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
          (startToken = '['), (endToken = ']');
        }

        // Get json content
        let internal = outputEditor.getRange(from, to);
        let toParse = startToken + internal + endToken;

        // Get key count
        try {
          let parsed = JSON.parse(toParse);
          count = Object.keys(parsed).length;
        } catch (e) {
          //
        }

        return count ? `\u21A4${count}\u21A6` : '\u2194';
      }
    }
  });

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
};
