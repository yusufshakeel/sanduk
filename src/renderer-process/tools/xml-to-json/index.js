'use strict';

const fs = require('fs');
const path = require('path');
const xmlFormatter = require('xml-formatter');
const xmljs = require('xml-js');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const activeTabElement = require('../../helpers/active-tab-element');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const fontSize = require('../../editor/font-size');
const wrapContentHandler = require('./handlers/wrap-content-handler');
const copyBtnHandler = require('./handlers/copy-btn-handler');
const clearBtnHandler = require('./handlers/clear-btn-handler');

const xmlFormatterOption = {
  indentation: '  '
};

module.exports = function xmlToJson() {
  document.getElementById('v-pills-xml-to-json').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-xml-to-json-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-xml-to-json-btn');
  const resetFontInputBtn = document.getElementById('reset-font-xml-to-json-btn');
  const xmlToJsonMessage = document.getElementById('xml-to-json-message');
  const formatXmlBtn = document.getElementById('xml-to-json-format-xml-editor-btn');
  const transformBtn = document.getElementById('xml-to-json-transform-xml-editor-btn');
  const compactXmlInputBtn = document.getElementById('xml-to-json-compact-xml-editor-btn');

  const totalTabs = 7;
  document.getElementById('xmlToJsonTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('xmlToJsonTabContent').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  let inputFooters = [];
  let outputFooters = [];
  let inputEditors = [];
  let inputElems = [];
  let outputEditors = [];
  let outputElems = [];
  const wrapInputBtns = document.getElementsByClassName('xml-to-json-xml-editor-wrap-btn');
  const copyInputBtns = document.getElementsByClassName('xml-to-json-xml-editor-copy-btn');
  const clearInputBtns = document.getElementsByClassName('xml-to-json-xml-editor-clear-btn');
  const wrapOutputBtns = document.getElementsByClassName('xml-to-json-json-editor-wrap-btn');
  const copyOutputBtns = document.getElementsByClassName('xml-to-json-json-editor-copy-btn');
  const clearOutputBtns = document.getElementsByClassName('xml-to-json-json-editor-clear-btn');

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(document.getElementById(`xml-to-json-input-editor-${id}-footer`));
    outputFooters.push(document.getElementById(`xml-to-json-output-editor-${id}-footer`));

    let inputEditor = window.ace.edit(`xml-to-json-input-editor-${id}`);
    inputEditor.setTheme(aceTheme);
    inputEditor.session.setMode(aceMode.xml);
    inputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = inputEditor.getCursorPosition();
      inputFooters[id - 1].innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });
    inputEditors.push(inputEditor);

    let outputEditor = window.ace.edit(`xml-to-json-output-editor-${id}`);
    outputEditor.setTheme(aceTheme);
    outputEditor.session.setMode(aceMode.json);
    outputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = outputEditor.getCursorPosition();
      outputFooters[id - 1].innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });
    outputEditors.push(outputEditor);

    inputElems.push(document.getElementById(`xml-to-json-input-editor-${id}`));
    outputElems.push(document.getElementById(`xml-to-json-output-editor-${id}`));
  }

  const compactXml = input => {
    return xmlFormatter(input, { indentation: '', lineSeparator: '' });
  };

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-xml-to-json-tab active', 'tabid');

  wrapContentHandler.initWrapContentHandler(getActiveTabId, wrapInputBtns, inputEditors);
  wrapContentHandler.initWrapContentHandler(getActiveTabId, wrapOutputBtns, outputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyInputBtns, inputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyOutputBtns, outputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearInputBtns, inputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearOutputBtns, outputEditors);

  transformBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      const xml = inputEditors[activeTabId - 1].getValue();
      if (!xml.length) {
        return;
      }
      const result = xmljs.xml2json(compactXml(xml), { compact: true, spaces: 0 });
      const json = JSON.stringify(JSON.parse(result), null, 2);
      outputEditors[activeTabId - 1].setValue(json, -1);
    } catch (e) {
      popError(xmlToJsonMessage, e.message);
    }
  });

  formatXmlBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      clearContent(xmlToJsonMessage);
      const input = inputEditors[activeTabId - 1].getValue();
      if (!input.length) {
        return;
      }
      inputEditors[activeTabId - 1].setValue(xmlFormatter(input, xmlFormatterOption), -1);
    } catch (e) {
      popError(xmlToJsonMessage, e.message);
    }
  });

  compactXmlInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      clearContent(xmlToJsonMessage);
      const input = inputEditors[activeTabId - 1].getValue();
      if (!input.length) {
        return;
      }
      inputEditors[activeTabId - 1].setValue(compactXml(input), -1);
    } catch (e) {
      popError(xmlToJsonMessage, e.message);
    }
  });

  increaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(inputElems[activeTabId - 1]);
    fontSize.increaseFontSize(outputElems[activeTabId - 1]);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(inputElems[activeTabId - 1]);
    fontSize.decreaseFontSize(outputElems[activeTabId - 1]);
  });

  resetFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(inputElems[activeTabId - 1]);
    fontSize.resetFontSize(outputElems[activeTabId - 1]);
  });
};
