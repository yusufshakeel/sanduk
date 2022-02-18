'use strict';

const { clipboard } = require('electron');
const inProgressHtmlAnimate = require('../../../helpers/in-progress-html-animate');

function initCopyBtnHandler(getActiveTabId, copyBtns, editors) {
  for (const copyBtn of copyBtns) {
    copyBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      inProgressHtmlAnimate(
        copyBtn,
        '<i class="far fa-clipboard"></i>',
        '<i class="fas fa-clipboard-check"></i>',
        200
      );
      clipboard.writeText(editor.getValue());
    });
  }
}

module.exports = { initCopyBtnHandler };
