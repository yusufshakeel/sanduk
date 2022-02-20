'use strict';

function getHtml({ prefix, id, filename = 'Untitled' }) {
  return `<span class="pe-3 ${prefix}-filename" id="${prefix}-filename-${id}" data-id="${id}">${filename}</span>`;
}

function getHtmlElement({ prefix, id, documentDOM = document }) {
  return documentDOM.getElementById(`${prefix}-filename-${id}`);
}

module.exports = { getHtml, getHtmlElement };
