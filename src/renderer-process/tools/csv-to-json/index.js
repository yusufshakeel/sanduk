'use strict';

const stream = require('stream');
const fastCsv = require('fast-csv');
const { readCsv } = require('../../functions');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const popError = require('../../helpers/pop-error');
const activeTabElement = require('../../helpers/active-tab-element');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const tabsTemplate = require('./templates/tabs-template');
const { SANDUK_UI_WORK_AREA_CSV_TO_JSON_TAB_PANE_ID } = require('../../constants/ui-constants');
const ui = require('./ui');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');
const fn = require('../../functions');

module.exports = function xmlToJson() {
  const prefix = 'sanduk-csv-to-json';
  const prefixForCsvEditor = 'sanduk-csv-to-json-csv';
  const prefixForJsonEditor = 'sanduk-csv-to-json-json';
  const toolName = 'CSV to JSON';
  const totalTabs = 7;
  const totalSpaces = 2;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForCsvEditor,
    prefixForJsonEditor,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_CSV_TO_JSON_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElementsForCsvEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForCsvEditor,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.TRANSFORM
    ]
  });
  const tabPaneNavItemElementsForJsonEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForJsonEditor,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.PRETTY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.FOLD,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COMPACT,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.TRANSFORM
    ]
  });

  const csvEditorLineColumnPositionFooterElements = [];
  const csvEditors = [];
  const csvEditorElements = [];

  const jsonEditorLineColumnPositionFooterElements = [];
  const jsonEditors = [];
  const jsonEditorElements = [];

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    csvEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForCsvEditor, id })
    );
    jsonEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForJsonEditor, id })
    );

    const csvEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForCsvEditor, id })
    );
    setupEditor({
      editor: csvEditor,
      rowColumnPositionElement: csvEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    csvEditors.push(csvEditor);

    const jsonEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForJsonEditor, id })
    );
    setupEditor({
      editor: jsonEditor,
      rowColumnPositionElement: jsonEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.json
    });
    jsonEditors.push(jsonEditor);

    csvEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForCsvEditor, id }));
    jsonEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForJsonEditor, id }));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // Csv - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForCsvEditor.wrapNavItemElements,
    csvEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForCsvEditor.copyNavItemElements,
    csvEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForCsvEditor.clearNavItemElements,
    csvEditors
  );

  // Json - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForJsonEditor.wrapNavItemElements,
    jsonEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForJsonEditor.copyNavItemElements,
    jsonEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForJsonEditor.clearNavItemElements,
    jsonEditors
  );

  // font size adjustments
  increaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(csvEditorElements[activeTabId - 1]);
    fontSize.increaseFontSize(jsonEditorElements[activeTabId - 1]);
  });
  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(csvEditorElements[activeTabId - 1]);
    fontSize.decreaseFontSize(jsonEditorElements[activeTabId - 1]);
  });
  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(csvEditorElements[activeTabId - 1]);
    fontSize.resetFontSize(jsonEditorElements[activeTabId - 1]);
  });

  // Csv to json
  for (const btn of tabPaneNavItemElementsForCsvEditor.transformNavItemElements) {
    btn.addEventListener('click', async () => {
      const activeTabId = getActiveTabId();
      try {
        const csv = csvEditors[activeTabId - 1].getValue();
        if (csv.length) {
          const { Readable } = stream;
          const readable = new Readable();
          readable.push(csv);
          readable.push(null);
          const { data: jsonResult } = await readCsv(readable, { headers: true });
          const json = JSON.stringify(jsonResult, null, totalSpaces);
          jsonEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // Json pretty
  for (const btn of tabPaneNavItemElementsForJsonEditor.prettyNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = jsonEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
          jsonEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // Json fold
  for (const btn of tabPaneNavItemElementsForJsonEditor.foldNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const input = jsonEditors[activeTabId - 1].getValue();
      if (input.length) {
        const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
        jsonEditors[activeTabId - 1].setValue(json, -1);
        jsonEditors[activeTabId - 1].getSession().foldAll(1);
      }
    });
  }

  // Json compact
  for (const btn of tabPaneNavItemElementsForJsonEditor.compactNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = jsonEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input));
          jsonEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // Json to Csv
  for (const btn of tabPaneNavItemElementsForJsonEditor.transformNavItemElements) {
    btn.addEventListener('click', async () => {
      const activeTabId = getActiveTabId();
      try {
        const json = jsonEditors[activeTabId - 1].getValue();
        if (json.length) {
          const { data: parsedJson, isValidJSON, error } = fn.jsonParser(json);
          if (!isValidJSON) {
            throw error;
          }
          const enrichedJson = Array.isArray(parsedJson) ? parsedJson : [parsedJson];
          const csv = await fastCsv.writeToString(enrichedJson, { headers: true });
          csvEditors[activeTabId - 1].setValue(csv, -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }
};
