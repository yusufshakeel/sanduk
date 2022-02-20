'use strict';

const EditorFooterBuilder = require('../../../../../../src/renderer-process/ui-components/builders/editor-footer-builder');

describe('Testing editor footer builder', () => {
  const prefix = 'some prefix';
  const id = 1;
  test('Should be able to build and return editor footer', () => {
    const html = new EditorFooterBuilder({ prefix, id }).withRowColumnPosition().build();
    expect(html).toMatch(/title="\[Line]:\[Column]"/);
    expect(html).toMatch(/id="some prefix-editor-footer-1-line-column-position"/);
    expect(html).toMatch(/>1:1<\/span>/);
  });
});
