'use strict';

const editorFooterLineColumnPositionComponent = require('../../../../../src/renderer-process/ui-components/editor-footer-line-column-position-component');

describe('Testing editor footer line column position component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';
  const id = 1;

  describe('Testing get html element id', () => {
    test('Should be able to get html element id', () => {
      expect(editorFooterLineColumnPositionComponent.getHtmlElementId({ prefix, id })).toBe(
        'some-prefix-editor-footer-1-line-column-position'
      );
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      expect(
        editorFooterLineColumnPositionComponent.getHtmlElement({
          prefix,
          id,
          documentDOM: fakeDocument
        })
      ).toStrictEqual({ id: 1 });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocument.getElementById).toHaveBeenCalledWith(
        'some-prefix-editor-footer-1-line-column-position'
      );
    });
  });

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = editorFooterLineColumnPositionComponent.getHtml({ prefix, id });
      expect(html).toMatch(/id="some-prefix-editor-footer-1-line-column-position"/);
    });
  });
});
