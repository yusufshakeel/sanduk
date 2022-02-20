'use strict';

function getHtml({ prefix, id, filename = 'Untitled' }) {
  return `<span class="pe-3 ${prefix}-filename" 
    id="${getHtmlElementId({ prefix, id })}" data-id="${id}">${filename}</span>`;
}

function getHtmlElement({ prefix, id, documentDOM = document }) {
  return documentDOM.getElementById(`${getHtmlElementId({ prefix, id })}`);
}

function getHtmlElementId({ prefix, id }) {
  return `${prefix}-filename-${id}`;
}

module.exports = { getHtml, getHtmlElement, getHtmlElementId };
