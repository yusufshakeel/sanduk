'use strict';

const contextMenu = require('../../../../../src/renderer-process/context-menu');

describe('Testing context menu', () => {
  test('Should be able to set context menu', () => {
    const eventEmitter = { emit: jest.fn() };
    const contextMenuContainerElement = { innerHTML: '' };
    const cutCopyPasteSelectAllContextMenuContainerElement = {
      getAttribute: jest.fn(() => '{"contextMenuEventHandlerId":"some id"}')
    };
    const cutBtnElement = { addEventListener: jest.fn((type, listener) => listener()) };
    const copyBtnElement = { addEventListener: jest.fn((type, listener) => listener()) };
    const pasteBtnElement = { addEventListener: jest.fn((type, listener) => listener()) };
    const selectAllBtnElement = { addEventListener: jest.fn((type, listener) => listener()) };
    const documentDOM = {
      getElementById: jest.fn(id => {
        const map = {
          'sanduk-context-menu-container': contextMenuContainerElement,
          'cutCopyPasteSelectAll-editor-context-menu-container':
            cutCopyPasteSelectAllContextMenuContainerElement,
          'cutCopyPasteSelectAll-editor-context-menu-cut-btn': cutBtnElement,
          'cutCopyPasteSelectAll-editor-context-menu-copy-btn': copyBtnElement,
          'cutCopyPasteSelectAll-editor-context-menu-paste-btn': pasteBtnElement,
          'cutCopyPasteSelectAll-editor-context-menu-select-all-btn': selectAllBtnElement
        };
        return map[id];
      })
    };

    contextMenu({ eventEmitter, documentDOM });

    expect(contextMenuContainerElement.innerHTML).toMatch(
      /<div class="position-fixed shadow-sm d-none sanduk-context-menu"/
    );
    expect(contextMenuContainerElement.innerHTML).toMatch(
      /id="cutCopyPasteSelectAll-editor-context-menu-container">/
    );

    expect(cutCopyPasteSelectAllContextMenuContainerElement.getAttribute).toHaveBeenCalledTimes(4);
    expect(cutCopyPasteSelectAllContextMenuContainerElement.getAttribute).toHaveBeenNthCalledWith(
      1,
      'data-eventData'
    );
    expect(cutCopyPasteSelectAllContextMenuContainerElement.getAttribute).toHaveBeenNthCalledWith(
      2,
      'data-eventData'
    );
    expect(cutCopyPasteSelectAllContextMenuContainerElement.getAttribute).toHaveBeenNthCalledWith(
      3,
      'data-eventData'
    );
    expect(cutCopyPasteSelectAllContextMenuContainerElement.getAttribute).toHaveBeenNthCalledWith(
      4,
      'data-eventData'
    );

    expect(eventEmitter.emit).toHaveBeenCalledTimes(4);
    expect(eventEmitter.emit).toHaveBeenNthCalledWith(1, 'CONTEXT_MENU_EVENT_TYPE_CUT', {
      eventData: { contextMenuEventHandlerId: 'some id' },
      eventType: 'CONTEXT_MENU_EVENT_TYPE_CUT'
    });
    expect(eventEmitter.emit).toHaveBeenNthCalledWith(2, 'CONTEXT_MENU_EVENT_TYPE_COPY', {
      eventData: { contextMenuEventHandlerId: 'some id' },
      eventType: 'CONTEXT_MENU_EVENT_TYPE_COPY'
    });
    expect(eventEmitter.emit).toHaveBeenNthCalledWith(3, 'CONTEXT_MENU_EVENT_TYPE_PASTE', {
      eventData: { contextMenuEventHandlerId: 'some id' },
      eventType: 'CONTEXT_MENU_EVENT_TYPE_PASTE'
    });
    expect(eventEmitter.emit).toHaveBeenNthCalledWith(4, 'CONTEXT_MENU_EVENT_TYPE_SELECT_ALL', {
      eventData: { contextMenuEventHandlerId: 'some id' },
      eventType: 'CONTEXT_MENU_EVENT_TYPE_SELECT_ALL'
    });
  });
});
