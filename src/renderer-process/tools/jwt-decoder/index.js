'use strict';

const jwtDecode = require('jwt-decode');
const popError = require('../../helpers/pop-error');
const setupEditor = require('../../editor/setup-editor');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const ui = require('./ui');
const tabsTemplate = require('./templates/tabs-template');
const { SANDUK_UI_WORK_AREA_JWT_DECODER_TAB_PANE_ID } = require('../../constants/ui-constants');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');
const activeTabElement = require('../../helpers/active-tab-element');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const fontSize = require('../../editor/font-size');

module.exports = function jwtDecoder() {
  const prefix = 'sanduk-jwt-decoder';
  const prefixForInput = 'sanduk-jwt-decoder-input';
  const prefixForOutput = 'sanduk-jwt-decoder-output';
  const toolName = 'JSON Web Token';
  const totalTabs = 7;
  const totalSpaces = 2;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForInput,
    prefixForOutput,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_JWT_DECODER_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElementsForInputEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForInput,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.TRANSFORM
    ]
  });
  const tabPaneNavItemElementsForOutputEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForOutput,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.PRETTY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COMPACT,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.FOLD,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP
    ]
  });

  const inputEditorLineColumnPositionFooterElements = [];
  const inputEditors = [];
  const inputEditorElements = [];

  const outputEditorLineColumnPositionFooterElements = [];
  const outputEditors = [];
  const outputEditorElements = [];

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    inputEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForInput, id })
    );
    outputEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForOutput, id })
    );

    const inputEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForInput, id })
    );
    setupEditor({
      editor: inputEditor,
      rowColumnPositionElement: inputEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    inputEditors.push(inputEditor);

    const outputEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForOutput, id })
    );
    setupEditor({
      editor: outputEditor,
      rowColumnPositionElement: outputEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.json
    });
    outputEditors.push(outputEditor);

    inputEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForInput, id }));
    outputEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForOutput, id }));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // Input - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForInputEditor.wrapNavItemElements,
    inputEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForInputEditor.copyNavItemElements,
    inputEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForInputEditor.clearNavItemElements,
    inputEditors
  );

  // Output - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForOutputEditor.wrapNavItemElements,
    outputEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForOutputEditor.copyNavItemElements,
    outputEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForOutputEditor.clearNavItemElements,
    outputEditors
  );

  // Decoder buttons
  for (const btn of tabPaneNavItemElementsForInputEditor.transformNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = inputEditors[activeTabId - 1].getValue().trim();
        if (input.length) {
          const decodedHeader = jwtDecode(input, { header: true });
          const decodedJWT = jwtDecode(input);
          const result = { header: decodedHeader, payload: decodedJWT };
          outputEditors[activeTabId - 1].setValue(JSON.stringify(result, null, totalSpaces), -1);
        }
      } catch (e) {
        popError({ message: 'Invalid JWT' });
      }
    });
  }

  // Pretty JSON output
  for (const btn of tabPaneNavItemElementsForOutputEditor.prettyNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = outputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
          outputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // Compact JSON output
  for (const btn of tabPaneNavItemElementsForOutputEditor.compactNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = outputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input));
          outputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // Fold JSON output
  for (const btn of tabPaneNavItemElementsForOutputEditor.foldNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = outputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
          outputEditors[activeTabId - 1].setValue(json, -1);
          outputEditors[activeTabId - 1].getSession().foldAll(1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // font size adjustments
  increaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(inputEditorElements[activeTabId - 1]);
    fontSize.increaseFontSize(outputEditorElements[activeTabId - 1]);
  });
  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(inputEditorElements[activeTabId - 1]);
    fontSize.decreaseFontSize(outputEditorElements[activeTabId - 1]);
  });
  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(inputEditorElements[activeTabId - 1]);
    fontSize.resetFontSize(outputEditorElements[activeTabId - 1]);
  });
};
