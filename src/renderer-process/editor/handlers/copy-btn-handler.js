'use strict';

const { clipboard } = require('electron');
const inProgressHtmlAnimate = require('../../helpers/in-progress-html-animate');

function initCopyBtnHandler(getActiveTabId, copyBtns, editors, electronClipboard = clipboard) {
  for (const copyBtn of copyBtns) {
    copyBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      inProgressHtmlAnimate(
        copyBtn,
        '<i title="Copy" class="bi-clipboard"></i>',
        '<i title="Copy" class="bi-clipboard-check-fill"></i>',
        200
      );
      electronClipboard.writeText(editor.getValue());
    });
  }
}

module.exports = { initCopyBtnHandler };
