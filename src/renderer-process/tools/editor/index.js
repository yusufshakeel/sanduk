'use strict';

const fs = require('fs');
const path = require('path');
const activeTabElement = require('../../helpers/active-tab-element');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');

module.exports = function editorTool() {
  document.getElementById('v-pills-editor').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-editor-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-editor-btn');
  const resetFontInputBtn = document.getElementById('reset-font-editor-btn');
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
  const inputElems = [];
  const wrapInputBtns = document.getElementsByClassName('editor-input-editor-wrap-btn');

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(document.getElementById(`editor-input-editor-${id}-footer`));

    let inputEditor = window.ace.edit(`editor-input-editor-${id}`);
    setupEditor({ editor: inputEditor, rowColumnPositionElement: inputFooters[id - 1] });
    inputEditors.push(inputEditor);

    inputElems.push(document.getElementById(`editor-input-editor-${id}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-editor-tab active', 'tabid');

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapInputBtns, inputEditors);

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
