'use strict';

const tabPaneFilenameComponent = require('../../../../../src/renderer-process/ui-components/tab-pane-filename-component');

describe('Testing tabpane filename component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';
  const id = 1;
  const filename = 'some filename';

  describe('Testing get html element id', () => {
    test('Should be able to get html element id', () => {
      expect(tabPaneFilenameComponent.getHtmlElementId({ prefix, id })).toBe(
        'some-prefix-filename-1'
      );
    });
  });

  describe('Testing get html element', () => {
    test('Should be able to get html element', () => {
      const fakeDocument = {
        getElementById: jest.fn(() => ({ id: 1 }))
      };
      expect(
        tabPaneFilenameComponent.getHtmlElement({ prefix, id, documentDOM: fakeDocument })
      ).toStrictEqual({
        id: 1
      });
      expect(fakeDocument.getElementById).toHaveBeenCalledTimes(1);
      expect(fakeDocument.getElementById).toHaveBeenCalledWith('some-prefix-filename-1');
    });
  });

  describe('Testing get html', () => {
    describe('When filename is passed', () => {
      test('Should be able to get html', () => {
        const html = tabPaneFilenameComponent.getHtml({ prefix, id, filename });
        expect(html).toMatch(/class="pe-3 some-prefix-filename"/);
        expect(html).toMatch(/id="some-prefix-filename-1"/);
        expect(html).toMatch(/some filename/);
      });
    });

    describe('When filename is not passed', () => {
      test('Should be able to get html', () => {
        const html = tabPaneFilenameComponent.getHtml({ prefix, id });
        expect(html).toMatch(/class="pe-3 some-prefix-filename"/);
        expect(html).toMatch(/id="some-prefix-filename-1"/);
        expect(html).toMatch(/Untitled/);
      });
    });
  });
});
