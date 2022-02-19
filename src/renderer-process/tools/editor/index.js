'use strict';

const fs = require('fs');
const path = require('path');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const activeTabElement = require('../../helpers/active-tab-element');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');

module.exports = function editorTool() {
  document.getElementById('v-pills-editor').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  // const editorMessage = document.getElementById('editor-input-message');

  const totalTabs = 7;
  document.getElementById('editorTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('editorTabContent').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  const inputFooters = [];
  const inputEditors = [];
  // const inputElems = [];
  const wrapInputBtns = document.getElementsByClassName('editor-input-editor-wrap-btn');

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(document.getElementById(`editor-input-editor-${id}-footer`));

    let inputEditor = window.ace.edit(`editor-input-editor-${id}`);
    inputEditor.setTheme(aceTheme);
    inputEditor.session.setMode(aceMode.text);
    inputEditor.setShowPrintMargin(false);
    inputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = inputEditor.getCursorPosition();
      inputFooters[id - 1].innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });
    inputEditors.push(inputEditor);

    // inputElems.push(document.getElementById(`editor-input-editor-${id}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-editor-tab active', 'tabid');

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapInputBtns, inputEditors);
};
