'use strict';

const contextMenuHandlerSetup = require('../../../../../../src/renderer-process/editor/handlers/context-menu-handler-setup');

describe('Testing context menu handler setup', () => {
  test('Should be able to setup', () => {
    const contextMenuEventHandlerId = 'some id';
    const eventEmitter = {
      on: jest.fn((event, handler) => handler({ eventData: { contextMenuEventHandlerId } }))
    };
    const editor = {
      container: {
        addEventListener: jest.fn((type, listener) => listener({ pageX: 100, pageY: 100 }))
      }
    };
    const editors = [editor];
    const getActiveTabId = jest.fn(() => 1);
    const element = {
      setAttribute: jest.fn()
    };
    const documentDOM = {
      getElementById: jest.fn(() => element)
    };
    const electronClipboard = {};
    const contextMenuHandler = {
      contextMenuCutHandler: jest.fn(),
      contextMenuCopyHandler: jest.fn(),
      contextMenuPasteHandler: jest.fn(),
      contextMenuSelectAllHandler: jest.fn()
    };
    const showEditorCutCopyPasteSelectAllContextMenu = jest.fn();

    contextMenuHandlerSetup({
      eventEmitter,
      contextMenuEventHandlerId,
      editors,
      getActiveTabId,
      documentDOM,
      electronClipboard,
      contextMenuHandler,
      showEditorCutCopyPasteSelectAllContextMenu
    });

    expect(documentDOM.getElementById).toHaveBeenCalledTimes(1);
    expect(documentDOM.getElementById).toHaveBeenCalledWith(
      'cutCopyPasteSelectAll-editor-context-menu-container'
    );
    expect(element.setAttribute).toHaveBeenCalledTimes(1);
    expect(element.setAttribute).toHaveBeenCalledWith(
      'data-eventData',
      '{"contextMenuEventHandlerId":"some id"}'
    );
    expect(editor.container.addEventListener).toHaveBeenCalledTimes(1);
    expect(editor.container.addEventListener).toHaveBeenCalledWith(
      'contextmenu',
      expect.any(Function),
      false
    );
    expect(showEditorCutCopyPasteSelectAllContextMenu).toHaveBeenCalledTimes(1);
    expect(showEditorCutCopyPasteSelectAllContextMenu).toHaveBeenCalledWith({
      documentDOM: { getElementById: expect.any(Function) },
      htmlEvent: { pageX: 100, pageY: 100 }
    });

    expect(eventEmitter.on).toHaveBeenCalledTimes(4);
    expect(eventEmitter.on).toHaveBeenNthCalledWith(
      1,
      'CONTEXT_MENU_EVENT_TYPE_CUT',
      expect.any(Function)
    );
    expect(eventEmitter.on).toHaveBeenNthCalledWith(
      2,
      'CONTEXT_MENU_EVENT_TYPE_COPY',
      expect.any(Function)
    );
    expect(eventEmitter.on).toHaveBeenNthCalledWith(
      3,
      'CONTEXT_MENU_EVENT_TYPE_PASTE',
      expect.any(Function)
    );
    expect(eventEmitter.on).toHaveBeenNthCalledWith(
      4,
      'CONTEXT_MENU_EVENT_TYPE_SELECT_ALL',
      expect.any(Function)
    );

    expect(contextMenuHandler.contextMenuCutHandler).toHaveBeenCalledTimes(1);
    expect(contextMenuHandler.contextMenuCopyHandler).toHaveBeenCalledTimes(1);
    expect(contextMenuHandler.contextMenuPasteHandler).toHaveBeenCalledTimes(1);
    expect(contextMenuHandler.contextMenuSelectAllHandler).toHaveBeenCalledTimes(1);
  });
});
