'use strict';

function getHtml({ prefix }) {
  return `<div id="${prefix}-footer-message"></div>`;
}

function getHtmlElement({ prefix, documentDOM = document }) {
  return documentDOM.getElementById(`${prefix}-footer-message`);
}

module.exports = { getHtml, getHtmlElement };
