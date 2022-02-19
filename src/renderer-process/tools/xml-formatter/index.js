'use strict';

const fs = require('fs');
const path = require('path');
const xmlFormatter = require('xml-formatter');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const activeTabElement = require('../../helpers/active-tab-element');
const setupEditor = require('../../editor/setup-editor');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const fontSize = require('../../editor/font-size');

const xmlFormatterOption = {
  indentation: '  '
};

module.exports = function xmlFormatterTool() {
  document.getElementById('v-pills-xml-formatter').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-input-xml-formatter-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-input-xml-formatter-btn');
  const resetFontInputBtn = document.getElementById('reset-font-input-xml-formatter-btn');
  const xmlInputMessage = document.getElementById('xml-formatter-input-message');

  const totalTabs = 7;
  document.getElementById('xmlFormatterTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('xmlFormatterTabContent').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  const inputFooters = [];
  const inputEditors = [];
  const inputElems = [];
  const prettyInputBtns = document.getElementsByClassName('xml-formatter-format-input-btn');
  const compactInputBtns = document.getElementsByClassName('xml-formatter-compact-input-btn');
  const wrapInputBtns = document.getElementsByClassName('xml-formatter-toggle-wrap-input-btn');
  const copyInputBtns = document.getElementsByClassName('xml-formatter-editor-copy-btn');
  const clearInputBtns = document.getElementsByClassName('xml-formatter-editor-clear-btn');

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(document.getElementById(`xml-formatter-input-editor-${id}-footer`));

    let inputEditor = window.ace.edit(`xml-formatter-input-editor-${id}`);
    setupEditor({
      editor: inputEditor,
      rowColumnPositionElement: inputFooters[id - 1],
      mode: aceMode.xml
    });
    inputEditors.push(inputEditor);

    inputElems.push(document.getElementById(`xml-formatter-input-editor-${id}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-xml-formatter-tab active', 'tabid');

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapInputBtns, inputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyInputBtns, inputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearInputBtns, inputEditors);

  for (const btn of prettyInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(xmlInputMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (!input.length) {
          return;
        }
        inputEditors[activeTabId - 1].setValue(xmlFormatter(input, xmlFormatterOption), -1);
      } catch (e) {
        popError(xmlInputMessage, e.message);
      }
    });
  }

  for (const btn of compactInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(xmlInputMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (!input.length) {
          return;
        }
        inputEditors[activeTabId - 1].setValue(
          xmlFormatter(input, { indentation: '', lineSeparator: '' }),
          -1
        );
      } catch (e) {
        popError(xmlInputMessage, e.message);
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
