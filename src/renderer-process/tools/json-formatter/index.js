'use strict';

const fs = require('fs');
const path = require('path');
const popError = require('../../helpers/pop-error');
const popSuccess = require('../../helpers/pop-success');
const clearContent = require('../../helpers/clear-content');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const activeTabElement = require('../../helpers/active-tab-element');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');

module.exports = function jsonFormatterTool() {
  document.getElementById('v-pills-json-formatter').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-input-json-formatter-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-input-json-formatter-btn');
  const resetFontInputBtn = document.getElementById('reset-font-input-json-formatter-btn');
  const jsonInputMessage = document.getElementById('json-formatter-input-message');

  const totalTabs = 7;
  document.getElementById('jsonFormatterTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('jsonFormatterTabContent').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  const inputFooters = [];
  const inputEditors = [];
  const inputElems = [];
  const validateInputBtns = document.getElementsByClassName('json-formatter-editor-validate-btn');
  const prettyInputBtns = document.getElementsByClassName('json-formatter-editor-pretty-btn');
  const compactInputBtns = document.getElementsByClassName('json-formatter-editor-compact-btn');
  const foldInputBtns = document.getElementsByClassName('json-formatter-editor-fold-btn');
  const wrapInputBtns = document.getElementsByClassName('json-formatter-editor-wrap-btn');
  const copyInputBtns = document.getElementsByClassName('json-formatter-editor-copy-btn');
  const clearInputBtns = document.getElementsByClassName('json-formatter-editor-clear-btn');

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(document.getElementById(`json-formatter-input-editor-${id}-footer`));

    let inputEditor = window.ace.edit(`json-formatter-input-editor-${id}`);
    setupEditor({
      editor: inputEditor,
      rowColumnPositionElement: inputFooters[id - 1],
      mode: aceMode.json
    });
    inputEditors.push(inputEditor);

    inputElems.push(document.getElementById(`json-formatter-input-editor-${id}`));
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

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapInputBtns, inputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyInputBtns, inputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearInputBtns, inputEditors);

  for (const btn of validateInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const input = inputEditors[activeTabId - 1].getValue();
      if (input.length && isValidJSON(input, jsonInputMessage)) {
        popSuccess(jsonInputMessage, 'Valid JSON');
      }
    });
  }

  for (const btn of prettyInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(jsonInputMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, 2);
          inputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(jsonInputMessage, e.message);
      }
    });
  }

  for (const btn of compactInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(jsonInputMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input));
          inputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(jsonInputMessage, e.message);
      }
    });
  }

  for (const btn of foldInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      if (inputEditors[activeTabId - 1].getValue().length) {
        inputEditors[activeTabId - 1].getSession().foldAll(1);
      }
    });
  }

  increaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(inputElems[activeTabId - 1]);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(inputElems[activeTabId - 1]);
  });

  resetFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(inputElems[activeTabId - 1]);
  });
};
