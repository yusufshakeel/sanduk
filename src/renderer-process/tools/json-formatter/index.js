'use strict';

const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const popError = require('../../helpers/pop-error');
const popSuccess = require('../../helpers/pop-success');
const clearContent = require('../../helpers/clear-content');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const activeTabElement = require('../../helpers/active-tab-element');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const { SANDUK_UI_WORK_AREA_JSON_FORMATTER_TAB_PANE_ID } = require('../../constants/ui-contants');
const tabsTemplate = require('./templates/tabs-template');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const fileMenuDropdownNavItemComponent = require('../../ui-components/file-menu-dropdown-nav-item-component');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const toolFooterMessageComponent = require('../../ui-components/tool-footer-message-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../ui-components/tab-pane-filename-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const editorComponent = require('../../ui-components/editor-component');
const fn = require('../../functions');
const {
  IPC_EVENT_OPEN_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH
} = require('../../../main-process/constants/ipc-event-constants');

const ui = require('./ui');

module.exports = function jsonFormatterTool() {
  const prefix = 'sanduk-json-formatter';
  const toolName = 'JSON Formatter';
  const totalTabs = 7;
  const totalSpaces = 2;
  const tabsHtml = tabsTemplate({ prefix, totalNumberOfTabs: totalTabs });
  document.getElementById(SANDUK_UI_WORK_AREA_JSON_FORMATTER_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const { openFileBtnElement, saveFileBtnElement, closeFileBtnElement } =
    fileMenuDropdownNavItemComponent.getHtmlElement({ prefix });

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const footerMessageElement = toolFooterMessageComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElements = tabPaneNavItemComponent.getHtmlElements({
    prefix,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COMPACT,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.FOLD,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.SORT_ASCENDING,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.SORT_DESCENDING,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.PRETTY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.VALIDATE,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP
    ]
  });

  const editorLineColumnPositionFooterElements = [];
  const editors = [];
  const editorElements = [];

  const fileNameElements = [];
  const filePaths = {};

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    editorLineColumnPositionFooterElements.push(
      editorFooterLineColumnPositionComponent.getHtmlElement({ prefix, id })
    );
    fileNameElements.push(tabPaneFilenameComponent.getHtmlElement({ prefix, id }));

    const editor = window.ace.edit(editorComponent.getHtmlElementId({ prefix, id }));
    setupEditor({
      editor: editor,
      rowColumnPositionElement: editorLineColumnPositionFooterElements[id - 1],
      mode: aceMode.json
    });
    editors.push(editor);

    editorElements.push(editorComponent.getHtmlElement({ prefix, id }));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  wrapBtnHandler.initWrapBtnHandler(
    getActiveTabId,
    tabPaneNavItemElements.wrapNavItemElements,
    editors
  );
  copyBtnHandler.initCopyBtnHandler(
    getActiveTabId,
    tabPaneNavItemElements.copyNavItemElements,
    editors
  );
  clearBtnHandler.initClearBtnHandler(
    getActiveTabId,
    tabPaneNavItemElements.clearNavItemElements,
    editors
  );

  for (const btn of tabPaneNavItemElements.validateNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      clearContent(footerMessageElement);
      const input = editors[activeTabId - 1].getValue();
      if (input.length) {
        fn.jsonParser(input).isValidJSON
          ? popSuccess(footerMessageElement, 'Valid JSON')
          : popError(footerMessageElement, 'Invalid JSON');
      }
    });
  }

  for (const btn of tabPaneNavItemElements.prettyNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = editors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
          editors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  for (const btn of tabPaneNavItemElements.compactNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = editors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input));
          editors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  for (const btn of tabPaneNavItemElements.foldNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = editors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, totalSpaces);
          editors[activeTabId - 1].setValue(json, -1);
          editors[activeTabId - 1].getSession().foldAll(1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  for (const btn of tabPaneNavItemElements.sortAscendingNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = editors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(
            fn.sortObject({ data: JSON.parse(input) }),
            null,
            totalSpaces
          );
          editors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  for (const btn of tabPaneNavItemElements.sortDescendingNavItemElements) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(footerMessageElement);
        const input = editors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(
            fn.sortObject({ data: JSON.parse(input), descendingSort: true }),
            null,
            totalSpaces
          );
          editors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(footerMessageElement, e.message);
      }
    });
  }

  increaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(editorElements[activeTabId - 1]);
  });

  decreaseFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(editorElements[activeTabId - 1]);
  });

  resetFontSizeBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(editorElements[activeTabId - 1]);
  });

  closeFileBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (filePaths[activeTabId - 1]?.length) {
      filePaths[activeTabId - 1] = '';
      editors[activeTabId - 1].setValue('');
      fileNameElements[activeTabId - 1].innerText = 'Untitled';
    }
  });

  openFileBtnElement.addEventListener('click', () => {
    ipcRenderer.send(IPC_EVENT_OPEN_FILE_DIALOG_JSON);
  });

  saveFileBtnElement.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    const filepath = filePaths[activeTabId - 1];
    if (filepath?.length) {
      writeToFile(filepath);
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON);
    }
  });

  const writeToFile = filePath => {
    const activeTabId = getActiveTabId();
    try {
      fileNameElements[activeTabId - 1].innerText = 'Saving...';
      const data = editors[activeTabId - 1].getValue();
      fs.writeFileSync(filePath, data, 'utf8');
    } catch (e) {
      popError(footerMessageElement, e.message);
    } finally {
      const filename = path.basename(filePath).substring(0, 20);
      fileNameElements[activeTabId - 1].innerText = filename;
      filePaths[activeTabId - 1] = filename;
    }
  };

  ipcRenderer.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, async (e, args) => {
    writeToFile(args.filePath);
  });

  ipcRenderer.on(IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH, async (e, args) => {
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
      if (editors[activeTabId - 1].getValue().length) {
        popError(
          footerMessageElement,
          `File already opened in current Tab ${activeTabId}. Try opening file in another tab.`,
          7000
        );
        return;
      }
      filePaths[activeTabId - 1] = openedFilePath;
      fileNameElements[activeTabId - 1].innerText = path.basename(openedFilePath).substring(0, 20);
      const json = fs.readFileSync(args.filePath).toString();
      editors[activeTabId - 1].getSession().setValue(json, -1);
    } catch (e) {
      popError(footerMessageElement, e.message);
    }
  });
};
