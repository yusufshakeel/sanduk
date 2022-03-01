'use strict';

const showEditorCutCopyPasteSelectAllContextMenu = require('../../../../../src/renderer-process/helpers/show-editor-cut-copy-paste-select-all-context-menu');

describe('Testing show editor cut copy paste select all context menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fakeElement = jest.fn(() => ({
    classList: { add: jest.fn(), remove: jest.fn() },
    style: { top: '0px', left: '0px' }
  }));

  describe('When right click is away from the corner of the window in the editor', () => {
    test('Should be able to show', () => {
      const htmlEvent = { pageX: 500, pageY: 500 };
      const element = fakeElement();
      const fakeDocumentDOM = {
        body: { offsetWidth: 1000, offsetHeight: 1000 },
        getElementById: jest.fn(() => element)
      };
      showEditorCutCopyPasteSelectAllContextMenu({ documentDOM: fakeDocumentDOM, htmlEvent });
      expect(fakeDocumentDOM.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocumentDOM.getElementById).toHaveBeenCalledWith(
        'cutCopyPasteSelectAll-editor-context-menu-container'
      );
      expect(element.classList.add).toHaveBeenCalledTimes(1);
      expect(element.classList.add).toHaveBeenCalledWith('show');
      expect(element.classList.remove).toHaveBeenCalledTimes(1);
      expect(element.classList.remove).toHaveBeenCalledWith('d-none');
      expect(element.style.left).toBe('500px');
      expect(element.style.top).toBe('500px');
    });
  });

  describe('When right click is at the corner of the window in the editor', () => {
    test('Should be able to show', () => {
      const htmlEvent = { pageX: 1000, pageY: 1000 };
      const element = fakeElement();
      const fakeDocumentDOM = {
        body: { offsetWidth: 1000, offsetHeight: 1000 },
        getElementById: jest.fn(() => element)
      };
      showEditorCutCopyPasteSelectAllContextMenu({ documentDOM: fakeDocumentDOM, htmlEvent });
      expect(fakeDocumentDOM.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocumentDOM.getElementById).toHaveBeenCalledWith(
        'cutCopyPasteSelectAll-editor-context-menu-container'
      );
      expect(element.classList.add).toHaveBeenCalledTimes(1);
      expect(element.classList.add).toHaveBeenCalledWith('show');
      expect(element.classList.remove).toHaveBeenCalledTimes(1);
      expect(element.classList.remove).toHaveBeenCalledWith('d-none');
      expect(element.style.left).toBe('880px');
      expect(element.style.top).toBe('750px');
    });
  });
});
