'use strict';

module.exports = function wrapUnwrapEditorContent({
  wrapBtn,
  editor,
  wrapInnerHtml = 'Wrap',
  unWrapInnerHtml = 'Unwrap'
}) {
  if (editor.getValue().length) {
    const isWrapped = wrapBtn.dataset.wrap === 'yes';
    if (isWrapped) {
      editor.session.setUseWrapMode(false);
      wrapBtn.dataset.wrap = 'no';
      wrapBtn.innerText = wrapInnerHtml;
    } else {
      editor.session.setUseWrapMode(true);
      wrapBtn.dataset.wrap = 'yes';
      wrapBtn.innerText = unWrapInnerHtml;
    }
  }
};
