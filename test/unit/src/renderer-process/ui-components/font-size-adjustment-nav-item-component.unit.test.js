'use strict';

const fontSizeAdjustmentNavItemComponent = require('../../../../../src/renderer-process/ui-components/font-size-adjustment-nav-item-component');

describe('Testing file menu dropdown nav item component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = fontSizeAdjustmentNavItemComponent.getHtml({ prefix });
      expect(html).toMatch(/id="some-prefix-increase-font-size-btn"/);
      expect(html).toMatch(/id="some-prefix-decrease-font-size-btn"/);
      expect(html).toMatch(/id="some-prefix-reset-font-size-btn"/);
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      const result = fontSizeAdjustmentNavItemComponent.getHtmlElement({
        prefix,
        documentDOM: fakeDocument
      });
      expect(result).toStrictEqual({
        increaseFontSizeBtnElement: { id: 1 },
        decreaseFontSizeBtnElement: { id: 1 },
        resetFontSizeBtnElement: { id: 1 }
      });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(3);
      expect(fakeDocument.getElementById).toHaveBeenNthCalledWith(
        1,
        'some-prefix-increase-font-size-btn'
      );
      expect(fakeDocument.getElementById).toHaveBeenNthCalledWith(
        2,
        'some-prefix-decrease-font-size-btn'
      );
      expect(fakeDocument.getElementById).toHaveBeenNthCalledWith(
        3,
        'some-prefix-reset-font-size-btn'
      );
    });
  });
});
