'use strict';

function getHtml({ prefix }) {
  return `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle sanduk-dropdown-toggle-without-arrow" id="${prefix}-file-menu-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
      <i title="File" class="bi-folder2"></i>
    </a>
    <ul class="dropdown-menu" aria-labelledby="${prefix}-file-menu-dropdown">
      <li><a class="dropdown-item" id="${prefix}-file-menu-dropdown-open-btn"><i class="bi-folder"></i> Open...</a></li>
      <li><a class="dropdown-item" id="${prefix}-file-menu-dropdown-save-btn">Save</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" id="${prefix}-file-menu-dropdown-close-btn">Close File</a></li>
    </ul>
  </li>`;
}

function getHtmlElement({ prefix, documentDOM = document }) {
  const openFileBtnElement = documentDOM.getElementById(`${prefix}-file-menu-dropdown-open-btn`);
  const saveFileBtnElement = documentDOM.getElementById(`${prefix}-file-menu-dropdown-save-btn`);
  const closeFileBtnElement = documentDOM.getElementById(`${prefix}-file-menu-dropdown-close-btn`);
  return { openFileBtnElement, saveFileBtnElement, closeFileBtnElement };
}

module.exports = { getHtml, getHtmlElement };
