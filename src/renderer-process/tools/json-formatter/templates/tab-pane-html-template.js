'use strict';

const {
  ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS
} = require('../../../constants/ace-editor-constants');

module.exports = function tabPaneHtmlTemplate(id, addActiveClass = false) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const defaultFontSize = `${ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS}px`;

  return `<div class="tab-pane ${showActiveClassName}" id="json-formatter-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <span class="pe-3" id="json-formatter-editor-filename-${id}" data-id="${id}" data-filepath="">Untitled</span>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link py-0 json-formatter-editor-validate-btn" data-id="${id}" href="#"><i title="Validate" class="bi-check2-square"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link py-0 json-formatter-editor-pretty-btn" data-id="${id}" href="#"><i title="Pretty" class="bi-emoji-smile"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link py-0 json-formatter-editor-compact-btn" data-id="${id}" href="#"><i title="Compact" class="bi-justify-left"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link py-0 json-formatter-editor-fold-btn" data-id="${id}" href="#"><i title="Fold" class="bi-arrows-collapse"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link py-0 json-formatter-editor-wrap-btn" data-id="${id}" href="#" data-wrap="no"><i title="Wrap" class="bi-body-text"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link py-0 json-formatter-editor-copy-btn" data-id="${id}" href="#"><i title="Copy" class="bi-clipboard"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link py-0 pe-0 json-formatter-editor-clear-btn" data-id="${id}" href="#"><i title="Erase" class="bi-eraser"></i></a>
        </li>
      </ul>
    </div>
  </nav>
  <pre class="form-control" id="json-formatter-input-editor-${id}" style="height: calc(100vh - 250px); font-size: ${defaultFontSize}; margin-bottom: 0"></pre>
  <div class="bg-light p-1 font-monospace"><span id="json-formatter-input-editor-${id}-footer">1:1</span></div>
</div>`;
};
