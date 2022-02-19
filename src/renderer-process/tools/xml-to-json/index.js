'use strict';

const fs = require('fs');
const path = require('path');
const xmlFormatter = require('xml-formatter');
const xmljs = require('xml-js');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const activeTabElement = require('../../helpers/active-tab-element');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');

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

  const totalTabs = 7;
  document.getElementById('xmlToJsonTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('xmlToJsonTabContent').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  const inputFooters = [];
  const outputFooters = [];
  const inputEditors = [];
  const inputElems = [];
  const outputEditors = [];
  const outputElems = [];
  const transformInputBtns = document.getElementsByClassName(
    'xml-to-json-xml-editor-transform-btn'
  );
  const prettyInputBtns = document.getElementsByClassName('xml-to-json-xml-editor-pretty-btn');
  const prettyOutputBtns = document.getElementsByClassName('xml-to-json-json-editor-pretty-btn');
  const compactInputBtns = document.getElementsByClassName('xml-to-json-xml-editor-compact-btn');
  const foldOutputBtns = document.getElementsByClassName('xml-to-json-json-editor-fold-btn');
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
    setupEditor({
      editor: inputEditor,
      rowColumnPositionElement: inputFooters[id - 1],
      mode: aceMode.xml
    });
    inputEditors.push(inputEditor);

    let outputEditor = window.ace.edit(`xml-to-json-output-editor-${id}`);
    setupEditor({
      editor: outputEditor,
      rowColumnPositionElement: outputFooters[id - 1],
      mode: aceMode.json
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

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapInputBtns, inputEditors);
  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapOutputBtns, outputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyInputBtns, inputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyOutputBtns, outputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearInputBtns, inputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearOutputBtns, outputEditors);

  for (const btn of transformInputBtns) {
    btn.addEventListener('click', () => {
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
  }

  for (const btn of prettyInputBtns) {
    btn.addEventListener('click', () => {
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
  }

  for (const btn of compactInputBtns) {
    btn.addEventListener('click', () => {
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
  }

  for (const btn of prettyOutputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(xmlToJsonMessage);
        const input = outputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, 2);
          outputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(xmlToJsonMessage, e.message);
      }
    });
  }

  for (const btn of foldOutputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      if (outputEditors[activeTabId - 1].getValue().length) {
        outputEditors[activeTabId - 1].getSession().foldAll(1);
      }
    });
  }

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
