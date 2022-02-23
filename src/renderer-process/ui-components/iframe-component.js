'use strict';

function getHtml({ prefix, id, classNames = [], height = `calc(100vh - 250px)` }) {
  return `<iframe id="${getHtmlElementId({ prefix, id })}"
   class="${classNames.join(' ')}"
   style="border: 1px solid #ced4da;
     overflow: scroll;
     padding: 5px;
     width: 100%;
     height: ${height};"></iframe>`;
}

function getHtmlElement({ prefix, id, documentDOM = document }) {
  return documentDOM.getElementById(`${getHtmlElementId({ prefix, id })}`);
}

function getHtmlElementId({ prefix, id }) {
  return `${prefix}-iframe-${id}`;
}

module.exports = { getHtml, getHtmlElement, getHtmlElementId };
