'use strict';

const {
  ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS
} = require('../../../constants/ace-editor-constants');

module.exports = function tabPaneHtmlTemplate(id, addActiveClass = false) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const defaultFontSize = `${ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS}px`;

  return `<div class="tab-pane ${showActiveClassName}" id="xml-to-json-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <span class="pe-3">XML</span>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-xml-editor-transform-btn" data-id="${id}" href="#"><i title="Transform" class="bi-wrench-adjustable"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-xml-editor-pretty-btn" data-id="${id}" href="#"><i title="Pretty" class="bi-emoji-smile"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-xml-editor-compact-btn" data-id="${id}" href="#"><i title="Compact" class="bi-justify-left"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-xml-editor-wrap-btn" data-id="${id}" href="#" data-wrap="no"><i title="Wrap" class="bi-body-text"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-xml-editor-copy-btn" data-id="${id}" href="#"><i title="Copy" class="bi-clipboard"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 pe-0 xml-to-json-xml-editor-clear-btn" data-id="${id}" href="#"><i title="Erase" class="bi-eraser"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        <pre class="form-control" id="xml-to-json-input-editor-${id}" style="height: calc(100vh - 250px); font-size: ${defaultFontSize}; margin-bottom: 0"></pre>
        <div class="bg-light p-1 font-monospace"><span id="xml-to-json-input-editor-${id}-footer">1:1</span></div>
      </div>
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <span class="pe-3">JSON</span>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-json-editor-pretty-btn" data-id="${id}" href="#"><i title="Pretty" class="bi-emoji-smile"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-json-editor-fold-btn" data-id="${id}" href="#"><i title="Fold" class="bi-arrows-collapse"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-json-editor-wrap-btn" data-id="${id}" href="#" data-wrap="no"><i title="Wrap" class="bi-body-text"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 xml-to-json-json-editor-copy-btn" data-id="${id}" href="#"><i title="Copy" class="bi-clipboard"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 pe-0 xml-to-json-json-editor-clear-btn" data-id="${id}" href="#"><i title="Erase" class="bi-eraser"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        <pre class="form-control" id="xml-to-json-output-editor-${id}" style="height: calc(100vh - 250px); font-size: ${defaultFontSize}; margin-bottom: 0"></pre>
        <div class="bg-light p-1 font-monospace"><span id="xml-to-json-output-editor-${id}-footer">1:1</span></div>
      </div>
    </div>
  </div>
</div>`;
};
