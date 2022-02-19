'use strict';

const setupEditor = require('../../../../../src/renderer-process/editor/setup-editor');

describe('Testing setup editor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const editor = {
    setTheme: jest.fn(),
    session: {
      setMode: jest.fn(),
      setUseWrapMode: jest.fn()
    },
    setShowPrintMargin: jest.fn(),
    selection: {
      on: jest.fn((event, handler) => handler())
    },
    getCursorPosition: jest.fn(() => ({}))
  };

  describe('When only editor is present', () => {
    test('Should be able to setup', () => {
      setupEditor({ editor });

      expect(editor.setTheme).toHaveBeenCalledTimes(1);
      expect(editor.setTheme).toHaveBeenCalledWith('ace/theme/iplastic');
      expect(editor.session.setMode).toHaveBeenCalledTimes(1);
      expect(editor.session.setMode).toHaveBeenCalledWith('ace/mode/text');
      expect(editor.session.setUseWrapMode).toHaveBeenCalledTimes(1);
      expect(editor.session.setUseWrapMode).toHaveBeenCalledWith(false);
      expect(editor.setShowPrintMargin).toHaveBeenCalledTimes(1);
      expect(editor.setShowPrintMargin).toHaveBeenCalledWith(false);
      expect(editor.selection.on).toHaveBeenCalledTimes(0);
    });
  });

  describe('When both editor and rowColumnPositionElement are present', () => {
    test('Should be able to setup', () => {
      const rowColumnPositionElement = { innerText: 'this should get set on setup' };

      setupEditor({ editor, rowColumnPositionElement });

      expect(editor.setTheme).toHaveBeenCalledTimes(1);
      expect(editor.setTheme).toHaveBeenCalledWith('ace/theme/iplastic');
      expect(editor.session.setMode).toHaveBeenCalledTimes(1);
      expect(editor.session.setMode).toHaveBeenCalledWith('ace/mode/text');
      expect(editor.session.setUseWrapMode).toHaveBeenCalledTimes(1);
      expect(editor.session.setUseWrapMode).toHaveBeenCalledWith(false);
      expect(editor.setShowPrintMargin).toHaveBeenCalledTimes(1);
      expect(editor.setShowPrintMargin).toHaveBeenCalledWith(false);
      expect(editor.selection.on).toHaveBeenCalledTimes(1);
      expect(editor.selection.on).toHaveBeenCalledWith('changeCursor', expect.any(Function));
      expect(rowColumnPositionElement.innerText).toBe('1:1');
    });
  });
});
