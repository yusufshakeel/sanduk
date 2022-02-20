'use strict';

function getHtml({ prefix }) {
  return `<div id="${getHtmlElementId({ prefix })}"></div>`;
}

function getHtmlElement({ prefix, documentDOM = document }) {
  return documentDOM.getElementById(`${getHtmlElementId({ prefix })}`);
}

function getHtmlElementId({ prefix }) {
  return `${prefix}-footer-message`;
}

module.exports = { getHtml, getHtmlElement, getHtmlElementId };
