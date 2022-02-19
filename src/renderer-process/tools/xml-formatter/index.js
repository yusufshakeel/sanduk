'use strict';

const fs = require('fs');
const path = require('path');
const xmlFormatter = require('xml-formatter');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const activeTabElement = require('../../helpers/active-tab-element');
const setupEditor = require('../../editor/setup-editor');
const xmlFormatterOption = {
  indentation: '  '
};

module.exports = function xmlFormatterTool() {
  document.getElementById('v-pills-xml-formatter').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const formatInputBtn = document.getElementById('xml-formatter-format-input-btn');
  const compactInputBtn = document.getElementById('xml-formatter-compact-input-btn');
  const toggleWrapInputBtn = document.getElementById('xml-formatter-toggle-wrap-input-btn');
  const xmlInputMessage = document.getElementById('xml-formatter-input-message');

  const totalTabs = 7;

  let inputFooters = [];
  let wrappedTabContent = [];
  let xmlInputEditors = [];
  for (let i = 1; i <= totalTabs; i++) {
    inputFooters.push(document.getElementById(`xml-formatter-input-tab-${i}-footer`));

    wrappedTabContent.push(false);

    let xmlInputEditor = window.ace.edit(`xml-formatter-input-tab-${i}`);
    setupEditor({
      editor: xmlInputEditor,
      rowColumnPositionElement: inputFooters[i - 1],
      mode: aceMode.xml
    });
    xmlInputEditors.push(xmlInputEditor);
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-xml-formatter-tab active', 'tabid');

  formatInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      clearContent(xmlInputMessage);
      const input = xmlInputEditors[activeTabId - 1].getValue();
      if (!input.length) {
        return;
      }
      xmlInputEditors[activeTabId - 1].setValue(xmlFormatter(input, xmlFormatterOption), -1);
    } catch (e) {
      popError(xmlInputMessage, e.message);
    }
  });

  compactInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    try {
      clearContent(xmlInputMessage);
      const input = xmlInputEditors[activeTabId - 1].getValue();
      if (!input.length) {
        return;
      }
      xmlInputEditors[activeTabId - 1].setValue(
        xmlFormatter(input, { indentation: '', lineSeparator: '' }),
        -1
      );
    } catch (e) {
      popError(xmlInputMessage, e.message);
    }
  });

  toggleWrapInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (!xmlInputEditors[activeTabId - 1].getValue().length) {
      return;
    }
    const isWrapped = wrappedTabContent[activeTabId - 1];
    if (isWrapped) {
      xmlInputEditors[activeTabId - 1].session.setUseWrapMode(false);
      wrappedTabContent[activeTabId - 1] = false;
    } else {
      xmlInputEditors[activeTabId - 1].session.setUseWrapMode(true);
      wrappedTabContent[activeTabId - 1] = true;
    }
  });
};
