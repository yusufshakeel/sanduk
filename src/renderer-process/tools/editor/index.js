'use strict';

const fs = require('fs');
const path = require('path');
const activeTabElement = require('../../helpers/active-tab-element');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const fontSize = require('../../editor/font-size');
const setupEditor = require('../../editor/setup-editor');
const tabsTemplate = require('./templates/tabs-template');
const { SANDUK_UI_WORK_AREA_EDITOR_TAB_PANE_ID } = require('../../constants/ui-constants');
const ui = require('./ui');
const fileMenuDropdownNavItemComponent = require('../../ui-components/file-menu-dropdown-nav-item-component');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const editorFooterLineColumnPositionComponent = require('../../ui-components/editor-footer-line-column-position-component');
const tabPaneFilenameComponent = require('../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../ui-components/editor-component');
const { mode: aceMode } = require('../../constants/ace-editor-constants');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const { ipcRenderer } = require('electron');
const {
  IPC_EVENT_OPEN_FILE_DIALOG_EDITOR,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH,
  IPC_EVENT_OPEN_FILE_DIALOG_EDITOR_FILE_PATH
} = require('../../../main-process/constants/ipc-event-constants');
const popError = require('../../helpers/pop-error');

module.exports = function editorTool() {
  const prefix = 'sanduk-editor';
  const toolName = 'Editor';
  const totalTabs = 7;
  const tabsHtml = tabsTemplate({ prefix, totalNumberOfTabs: totalTabs });
  document.getElementById(SANDUK_UI_WORK_AREA_EDITOR_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const { openFileBtnElement, saveFileBtnElement, closeFileBtnElement } =
    fileMenuDropdownNavItemComponent.getHtmlElement({ prefix });

  const { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement } =
    fontSizeAdjustmentNavItemComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElements = tabPaneNavItemComponent.getHtmlElements({
    prefix,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.COPY,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.WRAP
    ]
  });

  const editorLineColumnPositionFooterElements = [];
  const editors = [];
  const editorElements = [];

  const fileNameElements = [];
  const filePaths = {};
  const openedFileChanged = {};

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
      mode: aceMode.text
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

  // CLOSE FILE
  const closeFileListener = () => {
    const activeTabId = getActiveTabId();
    if (openedFileChanged[activeTabId - 1]) {
      popError({ message: 'File has unsaved changes!' });
    } else if (filePaths[activeTabId - 1]?.length) {
      filePaths[activeTabId - 1] = '';
      editors[activeTabId - 1].setValue('');
      fileNameElements[activeTabId - 1].innerText = 'Untitled';
    }
  };
  closeFileBtnElement.addEventListener('click', closeFileListener);

  // OPEN FILE
  const openFileListener = () => ipcRenderer.send(IPC_EVENT_OPEN_FILE_DIALOG_EDITOR);
  openFileBtnElement.addEventListener('click', openFileListener);

  // SAVE FILE
  const saveFileListener = () => {
    const activeTabId = getActiveTabId();
    const filepath = filePaths[activeTabId - 1];
    if (filepath?.length) {
      writeToFile(filepath);
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR);
    }
  };
  saveFileBtnElement.addEventListener('click', saveFileListener);

  // FILE CHANGES
  const fileChangedListener = event => {
    const activeTabId = getActiveTabId();
    if (filePaths[activeTabId - 1]?.length && event.command.name === 'insertstring') {
      openedFileChanged[activeTabId - 1] = true;
      fileNameElements[activeTabId - 1].innerText =
        path.basename(filePaths[activeTabId - 1]).substring(0, 20) + '*';
    }
  };

  // setting shortcut
  editors.forEach(editor => {
    editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: () => saveFileListener()
    });

    editor.commands.addCommand({
      name: 'open',
      bindKey: { win: 'Ctrl-O', mac: 'Cmd-O' },
      exec: () => openFileListener()
    });

    editor.commands.addCommand({
      name: 'close',
      bindKey: { win: 'Ctrl-F4', mac: 'Cmd-W' },
      exec: () => closeFileListener()
    });

    editor.commands.on('afterExec', fileChangedListener);
  });

  const writeToFile = filePath => {
    const activeTabId = getActiveTabId();
    try {
      fileNameElements[activeTabId - 1].innerText = 'Saving...';
      const data = editors[activeTabId - 1].getValue();
      fs.writeFileSync(filePath, data, 'utf8');
    } catch (e) {
      popError({ message: e.message });
    } finally {
      openedFileChanged[activeTabId - 1] = false;
      fileNameElements[activeTabId - 1].innerText = path.basename(filePath).substring(0, 20);
      filePaths[activeTabId - 1] = filePath;
    }
  };

  ipcRenderer.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH, async (e, args) => {
    writeToFile(args.filePath);
  });

  ipcRenderer.on(IPC_EVENT_OPEN_FILE_DIALOG_EDITOR_FILE_PATH, async (e, args) => {
    try {
      const activeTabId = getActiveTabId();
      const openedFilePath = args.filePath;

      const matchingFilepath = Object.entries(filePaths).find(([, v]) => v === openedFilePath);
      if (matchingFilepath) {
        popError({ message: `File already opened. Check Tab ${Number(matchingFilepath[0]) + 1}` });
        return;
      }
      if (editors[activeTabId - 1].getValue().length) {
        popError(
          {
            message: `File already opened in current Tab ${activeTabId}. Try opening file in another tab.`
          },
          7000
        );
        return;
      }
      filePaths[activeTabId - 1] = openedFilePath;
      fileNameElements[activeTabId - 1].innerText = path.basename(openedFilePath).substring(0, 20);
      const data = fs.readFileSync(args.filePath).toString();
      editors[activeTabId - 1].getSession().setValue(data, -1);
    } catch (e) {
      popError({ message: e.message });
    }
  });
};
