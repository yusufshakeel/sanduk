'use strict';

const editorComponent = require('../../../../../src/renderer-process/ui-components/editor-component');

describe('Testing editor component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';
  const id = 1;

  describe('Testing get html element id', () => {
    test('Should be able to get html element id', () => {
      expect(editorComponent.getHtmlElementId({ prefix, id })).toBe('some-prefix-editor-1');
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      expect(
        editorComponent.getHtmlElement({ prefix, id, documentDOM: fakeDocument })
      ).toStrictEqual({
        id: 1
      });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocument.getElementById).toHaveBeenCalledWith('some-prefix-editor-1');
    });
  });

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = editorComponent.getHtml({ prefix, id });
      expect(html).toMatch(/id="some-prefix-editor-1"/);
    });
  });
});
