'use strict';

const iframeComponent = require('../../../../../src/renderer-process/ui-components/iframe-component');

describe('Testing iframe component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';
  const id = 1;

  describe('Testing get html element id', () => {
    test('Should be able to get html element id', () => {
      expect(iframeComponent.getHtmlElementId({ prefix, id })).toBe('some-prefix-iframe-1');
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      expect(
        iframeComponent.getHtmlElement({ prefix, id, documentDOM: fakeDocument })
      ).toStrictEqual({
        id: 1
      });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocument.getElementById).toHaveBeenCalledWith('some-prefix-iframe-1');
    });
  });

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = iframeComponent.getHtml({ prefix, id });
      expect(html).toMatch(/id="some-prefix-iframe-1"/);
    });
  });
});
