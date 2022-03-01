'use strict';

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

  const tabPaneNavItemElements = tabPaneNavItemComponent.getHtmlElements({
    prefix,
    specificNavItemsToPick: [
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.CLEAR,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.REDO,
      tabPaneNavItemComponent.TAB_PANE_NAV_ITEMS.UNDO
    ]
  });

  const canvasses = [];
  const canvasContexts = [];
  const isDrawing = {};
  const histories = {};

  // Initialising the editors
  for (let id = 1; id <= totalTabs; id++) {
    const canvas = document.getElementById(`${prefix}-canvas-${id}`);
    canvas.height = CANVAS_HEIGHT_IN_PIXELS;
    canvas.width = CANVAS_WIDTH_IN_PIXELS;
    const ctx = canvas.getContext('2d');
    canvasses.push(canvas);
    canvasContexts.push(ctx);
    isDrawing[id - 1] = false;
    histories[id - 1] = { undo: [], redo: [] };
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName(`${prefix}-tab active`, 'tabid');

  // history
  const saveState = () => {
    const activeTabId = getActiveTabId();
    const canvas = canvasses[activeTabId - 1];
    histories[activeTabId - 1].undo.push(canvas.toDataURL());
  };
  const undo = () => {
    const activeTabId = getActiveTabId();
    if (histories[activeTabId - 1].undo.length) {
      const lastCanvas = histories[activeTabId - 1].undo.pop();
      histories[activeTabId - 1].redo.push(lastCanvas);
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
      const image = new Image();
      image.src = lastCanvas.toString();
      image.onload = () => {
        const ctx = canvasContexts[activeTabId - 1];
        ctx.clearRect(0, 0, CANVAS_HEIGHT_IN_PIXELS, CANVAS_HEIGHT_IN_PIXELS);
        ctx.drawImage(image, 0, 0);
      };
    }
  };
  const clearCanvas = () => {
    const activeTabId = getActiveTabId();
    if (histories[activeTabId - 1].undo.length) {
      const ctx = canvasContexts[activeTabId - 1];
      ctx.clearRect(0, 0, CANVAS_HEIGHT_IN_PIXELS, CANVAS_HEIGHT_IN_PIXELS);
      saveState();
    }
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
    ctx.lineWidth = 2;
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
};
