'use strict';

const base64 = require('base-64');
const utf8 = require('utf8');
const {
  SANDUK_UI_WORK_AREA_BASE64_ENCODE_DECODE_TAB_PANE_ID
} = require('../../constants/ui-constants');
const tabsTemplate = require('./templates/tabs-template');
const popError = require('../../helpers/pop-error');
const activeTabElement = require('../../helpers/active-tab-element');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const setupEditor = require('../../editor/setup-editor');
const fontSize = require('../../editor/font-size');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');
const { mode: aceMode } = require('../../constants/ace-editor-constants');

const ui = require('./ui');

module.exports = function base64EncoderDecoder() {
  const prefix = 'sanduk-base64-encoder-decoder';
  const prefixForEncoder = 'sanduk-base64-encoder-decoder-encoder';
  const prefixForDecoder = 'sanduk-base64-encoder-decoder-decoder';
  const toolName = 'Base64 Encoder Decoder';
  const totalTabs = 7;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForEncoder,
    prefixForDecoder,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_BASE64_ENCODE_DECODE_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElementsForEncoder = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForEncoder,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.TRANSFORM
    ]
  });
  const tabPaneNavItemElementsForDecoder = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForDecoder,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.TRANSFORM
    ]
  });

  const encoderEditorLineColumnPositionFooterElements = [];
  const encoderEditors = [];
  const encoderEditorElements = [];

  const decoderEditorLineColumnPositionFooterElements = [];
  const decoderEditors = [];
  const decoderEditorElements = [];

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    encoderEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForEncoder, id })
    );
    decoderEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForDecoder, id })
    );

    const encoderEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForEncoder, id })
    );
    setupEditor({
      editor: encoderEditor,
      rowColumnPositionElement: encoderEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    encoderEditors.push(encoderEditor);

    const decoderEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForDecoder, id })
    );
    setupEditor({
      editor: decoderEditor,
      rowColumnPositionElement: decoderEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    decoderEditors.push(decoderEditor);

    encoderEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForEncoder, id }));
    decoderEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForDecoder, id }));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // Encoder - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForEncoder.wrapNavItemElements,
    encoderEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForEncoder.copyNavItemElements,
    encoderEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForEncoder.clearNavItemElements,
    encoderEditors
  );

  // Decoder - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForDecoder.wrapNavItemElements,
    decoderEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForDecoder.copyNavItemElements,
    decoderEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForDecoder.clearNavItemElements,
    decoderEditors
  );

  // Encode buttons
  for (const btn of tabPaneNavItemElementsForEncoder.transformNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = encoderEditors[activeTabId - 1].getValue();
        if (input.length) {
          decoderEditors[activeTabId - 1].setValue(base64.encode(utf8.encode(input)), -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // Decoder buttons
  for (const btn of tabPaneNavItemElementsForDecoder.transformNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        const input = decoderEditors[activeTabId - 1].getValue();
        if (input.length) {
          encoderEditors[activeTabId - 1].setValue(utf8.decode(base64.decode(input)), -1);
        }
      } catch (e) {
        popError({ message: e.message });
      }
    });
  }

  // font size adjustments
  increaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(encoderEditorElements[activeTabId - 1]);
    fontSize.increaseFontSize(decoderEditorElements[activeTabId - 1]);
  });
  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(encoderEditorElements[activeTabId - 1]);
    fontSize.decreaseFontSize(decoderEditorElements[activeTabId - 1]);
  });
  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(encoderEditorElements[activeTabId - 1]);
    fontSize.resetFontSize(decoderEditorElements[activeTabId - 1]);
  });
};
