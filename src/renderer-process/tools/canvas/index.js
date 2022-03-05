'use strict';

const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const tabsTemplate = require('./templates/tabs-template');
const {
  SANDUK_UI_WORK_AREA_CANVAS_TAB_ID,
  SANDUK_UI_WORK_AREA_CANVAS_TAB_PANE_ID
} = require('../../constants/ui-constants');
const {
  CANVAS_WIDTH_IN_PIXELS,
  CANVAS_HEIGHT_IN_PIXELS
} = require('../../constants/canvas-constants');
const ui = require('./ui');
const activeTabElement = require('../../helpers/active-tab-element');
const tabPaneNavItemComponent = require('../../ui-components/tab-pane-nav-item-component');
const {
  EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS,
  EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS
} = require('../../constants/event-constants');
const fileMenuDropdownNavItemComponent = require('../../ui-components/file-menu-dropdown-nav-item-component');
const popError = require('../../helpers/pop-error');
const {
  IPC_EVENT_OPEN_FILE_DIALOG_CANVAS,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS_FILE_PATH,
  IPC_EVENT_OPEN_FILE_DIALOG_CANVAS_FILE_PATH,
  IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES,
  IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES_USER_OPTION_SELECTION
} = require('../../../main-process/constants/ipc-event-constants');
const tabPaneFilenameComponent = require('../../ui-components/tab-pane-filename-component');

module.exports = function canvasTool({ eventEmitter }) {
  const prefix = 'sanduk-canvas';
  const toolName = 'Canvas';
  const totalTabs = 7;
  const tabsHtml = tabsTemplate({ prefix, totalNumberOfTabs: totalTabs });
  document.getElementById(SANDUK_UI_WORK_AREA_CANVAS_TAB_PANE_ID).innerHTML = ui({
    toolName,
    prefix
  });
  document.getElementById(`${prefix}-Tab`).innerHTML = tabsHtml.tabs;
  document.getElementById(`${prefix}-TabContent`).innerHTML = tabsHtml.tabPanes;

  const canvasSidebarTabElement = document.getElementById(SANDUK_UI_WORK_AREA_CANVAS_TAB_ID);

  const { openFileBtnElement, saveFileBtnElement, closeFileBtnElement } =
    fileMenuDropdownNavItemComponent.getHtmlElement({ prefix });

  const tabPaneNavItemElements = tabPaneNavItemComponent.getHtmlElements({
    prefix,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.EDIT,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.REDO,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.UNDO
    ]
  });

  const fileNameElements = [];
  const filePaths = {};
  const openedFileChanged = {};

  const canvasses = [];
  const canvasContexts = [];
  const brushThicknessElements = [];
  const brushColorElements = [];
  const isDrawing = {};
  const isErasing = {};
  const histories = {};

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    fileNameElements.push(tabPaneFilenameComponent.getHtmlElement({ prefix, id }));
    filePaths[id - 1] = '';
    const canvas = document.getElementById(`${prefix}-canvas-${id}`);
    canvas.height = CANVAS_HEIGHT_IN_PIXELS;
    canvas.width = CANVAS_WIDTH_IN_PIXELS;
    const ctx = canvas.getContext('2d');
    canvasses.push(canvas);
    canvasContexts.push(ctx);
    isDrawing[id - 1] = false;
    isErasing[id - 1] = false;
    histories[id - 1] = { undo: [], redo: [] };

    const brushColor = document.getElementById(`${prefix}-brush-color-${id}`);
    brushColorElements.push(brushColor);

    const brushThicknessElement = document.getElementById(`${prefix}-brush-thickness-${id}`);
    brushThicknessElements.push(brushThicknessElement);
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // history
  const saveState = () => {
    const activeTabId = getActiveTabId();
    const canvas = canvasses[activeTabId - 1];
    histories[activeTabId - 1].undo.push(canvas.toDataURL());
    console.log('save', histories[activeTabId - 1]);
  };
  const undo = () => {
    const activeTabId = getActiveTabId();
    if (histories[activeTabId - 1].undo.length) {
      const lastCanvas = histories[activeTabId - 1].undo.pop();
      histories[activeTabId - 1].redo.push(lastCanvas);
      console.log('undo', histories[activeTabId - 1]);
      const image = new Image();
      image.src = lastCanvas.toString();
      image.onload = () => {
        const ctx = canvasContexts[activeTabId - 1];
        ctx.clearRect(0, 0, CANVAS_HEIGHT_IN_PIXELS, CANVAS_HEIGHT_IN_PIXELS);
        ctx.drawImage(image, 0, 0);
      };
    }
  };
  const redo = () => {
    const activeTabId = getActiveTabId();
    if (histories[activeTabId - 1].redo.length) {
      const lastCanvas = histories[activeTabId - 1].redo.pop();
      histories[activeTabId - 1].undo.push(lastCanvas);
      console.log('redo', histories[activeTabId - 1]);
      const image = new Image();
      image.src = lastCanvas.toString();
      image.onload = () => {
        const ctx = canvasContexts[activeTabId - 1];
        ctx.clearRect(0, 0, CANVAS_WIDTH_IN_PIXELS, CANVAS_HEIGHT_IN_PIXELS);
        ctx.drawImage(image, 0, 0);
      };
    }
  };
  const clearCanvas = () => {
    const activeTabId = getActiveTabId();
    isErasing[activeTabId - 1] = true;

    const canvas = canvasses[activeTabId - 1];
    canvas.classList.remove('sanduk-canvas-tool-draw');
    canvas.classList.add('sanduk-canvas-tool-erase');

    const clearElement = tabPaneNavItemElements.clearNavItemElements[activeTabId - 1];
    clearElement.classList.add('sanduk-canvas-menu-item-highlighted');
    const penElement = tabPaneNavItemElements.editNavItemElements[activeTabId - 1];
    penElement.classList.remove('sanduk-canvas-menu-item-highlighted');
  };
  const penCanvas = () => {
    const activeTabId = getActiveTabId();
    isErasing[activeTabId - 1] = false;

    const canvas = canvasses[activeTabId - 1];
    canvas.classList.add('sanduk-canvas-tool-draw');
    canvas.classList.remove('sanduk-canvas-tool-erase');

    const clearElement = tabPaneNavItemElements.clearNavItemElements[activeTabId - 1];
    clearElement.classList.remove('sanduk-canvas-menu-item-highlighted');
    const penElement = tabPaneNavItemElements.editNavItemElements[activeTabId - 1];
    penElement.classList.add('sanduk-canvas-menu-item-highlighted');
  };
  const closeCanvas = () => {
    const activeTabId = getActiveTabId();
    const ctx = canvasContexts[activeTabId - 1];
    ctx.clearRect(0, 0, CANVAS_WIDTH_IN_PIXELS, CANVAS_HEIGHT_IN_PIXELS);
    histories[activeTabId - 1].undo = [];
    histories[activeTabId - 1].redo = [];
  };
  const loadImage = data => {
    const activeTabId = getActiveTabId();
    const image = new Image();
    image.src = `data:image/png;base64,${data}`;
    image.onload = () => {
      const ctx = canvasContexts[activeTabId - 1];
      ctx.clearRect(0, 0, CANVAS_WIDTH_IN_PIXELS, CANVAS_HEIGHT_IN_PIXELS);
      ctx.drawImage(image, 0, 0);
      saveState();
    };
  };

  // undo click event handler
  for (const btn of tabPaneNavItemElements.undoNavItemElements) {
    btn.addEventListener('click', undo);
  }

  // redo click event handler
  for (const btn of tabPaneNavItemElements.redoNavItemElements) {
    btn.addEventListener('click', redo);
  }

  // clear click event handler
  for (const btn of tabPaneNavItemElements.clearNavItemElements) {
    btn.addEventListener('click', clearCanvas);
  }

  // pen click event handler
  for (const btn of tabPaneNavItemElements.editNavItemElements) {
    btn.addEventListener('click', penCanvas);
  }

  // undo shortcut key event handler
  eventEmitter.on(EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS, () => {
    if (Array.from(canvasSidebarTabElement.classList).includes('active')) {
      undo();
    }
  });

  // redo shortcut key event handler
  eventEmitter.on(EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS, () => {
    if (Array.from(canvasSidebarTabElement.classList).includes('active')) {
      redo();
    }
  });

  // drawing
  const startDrawing = event => {
    const activeTabId = getActiveTabId();
    isDrawing[activeTabId - 1] = true;
    saveState();
    fileChangedListener();
    draw(event);
  };
  const stopDrawing = () => {
    const activeTabId = getActiveTabId();
    isDrawing[activeTabId - 1] = false;
    const ctx = canvasContexts[activeTabId - 1];
    ctx.beginPath();
    saveState();
  };
  const draw = event => {
    const activeTabId = getActiveTabId();
    if (!isDrawing[activeTabId - 1]) {
      return;
    }
    const ctx = canvasContexts[activeTabId - 1];

    if (isErasing[activeTabId - 1]) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColorElements[activeTabId - 1].value;
      ctx.lineWidth = brushThicknessElements[activeTabId - 1].value;
    }

    ctx.lineCap = 'round';
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  };

  // set event handler
  canvasses.forEach(canvas => {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
  });

  // FILE CHANGES
  const fileChangedListener = () => {
    const activeTabId = getActiveTabId();
    if (filePaths[activeTabId - 1]?.length) {
      openedFileChanged[activeTabId - 1] = true;
      fileNameElements[activeTabId - 1].innerText =
        path.basename(filePaths[activeTabId - 1]).substring(0, 20) + '*';
    }
  };

  // CLOSE FILE
  const closeFile = () => {
    const activeTabId = getActiveTabId();
    filePaths[activeTabId - 1] = '';
    fileNameElements[activeTabId - 1].innerText = 'Untitled';
    closeCanvas();
  };
  const closeFileListener = () => {
    const activeTabId = getActiveTabId();
    if (openedFileChanged[activeTabId - 1]) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES);
    } else if (filePaths[activeTabId - 1]?.length) {
      closeFile();
    }
  };
  closeFileBtnElement.addEventListener('click', closeFileListener);
  ipcRenderer.on(
    IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES_USER_OPTION_SELECTION,
    async (e, args) => {
      if (Array.from(canvasSidebarTabElement.classList).includes('active')) {
        if (args.clicked.saveButton) {
          saveFileListener();
          closeFile();
        } else if (args.clicked.ignoreButton) {
          closeFile();
        }
      }
    }
  );

  // OPEN FILE
  const openFileListener = () => ipcRenderer.send(IPC_EVENT_OPEN_FILE_DIALOG_CANVAS);
  openFileBtnElement.addEventListener('click', openFileListener);

  // SAVE FILE
  const saveFileListener = () => {
    const activeTabId = getActiveTabId();
    const filepath = filePaths[activeTabId - 1];
    if (filepath?.length) {
      writeToFile(filepath);
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS);
    }
  };
  saveFileBtnElement.addEventListener('click', saveFileListener);

  const writeToFile = filePath => {
    const activeTabId = getActiveTabId();
    try {
      fileNameElements[activeTabId - 1].innerText = 'Saving...';
      const data = canvasses[activeTabId - 1].toDataURL().replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(data, 'base64');
      fs.writeFileSync(filePath, buffer, 'utf8');
    } catch (e) {
      popError({ message: e.message });
    } finally {
      openedFileChanged[activeTabId - 1] = false;
      fileNameElements[activeTabId - 1].innerText = path.basename(filePath).substring(0, 20);
      filePaths[activeTabId - 1] = filePath;
    }
  };

  ipcRenderer.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS_FILE_PATH, async (e, args) => {
    writeToFile(args.filePath);
  });

  ipcRenderer.on(IPC_EVENT_OPEN_FILE_DIALOG_CANVAS_FILE_PATH, async (e, args) => {
    try {
      const activeTabId = getActiveTabId();
      const openedFilePath = args.filePath;

      const matchingFilepath = Object.entries(filePaths).find(([, v]) => v === openedFilePath);
      if (matchingFilepath) {
        popError({ message: `File already opened. Check Tab ${Number(matchingFilepath[0]) + 1}` });
        return;
      }
      if (filePaths[activeTabId - 1].length) {
        popError({
          message: `File already opened in current Tab ${activeTabId}. Try opening file in another tab.`,
          timeout: 7000
        });
        return;
      }
      filePaths[activeTabId - 1] = openedFilePath;
      fileNameElements[activeTabId - 1].innerText = path.basename(openedFilePath).substring(0, 20);
      const data = fs.readFileSync(args.filePath, 'base64');
      loadImage(data);
    } catch (e) {
      popError({ message: e.message });
    }
  });
};
