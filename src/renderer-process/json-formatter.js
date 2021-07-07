'use strict';
let jsonlint = require('jsonlint');
const {
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_PRIMARY
} = require('../constants/alert-type-constants');

const validateInput1Btn = document.getElementById('validate-input1-btn');
const toggleWrapInput1Btn = document.getElementById('toggle-wrap-input1-btn');
const formatInput1Btn = document.getElementById('format-input1-btn');
const compactInput1Btn = document.getElementById('compact-input1-btn');
const foldInput1Btn = document.getElementById('fold-input1-btn');
const jsonInput1Message = document.getElementById('json-input1-message');
const input1Footer = document.getElementById('input1-footer');

let input1Editor;

const theme = 'ace/theme/idle_fingers';
// cobalt, idle_fingers, merbivore_soft
// dracula*, gruvbox*, tomorrow_night_eighties*
const mode = 'ace/mode/json';

window.onload = () => {
  input1Editor = window.ace.edit('json-input1');
  input1Editor.setTheme(theme);
  input1Editor.session.setMode(mode);
  input1Editor.selection.on('changeCursor', () => {
    const { row, column } = input1Editor.getCursorPosition();
    input1Footer.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
  });
};

function hideMessage(element) {
  element.innerHTML = '';
}

function showMessage(element, message, alertType = ALERT_TYPE_PRIMARY) {
  element.innerHTML = `<div class="alert alert-${alertType}" role="alert">${message}</div>`;
  setTimeout(() => hideMessage(element), 5000);
}

function isValidJSON(json, element) {
  try {
    jsonlint.parse(json);
    return true;
  } catch (e) {
    showMessage(element, e.message, ALERT_TYPE_ERROR);
  }
  return false;
}

validateInput1Btn.addEventListener('click', () => {
  const input = input1Editor.getValue();
  if (input.length && isValidJSON(input, jsonInput1Message)) {
    showMessage(jsonInput1Message, 'Valid JSON', ALERT_TYPE_SUCCESS);
  }
});

formatInput1Btn.addEventListener('click', () => {
  try {
    hideMessage(jsonInput1Message);
    const input = input1Editor.getValue();
    if (!input.length) {
      return;
    }
    const json = JSON.stringify(JSON.parse(input), null, 2);
    input1Editor.setValue(json, -1);
  } catch (e) {
    showMessage(jsonInput1Message, e.message, ALERT_TYPE_ERROR);
  }
});

compactInput1Btn.addEventListener('click', () => {
  try {
    hideMessage(jsonInput1Message);
    const input = input1Editor.getValue();
    if (!input.length) {
      return;
    }
    const json = JSON.stringify(JSON.parse(input));
    input1Editor.setValue(json, -1);
  } catch (e) {
    showMessage(jsonInput1Message, e.message, ALERT_TYPE_ERROR);
  }
});

toggleWrapInput1Btn.addEventListener('click', () => {
  if (!input1Editor.getValue().length) {
    return;
  }
  const isWrapped = toggleWrapInput1Btn.dataset.wrap === 'yes';
  if (isWrapped) {
    input1Editor.session.setUseWrapMode(false);
    toggleWrapInput1Btn.dataset.wrap = 'no';
    toggleWrapInput1Btn.innerText = 'Wrap';
  } else {
    input1Editor.session.setUseWrapMode(true);
    toggleWrapInput1Btn.dataset.wrap = 'yes';
    toggleWrapInput1Btn.innerText = 'Unwrap';
  }
});

foldInput1Btn.addEventListener('click', () => {
  if (!input1Editor.getValue().length) {
    return;
  }
  input1Editor.getSession().foldAll(1);
});

// window.onload = () => {
//   // inputEditor.session.setUseWrapMode(true);
//
//
//   foldInput1Btn.addEventListener('click', () => {
//     outputEditor.getSession().foldAll(1);
//   });
// };
