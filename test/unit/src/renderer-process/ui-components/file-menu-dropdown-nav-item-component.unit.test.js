'use strict';

const fileMenuDropdownNavItemComponent = require('../../../../../src/renderer-process/ui-components/file-menu-dropdown-nav-item-component');

describe('Testing file menu dropdown nav item component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = fileMenuDropdownNavItemComponent.getHtml({ prefix });
      expect(html).toMatch(/id="some-prefix-file-menu-dropdown"/);
      expect(html).toMatch(/id="some-prefix-file-menu-dropdown-open-btn"/);
      expect(html).toMatch(/id="some-prefix-file-menu-dropdown-save-btn"/);
      expect(html).toMatch(/id="some-prefix-file-menu-dropdown-close-btn"/);
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      const result = fileMenuDropdownNavItemComponent.getHtmlElement({
        prefix,
        documentDOM: fakeDocument
      });
      expect(result).toStrictEqual({
        openFileBtnElement: { id: 1 },
        saveFileBtnElement: { id: 1 },
        closeFileBtnElement: { id: 1 }
      });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(3);
      expect(fakeDocument.getElementById).toHaveBeenNthCalledWith(
        1,
        'some-prefix-file-menu-dropdown-open-btn'
      );
      expect(fakeDocument.getElementById).toHaveBeenNthCalledWith(
        2,
        'some-prefix-file-menu-dropdown-save-btn'
      );
      expect(fakeDocument.getElementById).toHaveBeenNthCalledWith(
        3,
        'some-prefix-file-menu-dropdown-close-btn'
      );
    });
  });
});
