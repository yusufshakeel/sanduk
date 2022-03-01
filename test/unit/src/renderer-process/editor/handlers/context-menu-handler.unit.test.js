'use strict';

const {
  contextMenuCutHandler,
  contextMenuCopyHandler,
  contextMenuPasteHandler,
  contextMenuSelectAllHandler
} = require('../../../../../../src/renderer-process/editor/handlers/context-menu-handler');

describe('Testing context menu handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getActiveTabId = jest.fn(() => 1);
  const editor = {
    getCopyText: jest.fn(() => 'Copy text'),
    getCursorPosition: jest.fn(() => 1),
    selectAll: jest.fn(),
    session: { insert: jest.fn() },
    insert: jest.fn()
  };
  const editors = [editor];
  const electronClipboard = { writeText: jest.fn(), readText: jest.fn(() => 'Read text') };

  describe('Testing cut handler', () => {
    test('Should be able to call handler', () => {
      contextMenuCutHandler({ getActiveTabId, editors, electronClipboard });
      expect(getActiveTabId).toHaveBeenCalledTimes(1);
      expect(electronClipboard.writeText).toHaveBeenCalledTimes(1);
      expect(editor.getCopyText).toHaveBeenCalledTimes(1);
      expect(editor.insert).toHaveBeenCalledTimes(1);
      expect(editor.insert).toHaveBeenCalledWith('');
    });
  });

  describe('Testing copy handler', () => {
    test('Should be able to call handler', () => {
      contextMenuCopyHandler({ getActiveTabId, editors, electronClipboard });
      expect(getActiveTabId).toHaveBeenCalledTimes(1);
      expect(electronClipboard.writeText).toHaveBeenCalledTimes(1);
      expect(editor.getCopyText).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing paste handler', () => {
    test('Should be able to call handler', () => {
      contextMenuPasteHandler({ getActiveTabId, editors, electronClipboard });
      expect(getActiveTabId).toHaveBeenCalledTimes(1);
      expect(electronClipboard.readText).toHaveBeenCalledTimes(1);
      expect(editor.getCursorPosition).toHaveBeenCalledTimes(1);
      expect(editor.session.insert).toHaveBeenCalledTimes(1);
      expect(editor.session.insert).toHaveBeenCalledWith(1, 'Read text');
    });
  });

  describe('Testing select all handler', () => {
    test('Should be able to call handler', () => {
      contextMenuSelectAllHandler({ getActiveTabId, editors });
      expect(getActiveTabId).toHaveBeenCalledTimes(1);
      expect(editor.selectAll).toHaveBeenCalledTimes(1);
    });
  });
});
