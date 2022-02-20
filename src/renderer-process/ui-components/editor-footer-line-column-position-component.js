'use strict';

function getHtml({ prefix, id }) {
  return `<span title="[Line]:[Column]" class="${prefix}-editor-footer-line-column-position" id="${prefix}-editor-footer-${id}-line-column-position">1:1</span>`;
}

function getHtmlElement({ prefix, id, documentDOM = document }) {
  return documentDOM.getElementById(`${prefix}-editor-footer-${id}-line-column-position`);
}

module.exports = { getHtml, getHtmlElement };
