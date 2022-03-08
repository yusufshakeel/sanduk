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

    describe('Testing save', () => {
      test('Should be able to save', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: true, ctrlKey: false, key: 's' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith('EVENT_TYPE_SAVE_CTRL_S_OR_CMD_S_KEYPRESS', {
          eventData: { ctrlKey: false, key: 's', metaKey: true }
        });
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    describe('Testing open', () => {
      test('Should be able to open', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: true, ctrlKey: false, key: 'o' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith('EVENT_TYPE_OPEN_CTRL_O_OR_CMD_O_KEYPRESS', {
          eventData: { ctrlKey: false, key: 'o', metaKey: true }
        });
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    describe('Testing close', () => {
      test('Should be able to close', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: true, ctrlKey: false, key: 'w' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith(
          'EVENT_TYPE_CLOSE_CTRL_W_OR_CMD_W_KEYPRESS',
          {
            eventData: { ctrlKey: false, key: 'w', metaKey: true }
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

    describe('Testing save', () => {
      test('Should be able to save', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: false, ctrlKey: true, key: 's' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith('EVENT_TYPE_SAVE_CTRL_S_OR_CMD_S_KEYPRESS', {
          eventData: { ctrlKey: true, key: 's', metaKey: false }
        });
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    describe('Testing open', () => {
      test('Should be able to open', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: false, ctrlKey: true, key: 'o' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith('EVENT_TYPE_OPEN_CTRL_O_OR_CMD_O_KEYPRESS', {
          eventData: { ctrlKey: true, key: 'o', metaKey: false }
        });
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    describe('Testing close', () => {
      test('Should be able to close', () => {
        const documentDOM = {
          addEventListener: jest.fn((type, listener) =>
            listener({ metaKey: false, ctrlKey: true, key: 'w' })
          )
        };
        documentEventRegister({ eventEmitter, documentDOM });
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledWith(
          'EVENT_TYPE_CLOSE_CTRL_W_OR_CMD_W_KEYPRESS',
          {
            eventData: { ctrlKey: true, key: 'w', metaKey: false }
          }
        );
        expect(documentDOM.addEventListener).toHaveBeenCalledTimes(1);
        expect(documentDOM.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });
  });
});
