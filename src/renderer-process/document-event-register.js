'use strict';

const {
  EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS,
  EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS,
  EVENT_TYPE_SAVE_CTRL_S_OR_CMD_S_KEYPRESS,
  EVENT_TYPE_OPEN_CTRL_O_OR_CMD_O_KEYPRESS,
  EVENT_TYPE_CLOSE_CTRL_W_OR_CMD_W_KEYPRESS
} = require('./constants/event-constants');

/**
 * @param {object} eventEmitter This is eventEmitter2 instance
 * @param {document} documentDOM
 */
module.exports = function documentEventRegister({ eventEmitter, documentDOM = document }) {
  const redoEventEmitter = event => {
    eventEmitter.emit(EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS, { eventData: event });
  };
  const undoEventEmitter = event => {
    eventEmitter.emit(EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS, { eventData: event });
  };
  const saveEventEmitter = event => {
    eventEmitter.emit(EVENT_TYPE_SAVE_CTRL_S_OR_CMD_S_KEYPRESS, { eventData: event });
  };
  const openEventEmitter = event => {
    eventEmitter.emit(EVENT_TYPE_OPEN_CTRL_O_OR_CMD_O_KEYPRESS, { eventData: event });
  };
  const closeEventEmitter = event => {
    eventEmitter.emit(EVENT_TYPE_CLOSE_CTRL_W_OR_CMD_W_KEYPRESS, { eventData: event });
  };

  documentDOM.addEventListener('keydown', event => {
    const rules = [
      {
        // Ctrl+Y or Cmd+Shift+Z - REDO
        condition: event =>
          (event.ctrlKey && event.key === 'y') ||
          (event.shiftKey && event.metaKey && event.key === 'z'),
        handler: event => redoEventEmitter(event)
      },
      {
        // Ctrl+Z or Cmd+Z - UNDO
        condition: event => (event.metaKey || event.ctrlKey) && event.key === 'z',
        handler: event => undoEventEmitter(event)
      },
      {
        // Ctrl+S or Cmd+S - SAVE
        condition: event => (event.metaKey || event.ctrlKey) && event.key === 's',
        handler: event => saveEventEmitter(event)
      },
      {
        // Ctrl+O or Cmd+O - OPEN
        condition: event => (event.metaKey || event.ctrlKey) && event.key === 'o',
        handler: event => openEventEmitter(event)
      },
      {
        // Ctrl+W or Cmd+W - OPEN
        condition: event => (event.metaKey || event.ctrlKey) && event.key === 'w',
        handler: event => closeEventEmitter(event)
      }
    ];

    // find the matching rule and execute the handler
    rules.find(rule => rule.condition(event))?.handler(event);
  });
};
