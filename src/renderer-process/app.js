'use strict';

const EventEmitter2 = require('eventemitter2');
const eventEmitter = new EventEmitter2({
  maxListeners: 0 // Set to zero for unlimited.
});

const {
  EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS,
  EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS
} = require('../renderer-process/constants/event-constants');

const tools = require('../renderer-process/tools');
const contextMenu = require('../renderer-process/context-menu');

window.onload = () => {
  contextMenu({ eventEmitter, documentDOM: document });
  tools({ eventEmitter });

  // emit event
  document.addEventListener('keydown', event => {
    if (
      (event.ctrlKey && event.key === 'y') ||
      (event.shiftKey && event.metaKey && event.key === 'z')
    ) {
      // Ctrl+Y or Cmd+Shift+Z - REDO
      eventEmitter.emit(EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS, { eventData: event });
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
      // Ctrl+Z or Cmd+Z - UNDO
      eventEmitter.emit(EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS, { eventData: event });
    }
  });
};
