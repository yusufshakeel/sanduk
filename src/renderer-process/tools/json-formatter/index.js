'use strict';

const fs = require('fs');
const path = require('path');
const popError = require('../../helpers/pop-error');
const popSuccess = require('../../helpers/pop-success');
const clearContent = require('../../helpers/clear-content');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const fontSize = require('../../editor/font-size');
const activeTabElement = require('../../helpers/active-tab-element');

module.exports = function jsonFormatterTool() {
  document.getElementById('v-pills-json-formatter').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-input-json-formatter-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-input-json-formatter-btn');
  const resetFontInputBtn = document.getElementById('reset-font-input-json-formatter-btn');
  const validateInputBtn = document.getElementById('validate-input-json-formatter-btn');
  const formatInputBtn = document.getElementById('format-input-json-formatter-btn');
  const compactInputBtn = document.getElementById('compact-input-json-formatter-btn');
  const foldInputBtn = document.getElementById('fold-input-json-formatter-btn');
  const toggleWrapInputBtn = document.getElementById('toggle-wrap-input-json-formatter-btn');
  const jsonInputMessage = document.getElementById('json-formatter-input-message');

  const totalTabs = 7;

  let inputFooters = [];
  let wrappedTabContent = [];
  let jsonInputEditors = [];
  let jsonInputElems = [];
  for (let i = 1; i <= totalTabs; i++) {
    inputFooters.push(document.getElementById(`json-formatter-input-tab-${i}-footer`));

    wrappedTabContent.push(false);

    let jsonInputEditor = window.ace.edit(`json-formatter-input-tab-${i}`);
    jsonInputEditor.setTheme(aceTheme);
    jsonInputEditor.session.setMode(aceMode.json);
    jsonInputEditor.setShowPrintMargin(false);
    jsonInputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = jsonInputEditor.getCursorPosition();
      inputFooters[i - 1].innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });
    jsonInputEditors.push(jsonInputEditor);

    jsonInputElems.push(document.getElementById(`json-formatter-input-tab-${i}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-json-formatter-tab active', 'tabid');

  const isValidJSON = (json, element) => {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      popError(element, e.message);
    }
    return false;
  };

  validateInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    const input = jsonInputEditors[activeTabId - 1].getValue();
    if (input.length && isValidJSON(input, jsonInputMessage)) {
      popSuccess(jsonInputMessage, 'Valid JSON');
    }
  });

  formatInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      clearContent(jsonInputMessage);
      const input = jsonInputEditors[activeTabId - 1].getValue();
      if (!input.length) {
        return;
      }
      const json = JSON.stringify(JSON.parse(input), null, 2);
      jsonInputEditors[activeTabId - 1].setValue(json, -1);
    } catch (e) {
      popError(jsonInputMessage, e.message);
    }
  });

  compactInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      clearContent(jsonInputMessage);
      const input = jsonInputEditors[activeTabId - 1].getValue();
      if (!input.length) {
        return;
      }
      const json = JSON.stringify(JSON.parse(input));
      jsonInputEditors[activeTabId - 1].setValue(json, -1);
    } catch (e) {
      popError(jsonInputMessage, e.message);
    }
  });

  toggleWrapInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (!jsonInputEditors[activeTabId - 1].getValue().length) {
      return;
    }
    const isWrapped = wrappedTabContent[activeTabId - 1];
    if (isWrapped) {
      jsonInputEditors[activeTabId - 1].session.setUseWrapMode(false);
      wrappedTabContent[activeTabId - 1] = false;
    } else {
      jsonInputEditors[activeTabId - 1].session.setUseWrapMode(true);
      wrappedTabContent[activeTabId - 1] = true;
    }
  });

  foldInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (!jsonInputEditors[activeTabId - 1].getValue().length) {
      return;
    }
    jsonInputEditors[activeTabId - 1].getSession().foldAll(1);
  });

  increaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(jsonInputElems[activeTabId - 1]);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(jsonInputElems[activeTabId - 1]);
  });

  resetFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(jsonInputElems[activeTabId - 1]);
  });
};
