'use strict';
const { ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS } = require('../constants/ace-editor-constants');

function getHtml({
  prefix,
  id,
  height = `calc(100vh - 250px)`,
  fontSize = `${ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS}px`
}) {
  return `<pre class="form-control ${prefix}-editor" 
    id="${getHtmlElementId({ prefix, id })}"
    style="height: ${height}; font-size: ${fontSize}; margin-bottom: 0"></pre>`;
}

function getHtmlElement({ prefix, id, documentDOM = document }) {
  return documentDOM.getElementById(`${getHtmlElementId({ prefix, id })}`);
}

function getHtmlElementId({ prefix, id }) {
  return `${prefix}-editor-${id}`;
}

module.exports = { getHtml, getHtmlElement, getHtmlElementId };
