'use strict';

function initClearBtnHandler(getActiveTabId, clearBtns, editors) {
  for (const copyBtn of clearBtns) {
    copyBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      editor.setValue('');
    });
  }
}

module.exports = { initClearBtnHandler };
