'use strict';
let xmlFormatter = require('xml-formatter');
const { ALERT_TYPE_ERROR, ALERT_TYPE_PRIMARY } = require('../constants/alert-type-constants');

const formatInput1Btn = document.getElementById('format-input1-btn');
const compactInput1Btn = document.getElementById('compact-input1-btn');
const toggleWrapInput1Btn = document.getElementById('toggle-wrap-input1-btn');
const xmlInput1Message = document.getElementById('xml-input1-message');
const input1Footer = document.getElementById('input1-footer');

let input1Editor;

const theme = 'ace/theme/idle_fingers';
const mode = 'ace/mode/xml';

window.onload = () => {
  input1Editor = window.ace.edit('xml-input1');
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

formatInput1Btn.addEventListener('click', () => {
  try {
    hideMessage(xmlInput1Message);
    const input = input1Editor.getValue();
    if (!input.length) {
      return;
    }
    input1Editor.setValue(xmlFormatter(input), -1);
  } catch (e) {
    showMessage(xmlInput1Message, e.message, ALERT_TYPE_ERROR);
  }
});

compactInput1Btn.addEventListener('click', () => {
  try {
    hideMessage(xmlInput1Message);
    const input = input1Editor.getValue();
    if (!input.length) {
      return;
    }
    input1Editor.setValue(xmlFormatter(input, { indentation: '', lineSeparator: '' }), -1);
  } catch (e) {
    showMessage(xmlInput1Message, e.message, ALERT_TYPE_ERROR);
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
