'use strict';

const toolFooterMessageComponent = require('../../../../../src/renderer-process/ui-components/tool-footer-message-component');

describe('Testing tool footer message component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';

  describe('Testing get html element id', () => {
    test('Should be able to get html element id', () => {
      expect(toolFooterMessageComponent.getHtmlElementId({ prefix })).toBe(
        'some-prefix-footer-message'
      );
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      expect(
        toolFooterMessageComponent.getHtmlElement({ prefix, documentDOM: fakeDocument })
      ).toStrictEqual({
        id: 1
      });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocument.getElementById).toHaveBeenCalledWith('some-prefix-footer-message');
    });
  });

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = toolFooterMessageComponent.getHtml({ prefix });
      expect(html).toMatch(/id="some-prefix-footer-message"/);
    });
  });
});
