'use strict';

const fs = require('fs');
const path = require('path');
const DMP = require('diff-match-patch');
const Diff2html = require('diff2html');
const {
  SANDUK_UI_WORK_AREA_COMPARE_TAB_PANE_ID,
  SANDUK_UI_WORK_AREA_COMPARE_TAB_ID
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
const iframeComponent = require('../../ui-components/iframe-component');

module.exports = function compareTool() {
  const prefix = 'sanduk-compare';
  const prefixForSourceEditor = 'sanduk-compare-source';
  const prefixForDestinationEditor = 'sanduk-compare-destination';
  const prefixForPreview = 'sanduk-compare-preview';
  const contextMenuEventHandlerIdForSourceEditor = `${prefixForSourceEditor}-context-menu-event-handler`;
  const contextMenuEventHandlerIdForDestinationEditor = `${prefixForDestinationEditor}-context-menu-event-handler`;
  const toolName = 'Compare';
  const totalTabs = 7;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForSourceEditor,
    prefixForDestinationEditor,
    prefixForPreview,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_COMPARE_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const compareSidebarTabElement = document.getElementById(SANDUK_UI_WORK_AREA_COMPARE_TAB_ID);

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

  const previewIframeElements = [];

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

    previewIframeElements.push(iframeComponent.getHtmlElement({ prefix: prefixForPreview, id }));
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

  const dmp = new DMP();

  const source = `Hello World`;
  const destination = `Hello
  World`;

  // const diff2htmlCss = fs.readFileSync(path.resolve(__dirname, 'diff2html-css.txt'), 'utf8');
  // const diff2htmlJs = fs.readFileSync(path.resolve(__dirname, 'diff2html-js.txt'), 'utf8');

  //   const diffJson = Diff2html.parse(`diff --git a/sample.js b/sample.js
  // index 0000001..0ddf2ba
  // --- a/Source
  // +++ b/Source
  // @@ -1 +1 @@
  // -console.log("Hello World!")
  // +console.log("Hello from Diff2Html!")`);

  // const diffInput = dmp.patch_toText(dmp.patch_make(source, destination));
  // console.log(diffInput);
  // const diffJson = Diff2html.parse(`diff --git a/Source b/Source
  // index 0000001..0ddf2ba
  // --- a/Source
  // +++ b/Source
  // ${diffInput}`);
  //
  // const diffHtml = Diff2html.html(diffJson, {
  //   drawFileList: false,
  //   fileListToggle: false,
  //   fileListStartVisible: false,
  //   fileContentToggle: false,
  //   matching: 'none', // 'lines',
  //   outputFormat: 'side-by-side',
  //   synchronisedScroll: true,
  //   highlight: true,
  //   renderNothingWhenEmpty: false
  // });

  // const enrichedHtml = `<style>${diff2htmlCss}</style><script>${diff2htmlJs}</script>${diffHtml}`;

  const enrichedHtml = dmp.diff_prettyHtml(dmp.diff_main(source, destination));

  const activeTabId = getActiveTabId();
  previewIframeElements[activeTabId - 1].contentDocument.write(enrichedHtml);
  previewIframeElements[activeTabId - 1].contentDocument.close();
};
