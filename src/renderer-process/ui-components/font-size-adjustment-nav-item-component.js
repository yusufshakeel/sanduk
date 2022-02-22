'use strict';

function getHtml({ prefix }) {
  return `<li class="nav-item">
    <a class="nav-link" id="${prefix}-increase-font-size-btn"><i title="Increase font size" class="bi-zoom-in"></i></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="${prefix}-decrease-font-size-btn"><i title="Decrease font size" class="bi-zoom-out"></i></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="${prefix}-reset-font-size-btn"><i title="Reset font size" class="bi-arrow-counterclockwise"></i></a>
  </li>`;
}

function getHtmlElement({ prefix, documentDOM = document }) {
  const increaseFontSizeBtnElement = documentDOM.getElementById(`${prefix}-increase-font-size-btn`);
  const decreaseFontSizeBtnElement = documentDOM.getElementById(`${prefix}-decrease-font-size-btn`);
  const resetFontSizeBtnElement = documentDOM.getElementById(`${prefix}-reset-font-size-btn`);
  return { increaseFontSizeBtnElement, decreaseFontSizeBtnElement, resetFontSizeBtnElement };
}

module.exports = { getHtml, getHtmlElement };
