'use strict';

const { clipboard } = require('electron');
const fs = require('fs');
const path = require('path');
const xmlFormatter = require('xml-formatter');
const xmljs = require('xml-js');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const inProgressTextAnimate = require('../../helpers/in-progress-text-animate');
const xmlFormatterOption = {
  indentation: '  '
};

module.exports = function xmlToJson() {
  document.getElementById('v-pills-xml-to-json').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const xmlEditorFooter = document.getElementById('xml-to-json-xml-editor-footer');
  const jsonEditorFooter = document.getElementById('xml-to-json-json-editor-footer');
  const formatXmlBtn = document.getElementById('xml-to-json-format-xml-editor-btn');
  const xmlToJsonMessage = document.getElementById('xml-to-json-message');
  const compactXmlInputBtn = document.getElementById('xml-to-json-compact-xml-editor-btn');
  const toggleWrapXmlInputBtn = document.getElementById('xml-to-json-toggle-wrap-xml-editor-btn');
  const transformBtn = document.getElementById('xml-to-json-transform-xml-editor-btn');
  const copyXmlBtn = document.getElementById('xml-to-json-xml-editor-copy-btn');
  const clearXmlBtn = document.getElementById('xml-to-json-xml-editor-clear-btn');
  const copyJsonBtn = document.getElementById('xml-to-json-json-editor-copy-btn');
  const clearJsonBtn = document.getElementById('xml-to-json-json-editor-clear-btn');

  let xmlEditor, jsonEditor;

  xmlEditor = window.ace.edit('xml-to-json-xml-editor');
  xmlEditor.setTheme(aceTheme);
  xmlEditor.session.setMode(aceMode.xml);
  xmlEditor.selection.on('changeCursor', () => {
    const { row, column } = xmlEditor.getCursorPosition();
    xmlEditorFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
  });

  jsonEditor = window.ace.edit('xml-to-json-json-editor');
  jsonEditor.setTheme(aceTheme);
  jsonEditor.session.setMode(aceMode.json);
  jsonEditor.selection.on('changeCursor', () => {
    const { row = 0, column = 0 } = jsonEditor.getCursorPosition();
    jsonEditorFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
  });

  const compactXml = input => {
    return xmlFormatter(input, { indentation: '', lineSeparator: '' });
  };

  transformBtn.addEventListener('click', () => {
    try {
      const xml = xmlEditor.getValue();
      if (!xml.length) {
        return;
      }
      const result = xmljs.xml2json(compactXml(xml), { compact: true, spaces: 0 });
      const json = JSON.stringify(JSON.parse(result), null, 2);
      jsonEditor.setValue(json, -1);
    } catch (e) {
      popError(xmlToJsonMessage, e.message);
    }
  });

  toggleWrapXmlInputBtn.addEventListener('click', () => {
    if (!xmlEditor.getValue().length) {
      return;
    }
    const isWrapped = toggleWrapXmlInputBtn.dataset.wrap === 'yes';
    if (isWrapped) {
      xmlEditor.session.setUseWrapMode(false);
      toggleWrapXmlInputBtn.dataset.wrap = 'no';
      toggleWrapXmlInputBtn.innerText = 'Wrap';
    } else {
      xmlEditor.session.setUseWrapMode(true);
      toggleWrapXmlInputBtn.dataset.wrap = 'yes';
      toggleWrapXmlInputBtn.innerText = 'Unwrap';
    }
  });

  formatXmlBtn.addEventListener('click', () => {
    try {
      clearContent(xmlToJsonMessage);
      const input = xmlEditor.getValue();
      if (!input.length) {
        return;
      }
      xmlEditor.setValue(xmlFormatter(input, xmlFormatterOption), -1);
    } catch (e) {
      popError(xmlToJsonMessage, e.message);
    }
  });

  compactXmlInputBtn.addEventListener('click', () => {
    try {
      clearContent(xmlToJsonMessage);
      const input = xmlEditor.getValue();
      if (!input.length) {
        return;
      }
      xmlEditor.setValue(compactXml(input), -1);
    } catch (e) {
      popError(xmlToJsonMessage, e.message);
    }
  });

  copyXmlBtn.addEventListener('click', () => {
    if (!xmlEditor.getValue().length) {
      return;
    }
    inProgressTextAnimate(copyXmlBtn, 'Copy', 'Copied!', 200);
    clipboard.writeText(xmlEditor.getValue());
  });

  copyJsonBtn.addEventListener('click', () => {
    if (!jsonEditor.getValue().length) {
      return;
    }
    inProgressTextAnimate(copyJsonBtn, 'Copy', 'Copied!', 200);
    clipboard.writeText(jsonEditor.getValue());
  });

  clearXmlBtn.addEventListener('click', () => {
    xmlEditor.setValue('');
  });

  clearJsonBtn.addEventListener('click', () => {
    jsonEditor.setValue('');
  });
};
