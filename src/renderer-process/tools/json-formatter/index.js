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
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');

const {
  IPC_EVENT_OPEN_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH
} = require('../../../main-process/constants/ipc-event-constants');

module.exports = function jsonFormatterTool() {
  document.getElementById('v-pills-json-formatter').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const openFileBtn = document.getElementById('json-formatter-file-menu-dropdown-open-btn');
  const saveFileBtn = document.getElementById('json-formatter-file-menu-dropdown-save-btn');
  const closeFileBtn = document.getElementById('json-formatter-file-menu-dropdown-close-btn');
  const increaseFontInputBtn = document.getElementById('increase-font-input-json-formatter-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-input-json-formatter-btn');
  const resetFontInputBtn = document.getElementById('reset-font-input-json-formatter-btn');
  const jsonInputMessage = document.getElementById('json-formatter-input-message');

  const totalTabs = 7;
  document.getElementById('jsonFormatterTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('jsonFormatterTabContent').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  const inputFooters = [];
  const inputEditors = [];
  const inputElems = [];
  const validateInputBtns = document.getElementsByClassName('json-formatter-editor-validate-btn');
  const prettyInputBtns = document.getElementsByClassName('json-formatter-editor-pretty-btn');
  const compactInputBtns = document.getElementsByClassName('json-formatter-editor-compact-btn');
  const foldInputBtns = document.getElementsByClassName('json-formatter-editor-fold-btn');
  const wrapInputBtns = document.getElementsByClassName('json-formatter-editor-wrap-btn');
  const copyInputBtns = document.getElementsByClassName('json-formatter-editor-copy-btn');
  const clearInputBtns = document.getElementsByClassName('json-formatter-editor-clear-btn');
  const fileNameElems = [];
  const filePaths = {};

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(document.getElementById(`json-formatter-input-editor-${id}-footer`));
    fileNameElems.push(document.getElementById(`json-formatter-editor-filename-${id}`));

    let inputEditor = window.ace.edit(`json-formatter-input-editor-${id}`);
    setupEditor({
      editor: inputEditor,
      rowColumnPositionElement: inputFooters[id - 1],
      mode: aceMode.json
    });
    inputEditors.push(inputEditor);

    inputElems.push(document.getElementById(`json-formatter-input-editor-${id}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-json-formatter-tab active', 'tabid');

  const isValidJSON = (json, element) => {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      popError(element, e.message);
    }
    return false;
  };

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapInputBtns, inputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyInputBtns, inputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, clearInputBtns, inputEditors);

  for (const btn of validateInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const input = inputEditors[activeTabId - 1].getValue();
      if (input.length && isValidJSON(input, jsonInputMessage)) {
        popSuccess(jsonInputMessage, 'Valid JSON');
      }
    });
  }

  for (const btn of prettyInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(jsonInputMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input), null, 2);
          inputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(jsonInputMessage, e.message);
      }
    });
  }

  for (const btn of compactInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(jsonInputMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (input.length) {
          const json = JSON.stringify(JSON.parse(input));
          inputEditors[activeTabId - 1].setValue(json, -1);
        }
      } catch (e) {
        popError(jsonInputMessage, e.message);
      }
    });
  }

  for (const btn of foldInputBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      if (inputEditors[activeTabId - 1].getValue().length) {
        inputEditors[activeTabId - 1].getSession().foldAll(1);
      }
    });
  }

  increaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(inputElems[activeTabId - 1]);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(inputElems[activeTabId - 1]);
  });

  resetFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(inputElems[activeTabId - 1]);
  });

  closeFileBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    if (filePaths[activeTabId - 1]?.length) {
      filePaths[activeTabId - 1] = '';
      inputEditors[activeTabId - 1].setValue('');
      fileNameElems[activeTabId - 1].innerText = 'Untitled';
    }
  });

  openFileBtn.addEventListener('click', () => {
    ipcRenderer.send(IPC_EVENT_OPEN_FILE_DIALOG_JSON);
  });

  saveFileBtn.addEventListener('click', () => {
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
      fileNameElems[activeTabId - 1].innerText = 'Saving...';
      const data = inputEditors[activeTabId - 1].getValue();
      fs.writeFileSync(filePath, data, 'utf8');
    } catch (e) {
      popError(jsonInputMessage, e.message);
    } finally {
      fileNameElems[activeTabId - 1].innerText = path.basename(filePath).substr(0, 20);
      fileNameElems[activeTabId - 1].setAttribute('data-filepath', filePath);
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
          jsonInputMessage,
          `File already opened. Check Tab ${Number(matchingFilepath[0]) + 1}`
        );
        return;
      }
      filePaths[activeTabId - 1] = openedFilePath;
      fileNameElems[activeTabId - 1].innerText = path.basename(openedFilePath).substr(0, 20);
      const json = fs.readFileSync(args.filePath).toString();
      inputEditors[activeTabId - 1].getSession().setValue(json, -1);
    } catch (e) {
      popError(jsonInputMessage, e.message);
    }
  });
};
