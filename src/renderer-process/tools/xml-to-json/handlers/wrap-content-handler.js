'use strict';

const wrapUnwrapEditorContent = require('../../../helpers/wrap-unwrap-editor-content');

function initWrapContentHandler(getActiveTabId, wrapBtns, editors) {
  for (const wrapBtn of wrapBtns) {
    wrapBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      wrapUnwrapEditorContent({
        wrapBtn,
        editor,
        wrapInnerHtml: 'Wrap',
        unWrapInnerHtml: 'Unwrap'
      });
    });
  }
}

module.exports = { initWrapContentHandler };
