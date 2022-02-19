'use strict';

const {
  ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS
} = require('../../../constants/ace-editor-constants');

module.exports = function tabPaneHtmlTemplate(id, addActiveClass = false) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const defaultFontSize = `${ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS}px`;

  return `<div class="tab-pane ${showActiveClassName}" id="editor-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <span id="editor-input-editor-${id}-opened-file"
              class="pe-3"
              data-filename=""
              data-filepath="">Untitled</span>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link py-0 editor-input-editor-wrap-btn" data-id="${id}" href="#" data-wrap="no">Wrap</a>
              </li>
            </ul>
          </div>
        </nav>
        <pre class="form-control" id="editor-input-editor-${id}" style="height: calc(100vh - 250px); font-size: ${defaultFontSize}; margin-bottom: 0"></pre>
        <div class="bg-light p-1 font-monospace"><span id="editor-input-editor-${id}-footer">Ln: 1 Col: 1</span></div>
      </div>
    </div>
  </div>
</div>`;
};
