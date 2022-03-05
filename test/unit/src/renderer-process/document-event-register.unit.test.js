'use strict';

const documentEventRegister = require('../../../../src/renderer-process/document-event-register');

describe('Testing document event register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const eventEmitter = { emit: jest.fn() };

  describe('Testing on macOS', () => {
    describe('Testing undo', () => {
      test('Should be able to undo', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: true, ctrlKey: false, key: 'z' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith('EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS', {
          eventData: { ctrlKey: false, key: 'z', metaKey: true }
        });
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    describe('Testing redo', () => {
      test('Should be able to redo', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: true, shiftKey: true, ctrlKey: false, key: 'z' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith(
          'EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS',
          {
            eventData: { ctrlKey: false, shiftKey: true, key: 'z', metaKey: true }
          }
        );
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });
  });

  describe('Testing on Windows/Linux', () => {
    describe('Testing undo', () => {
      test('Should be able to undo', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: false, ctrlKey: true, key: 'z' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith('EVENT_TYPE_UNDO_CTRL_Z_OR_CMD_Z_KEYPRESS', {
          eventData: { ctrlKey: true, key: 'z', metaKey: false }
        });
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    describe('Testing redo', () => {
      test('Should be able to redo', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: false, shiftKey: false, ctrlKey: true, key: 'y' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith(
          'EVENT_TYPE_REDO_CTRL_Y_OR_CMD_SHIFT_Z_KEYPRESS',
          {
            eventData: { ctrlKey: true, shiftKey: false, key: 'y', metaKey: false }
          }
        );
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });
  });
});
