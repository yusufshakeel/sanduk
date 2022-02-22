'use strict';

const xmlFormatter = require('xml-formatter');
const xmljs = require('xml-js');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const activeTabElement = require('../../helpers/active-tab-element');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const tabsTemplate = require('./templates/tabs-template');
const { SANDUK_UI_WORK_AREA_XML_TO_JSON_TAB_PANE_ID } = require('../../constants/ui-contants');
const ui = require('./ui');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const toolFooterMessageComponent = require('../../ui-components/tool-footer-message-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');

const xmlFormatterOption = {
  indentation: '  '
};

module.exports = function xmlToJson() {
  const prefix = 'sanduk-xml-to-json';
  const prefixForXmlEditor = 'sanduk-xml-to-json-xml';
  const prefixForJsonEditor = 'sanduk-xml-to-json-json';
  const toolName = 'XML to JSON';
  const totalTabs = 7;
  const totalSpaces = 2;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForXmlEditor,
    prefixForJsonEditor,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_XML_TO_JSON_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const footerMessageElement = toolFooterMessageComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElementsForXmlEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForXmlEditor,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.PRETTY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COMPACT,
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

  const xmlEditorLineColumnPositionFooterElements = [];
  const xmlEditors = [];
  const xmlEditorElements = [];

  const jsonEditorLineColumnPositionFooterElements = [];
  const jsonEditors = [];
  const jsonEditorElements = [];

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    xmlEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForXmlEditor, id })
    );
    jsonEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForJsonEditor, id })
    );

    const xmlEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForXmlEditor, id })
    );
    setupEditor({
      editor: xmlEditor,
      rowColumnPositionElement: xmlEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.xml
    });
    xmlEditors.push(xmlEditor);

    const jsonEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForJsonEditor, id })
    );
    setupEditor({
      editor: jsonEditor,
      rowColumnPositionElement: jsonEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.json
    });
    jsonEditors.push(jsonEditor);

    xmlEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForXmlEditor, id }));
    jsonEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForJsonEditor, id }));
  }

  const compactXml = input => {
    return xmlFormatter(input, { indentation: '', lineSeparator: '' });
  };

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // Xml - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForXmlEditor.wrapNavItemElements,
    xmlEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForXmlEditor.copyNavItemElements,
    xmlEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForXmlEditor.clearNavItemElements,
    xmlEditors
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
    fontSize.increaseFontSize(xmlEditorElements[activeTabId - 1]);
    fontSize.increaseFontSize(jsonEditorElements[activeTabId - 1]);
  });
  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(xmlEditorElements[activeTabId - 1]);
    fontSize.decreaseFontSize(jsonEditorElements[activeTabId - 1]);
  });
  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(xmlEditorElements[activeTabId - 1]);
    fontSize.resetFontSize(jsonEditorElements[activeTabId - 1]);
  });

  // Xml to json
  for (const btn of tabPaneNavItemElementsForXmlEditor.transformNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const xml = xmlEditors[activeTabId - 1].getValue();
        if (!xml.length) {
          return;
        }
        const result = xmljs.xml2json(compactXml(xml), { compact: true, spaces: 0 });
        const json = JSON.stringify(JSON.parse(result), null, totalSpaces);
        jsonEditors[activeTabId - 1].setValue(json, -1);
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  // Xml pretty
  for (const btn of tabPaneNavItemElementsForXmlEditor.prettyNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = xmlEditors[activeTabId - 1].getValue();
        if (input.length) {
          xmlEditors[activeTabId - 1].setValue(xmlFormatter(input, xmlFormatterOption), -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  // Xml compact
  for (const btn of tabPaneNavItemElementsForXmlEditor.compactNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = xmlEditors[activeTabId - 1].getValue();
        if (input.length) {
          xmlEditors[activeTabId - 1].setValue(compactXml(input), -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  // Json pretty
  for (const btn of tabPaneNavItemElementsForJsonEditor.prettyNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = jsonEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
          jsonEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
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
        clearContent(footerMessageElement);
        const input = jsonEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input));
          jsonEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  // Json to Xml
  for (const btn of tabPaneNavItemElementsForJsonEditor.transformNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const json = jsonEditors[activeTabId - 1].getValue();
        if (json.length) {
          const xml = xmljs.json2xml(json, {
            compact: true,
            ignoreComment: true,
            spaces: totalSpaces
          });
          xmlEditors[activeTabId - 1].setValue(xml, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }
};
