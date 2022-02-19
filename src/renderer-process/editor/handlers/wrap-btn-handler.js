'use strict';

const wrapUnwrapContent = require('../wrap-unwrap-content');

function initWrapBtnHandler(getActiveTabId, wrapBtns, editors) {
  for (const wrapBtn of wrapBtns) {
    wrapBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      wrapUnwrapContent({
        wrapBtn,
        editor
      });
    });
  }
}

module.exports = { initWrapBtnHandler };
