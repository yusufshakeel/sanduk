'use strict';

const {
  CONTEXT_MENU_CUT_COPY_PASTE_SELECT_ALL_HTML_CONTAINER_ID
} = require('../constants/editor-constants');

module.exports = function showEditorCutCopyPasteSelectAllContextMenu({
  documentDOM = document,
  htmlEvent
}) {
  const element = documentDOM.getElementById(
    CONTEXT_MENU_CUT_COPY_PASTE_SELECT_ALL_HTML_CONTAINER_ID
  );
  const { pageX, pageY } = htmlEvent;
  const {
    body: { offsetWidth: docWidth, offsetHeight: docHeight }
  } = documentDOM;
  const renderX = pageX > docWidth - 120 ? docWidth - 120 : pageX;
  const renderY = pageY > docHeight - 250 ? docHeight - 250 : pageY;
  element.classList.add('show');
  element.classList.remove('d-none');
  element.style.left = `${renderX}px`;
  element.style.top = `${renderY}px`;
};
