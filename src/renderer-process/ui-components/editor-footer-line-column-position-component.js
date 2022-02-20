'use strict';

function getHtml({ prefix, id }) {
  return `<span title="[Line]:[Column]" 
    class="${prefix}-editor-footer-line-column-position" 
    id="${getHtmlElementId({ prefix, id })}">1:1</span>`;
}

function getHtmlElement({ prefix, id, documentDOM = document }) {
  return documentDOM.getElementById(`${getHtmlElementId({ prefix, id })}`);
}

function getHtmlElementId({ prefix, id }) {
  return `${prefix}-editor-footer-${id}-line-column-position`;
}

module.exports = { getHtml, getHtmlElement, getHtmlElementId };
