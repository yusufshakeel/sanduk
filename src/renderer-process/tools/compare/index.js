'use strict';

const { diffLines } = require('../../functions/diff-lines');
const {
  SANDUK_UI_WORK_AREA_COMPARE_TAB_PANE_ID
  // SANDUK_UI_WORK_AREA_COMPARE_TAB_ID
} = require('../../constants/ui-constants');
const tabsTemplate = require('./templates/tabs-template');
const ui = require('./ui');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');
const setupEditor = require('../../editor/setup-editor');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const fontSize = require('../../editor/font-size');
const activeTabElement = require('../../helpers/active-tab-element');
const toolNavbarNavItemComponent = require('../../ui-components/tool-navbar-nav-item-component');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');

module.exports = function compareTool() {
  const prefix = 'sanduk-compare';
  const prefixForSourceEditor = 'sanduk-compare-source';
  const prefixForDestinationEditor = 'sanduk-compare-destination';
  // const contextMenuEventHandlerIdForSourceEditor = `${prefixForSourceEditor}-context-menu-event-handler`;
  // const contextMenuEventHandlerIdForDestinationEditor = `${prefixForDestinationEditor}-context-menu-event-handler`;
  const toolName = 'Compare';
  const totalTabs = 7;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForSourceEditor,
    prefixForDestinationEditor,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_COMPARE_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  // const compareSidebarTabElement = document.getElementById(SANDUK_UI_WORK_AREA_COMPARE_TAB_ID);

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElementsForSourceEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForSourceEditor,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP
    ]
  });
  const tabPaneNavItemElementsForDestinationEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForDestinationEditor,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP
    ]
  });

  const sourceEditorLineColumnPositionFooterElements = [];
  const sourceEditors = [];
  const sourceEditorElements = [];

  const destinationEditorLineColumnPositionFooterElements = [];
  const destinationEditors = [];
  const destinationEditorElements = [];

  const sourcePreElements = [];
  const destinationPreElements = [];

  const { transformNavbarNavItemElements: transformBtn } =
    toolNavbarNavItemComponent.getHtmlElements({
      prefix,
      specificNavItemsToPick: [toolNavbarNavItemComponent.NAVBAR_NAV_ITEMS.TRANSFORM]
    });

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    sourceEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForSourceEditor, id })
    );
    destinationEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({
        prefix: prefixForDestinationEditor,
        id
      })
    );

    const sourceEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForSourceEditor, id })
    );
    setupEditor({
      editor: sourceEditor,
      rowColumnPositionElement: sourceEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    sourceEditors.push(sourceEditor);

    const destinationEditor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForDestinationEditor, id })
    );
    setupEditor({
      editor: destinationEditor,
      rowColumnPositionElement: destinationEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    destinationEditors.push(destinationEditor);

    sourceEditorElements.push(
      editorComponent.getHtmlElement({ prefix: prefixForSourceEditor, id })
    );
    destinationEditorElements.push(
      editorComponent.getHtmlElement({ prefix: prefixForDestinationEditor, id })
    );

    sourcePreElements.push(document.getElementById(`${prefix}-pre-source-${id}`));
    destinationPreElements.push(document.getElementById(`${prefix}-pre-destination-${id}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // font size adjustments
  increaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(sourceEditorElements[activeTabId - 1]);
    fontSize.increaseFontSize(destinationEditorElements[activeTabId - 1]);
  });
  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(sourceEditorElements[activeTabId - 1]);
    fontSize.decreaseFontSize(destinationEditorElements[activeTabId - 1]);
  });
  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(sourceEditorElements[activeTabId - 1]);
    fontSize.resetFontSize(destinationEditorElements[activeTabId - 1]);
  });

  // Source - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForSourceEditor.wrapNavItemElements,
    sourceEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForSourceEditor.copyNavItemElements,
    sourceEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForSourceEditor.clearNavItemElements,
    sourceEditors
  );

  // Destination - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForDestinationEditor.wrapNavItemElements,
    destinationEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForDestinationEditor.copyNavItemElements,
    destinationEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForDestinationEditor.clearNavItemElements,
    destinationEditors
  );

  transformBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();

    const source = sourceEditors[activeTabId - 1].getValue();
    const destination = destinationEditors[activeTabId - 1].getValue();

    const { formattedSourceLines, formattedDestinationLines } = diffLines({ source, destination });

    const style =
      '<style>.sanduk-diff-del-op { background-color: #ffc6bf; } .sanduk-diff-ins-op { background-color: #bafbba; }</style>';

    sourcePreElements[activeTabId - 1].innerHTML = `${style}${formattedSourceLines.join('\n')}`;
    destinationPreElements[activeTabId - 1].innerHTML = `${style}${formattedDestinationLines.join(
      '\n'
    )}`;
  });
};
