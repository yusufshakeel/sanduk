'use strict';

const EditorContextMenuBuilder = require('../../../../../../src/renderer-process/ui-components/builders/editor-context-menu-builder');

describe('Testing editor context menu builder', () => {
  const prefix = 'some prefix';
  test('Should be able to build and return editor context menu', () => {
    const html = new EditorContextMenuBuilder({ prefix })
      .withCutMenuItem()
      .withCopyMenuItem()
      .withPasteMenuItem()
      .withSelectAllMenuItem()
      .build();
    expect(html).toMatch(/class="position-fixed shadow-sm d-none sanduk-context-menu"/);
    expect(html).toMatch(/data-eventData="{}"/);
    expect(html).toMatch(/id="some prefix-editor-context-menu-container"/);
    expect(html).toMatch(/id="some prefix-editor-context-menu-cut-btn">Cut<\/span>/);
    expect(html).toMatch(/id="some prefix-editor-context-menu-copy-btn">Copy<\/span>/);
    expect(html).toMatch(/id="some prefix-editor-context-menu-paste-btn">Paste<\/span>/);
    expect(html).toMatch(/id="some prefix-editor-context-menu-select-all-btn">Select All<\/span>/);
  });
});
