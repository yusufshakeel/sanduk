'use strict';

const fs = require('fs');
const path = require('path');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const fontSize = require('../../editor/font-size');
const activeTabElement = require('../../helpers/active-tab-element');

module.exports = function editorTool() {
  document.getElementById('v-pills-editor').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-input-editor-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-input-editor-btn');
  const resetFontInputBtn = document.getElementById('reset-font-input-editor-btn');
  const wrapInputBtn = document.getElementById('wrap-input-editor-btn');

  const totalTabs = 7;

  let inputFooters = [];
  let wrappedTabContent = [];
  let editorInputEditors = [];
  let editorInputElems = [];
  for (let i = 1; i <= totalTabs; i++) {
    inputFooters.push(document.getElementById(`editor-input-tab-${i}-footer`));

    wrappedTabContent.push(false);

    let editorInputEditor = window.ace.edit(`editor-input-tab-${i}`);
    editorInputEditor.setTheme(aceTheme);
    editorInputEditor.session.setMode(aceMode.text);
    editorInputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = editorInputEditor.getCursorPosition();
      inputFooters[i - 1].innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });
    editorInputEditors.push(editorInputEditor);

    editorInputElems.push(document.getElementById(`editor-input-tab-${i}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-editor-tab active', 'tabid');

  increaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(editorInputElems[activeTabId - 1]);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(editorInputElems[activeTabId - 1]);
  });

  resetFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(editorInputElems[activeTabId - 1]);
  });

  wrapInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (!editorInputEditors[activeTabId - 1].getValue().length) {
      return;
    }
    const isWrapped = wrappedTabContent[activeTabId - 1];
    if (isWrapped) {
      editorInputEditors[activeTabId - 1].session.setUseWrapMode(false);
      wrappedTabContent[activeTabId - 1] = false;
    } else {
      editorInputEditors[activeTabId - 1].session.setUseWrapMode(true);
      wrappedTabContent[activeTabId - 1] = true;
    }
  });
};
