'use strict';

const { CONTENT_WRAPPED_NO, CONTENT_WRAPPED_YES } = require('../constants/editor-constants');

module.exports = function wrapUnwrapContent({
  wrapBtn,
  editor,
  wrapInnerHtml = '<i title="Wrap" class="bi-body-text"></i>',
  unWrapInnerHtml = '<i title="Unwrap" class="bi-text-paragraph"></i>'
}) {
  if (editor.getValue().length) {
    const isWrapped = wrapBtn.dataset.wrap === CONTENT_WRAPPED_YES;
    if (isWrapped) {
      editor.session.setUseWrapMode(false);
      wrapBtn.dataset.wrap = CONTENT_WRAPPED_NO;
      wrapBtn.innerHTML = wrapInnerHtml;
    } else {
      editor.session.setUseWrapMode(true);
      wrapBtn.dataset.wrap = CONTENT_WRAPPED_YES;
      wrapBtn.innerHTML = unWrapInnerHtml;
    }
  }
};
