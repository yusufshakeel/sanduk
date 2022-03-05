'use strict';

const {
  EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS,
  EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS
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
      }
    ];

    // find the matching rule and execute the handler
    rules.find(rule => rule.condition(event))?.handler(event);
  });
};
