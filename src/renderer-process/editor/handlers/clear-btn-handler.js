'use strict';

const inProgressHtmlAnimate = require('../../helpers/in-progress-html-animate');

function initClearBtnHandler(getActiveTabId, clearBtns, editors) {
  for (const clearBtn of clearBtns) {
    clearBtn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      const editor = editors[activeTabId - 1];
      inProgressHtmlAnimate(
        clearBtn,
        '<i title="Erase" class="bi-eraser"></i>',
        '<i title="Erase" class="bi-eraser-fill"></i>',
        200
      );
      editor.setValue('');
    });
  }
}

module.exports = { initClearBtnHandler };
