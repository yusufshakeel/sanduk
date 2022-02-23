'use strict';

const fs = require('fs');
const path = require('path');
const immutabilityHelper = require('immutability-helper');
const markdown = require('markdown-it')();
const sanitizeHtml = require('sanitize-html');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const tabsTemplate = require('./templates/tabs-template');
const { SANDUK_UI_WORK_AREA_MARKDOWN_TAB_PANE_ID } = require('../../constants/ui-contants');
const ui = require('./ui');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const toolNavbarNavItemComponent = require('../../ui-components/tool-navbar-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');
const iframeComponent = require('../../ui-components/iframe-component');
const activeTabElement = require('../../helpers/active-tab-element');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const gitHubMarkdownCss = require('./github-markdown-style')();
const { ipcRenderer } = require('electron');
const {
  IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH,
  IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH
} = require('../../../main-process/constants/ipc-event-constants');
const popError = require('../../helpers/pop-error');
const fileMenuDropdownNavItemComponent = require('../../ui-components/file-menu-dropdown-nav-item-component');
const toolFooterMessageComponent = require('../../ui-components/tool-footer-message-component');
const tabPaneFilenameComponent = require('../../ui-components/tab-pane-filename-component');

module.exports = function markdownTool() {
  const prefix = 'sanduk-markdown';
  const prefixForMarkdown = 'sanduk-markdown-input';
  const prefixForPreview = 'sanduk-markdown-preview';
  const toolName = 'Markdown';
  const totalTabs = 7;
  const tabsHtml = tabsTemplate({
    prefix,
    prefixForMarkdown,
    prefixForPreview,
    totalNumberOfTabs: totalTabs
  });
  document.getElementById(SANDUK_UI_WORK_AREA_MARKDOWN_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const footerMessageElement = toolFooterMessageComponent.getHtmlElement({ prefix });

  const { openFileBtnElement, saveFileBtnElement, closeFileBtnElement } =
    fileMenuDropdownNavItemComponent.getHtmlElement({ prefix });

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const {
    editNavbarNavItemElements: editorOnlyButton,
    previewNavbarNavItemElements: previewOnlyButton,
    splitViewNavbarNavItemElements: editorAndPreviewButton
  } = toolNavbarNavItemComponent.getHtmlElements({
    prefix,
    specificNavItemsToPick: [
      toolNavbarNavItemComponent.NAVBAR_NAV_ITEMS.EDIT,
      toolNavbarNavItemComponent.NAVBAR_NAV_ITEMS.PREVIEW,
      toolNavbarNavItemComponent.NAVBAR_NAV_ITEMS.SPLIT_VIEW
    ]
  });

  const tabPaneNavItemElementsForMarkdown = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForMarkdown,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP
    ]
  });

  const tabPaneNavItemElementsForEditor = tabPaneNavItemComponent.getHtmlElements({
    prefix: prefixForPreview,
    specificNavItemsToPick: [tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLOSE]
  });

  const fileNameElements = [];
  const filePaths = {};

  const markdownEditorLineColumnPositionFooterElements = [];
  const markdownEditors = [];
  const markdownEditorElements = [];

  const previewIframeElements = [];

  const markdownColumnElements = [];
  const previewColumnElements = [];

  // Initialising the editors and iframes
  for (let id = 1; id <= totalTabs; id++) {
    markdownEditorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix: prefixForMarkdown, id })
    );
    fileNameElements.push(
      tabPaneFilenameComponent.getHtmlElement({ prefix: prefixForMarkdown, id })
    );

    const editor = window.ace.edit(
      editorComponent.getHtmlElementId({ prefix: prefixForMarkdown, id })
    );
    setupEditor({
      editor: editor,
      rowColumnPositionElement: markdownEditorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.text
    });
    markdownEditors.push(editor);

    editor.commands.on('afterExec', () => renderMarkdown());

    markdownEditorElements.push(editorComponent.getHtmlElement({ prefix: prefixForMarkdown, id }));
    previewIframeElements.push(iframeComponent.getHtmlElement({ prefix: prefixForPreview, id }));

    markdownColumnElements.push(document.getElementById(`${prefix}-tab-${id}-markdown-column`));
    previewColumnElements.push(document.getElementById(`${prefix}-tab-${id}-preview-column`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // Encoder - Wrap, Copy, Clear
  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForMarkdown.wrapNavItemElements,
    markdownEditors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForMarkdown.copyNavItemElements,
    markdownEditors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElementsForMarkdown.clearNavItemElements,
    markdownEditors
  );

  // font size adjustments
  increaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(markdownEditorElements[activeTabId - 1]);
  });
  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(markdownEditorElements[activeTabId - 1]);
  });
  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(markdownEditorElements[activeTabId - 1]);
  });

  const renderMarkdown = () => {
    const activeTabId = getActiveTabId();
    const markdownData = markdownEditors[activeTabId - 1].getValue();
    const html = markdown.render(markdownData);
    const sanitizedHtml = sanitizeHtml(html, {
      transformTags: {
        a: function (tagName, attribs) {
          const modifiedAttributes = immutabilityHelper(attribs, {
            href: { $set: '#' }
          });
          return {
            tagName: tagName,
            attribs: modifiedAttributes
          };
        }
      }
    });
    const enrichedHtml = `<style>${gitHubMarkdownCss}</style><article class="markdown-body">${sanitizedHtml}</article>`;
    previewIframeElements[activeTabId - 1].contentDocument.write(enrichedHtml);
    previewIframeElements[activeTabId - 1].contentDocument.close();
  };

  const showOnlyEditor = () => {
    const activeTabId = getActiveTabId();
    markdownColumnElements[activeTabId - 1].className =
      markdownColumnElements[activeTabId - 1].getAttribute('data-viewEditorOnly');
    previewColumnElements[activeTabId - 1].className =
      previewColumnElements[activeTabId - 1].getAttribute('data-viewEditorOnly');
  };

  editorOnlyButton.addEventListener('click', () => showOnlyEditor());

  editorAndPreviewButton.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    markdownColumnElements[activeTabId - 1].className = markdownColumnElements[
      activeTabId - 1
    ].getAttribute('data-viewEditorAndPreview');
    previewColumnElements[activeTabId - 1].className = previewColumnElements[
      activeTabId - 1
    ].getAttribute('data-viewEditorAndPreview');
  });

  previewOnlyButton.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    markdownColumnElements[activeTabId - 1].className =
      markdownColumnElements[activeTabId - 1].getAttribute('data-viewPreviewOnly');
    previewColumnElements[activeTabId - 1].className =
      previewColumnElements[activeTabId - 1].getAttribute('data-viewPreviewOnly');
  });

  for (const btn of tabPaneNavItemElementsForEditor.closeNavItemElements) {
    btn.addEventListener('click', () => showOnlyEditor());
  }

  closeFileBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (filePaths[activeTabId - 1]?.length) {
      filePaths[activeTabId - 1] = '';
      markdownEditors[activeTabId - 1].setValue('');
      fileNameElements[activeTabId - 1].innerText = 'Untitled';
    }
  });

  openFileBtnElement.addEventListener('click', () => {
    ipcRenderer.send(IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN);
  });

  saveFileBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    const filepath = filePaths[activeTabId - 1];
    if (filepath?.length) {
      writeToFile(filepath);
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN);
    }
  });

  const writeToFile = filePath => {
    const activeTabId = getActiveTabId();
    try {
      fileNameElements[activeTabId - 1].innerText = 'Saving...';
      const data = markdownEditors[activeTabId - 1].getValue();
      fs.writeFileSync(filePath, data, 'utf8');
    } catch (e) {
      popError(footerMessageElement, e.message);
    } finally {
      fileNameElements[activeTabId - 1].innerText = path.basename(filePath).substring(0, 20);
      filePaths[activeTabId - 1] = filePath;
    }
  };

  ipcRenderer.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH, async (e, args) => {
    writeToFile(args.filePath);
  });

  ipcRenderer.on(IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH, async (e, args) => {
    try {
      const activeTabId = getActiveTabId();
      const openedFilePath = args.filePath;

      const matchingFilepath = Object.entries(filePaths).find(([, v]) => v === openedFilePath);
      if (matchingFilepath) {
        popError(
          footerMessageElement,
          `File already opened. Check Tab ${Number(matchingFilepath[0]) + 1}`
        );
        return;
      }
      if (markdownEditors[activeTabId - 1].getValue().length) {
        popError(
          footerMessageElement,
          `File already opened in current Tab ${activeTabId}. Try opening file in another tab.`,
          7000
        );
        return;
      }
      filePaths[activeTabId - 1] = openedFilePath;
      fileNameElements[activeTabId - 1].innerText = path.basename(openedFilePath).substring(0, 20);
      const data = fs.readFileSync(openedFilePath).toString();
      markdownEditors[activeTabId - 1].getSession().setValue(data, -1);
      renderMarkdown();
    } catch (e) {
      popError(footerMessageElement, e.message);
    }
  });
};
