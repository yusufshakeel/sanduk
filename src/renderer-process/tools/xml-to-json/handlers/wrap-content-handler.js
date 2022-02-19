'use strict';

const wrapUnwrapContent = require('../../../editor/wrap-unwrap-content');

function initWrapContentHandler(getActiveTabId, wrapBtns, editors) {
  for (const wrapBtn of wrapBtns) {
    wrapBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      wrapUnwrapContent({
        wrapBtn,
        editor,
        wrapInnerHtml: 'Wrap',
        unWrapInnerHtml: 'Unwrap'
      });
    });
  }
}

module.exports = { initWrapContentHandler };
