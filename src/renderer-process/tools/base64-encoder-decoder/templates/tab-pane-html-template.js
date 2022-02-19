'use strict';

const {
  ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS
} = require('../../../constants/ace-editor-constants');

module.exports = function tabPaneHtmlTemplate(id, addActiveClass = false) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const defaultFontSize = `${ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS}px`;

  return `<div class="tab-pane ${showActiveClassName}" id="base64-encoder-decoder-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <span class="pe-3">Plain text</span>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link py-0 base64-encoder-decoder-plaintext-input-editor-encode-btn" data-id="${id}" href="#">Encode</a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 base64-encoder-decoder-plaintext-input-editor-wrap-btn" data-id="${id}" href="#" data-wrap="no">Wrap</a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 base64-encoder-decoder-plaintext-input-editor-copy-btn" data-id="${id}" href="#"><i class="far fa-clipboard"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 pe-0 base64-encoder-decoder-plaintext-input-editor-clear-btn" data-id="${id}" href="#"><i class="fas fa-eraser"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        <pre class="form-control" id="base64-encoder-decoder-plaintext-input-editor-${id}" style="height: calc(100vh - 250px); font-size: ${defaultFontSize}; margin-bottom: 0"></pre>
        <div class="bg-light p-1 font-monospace"><span id="base64-encoder-decoder-plaintext-input-editor-${id}-footer">1:1</span></div>
      </div>
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <span class="pe-3">Encoded text</span>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link py-0 base64-encoder-decoder-encoded-output-editor-decode-btn" data-id="${id}" href="#">Decode</a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 base64-encoder-decoder-encoded-output-editor-wrap-btn" data-id="${id}" href="#" data-wrap="no">Wrap</a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 base64-encoder-decoder-encoded-output-editor-copy-btn" data-id="${id}" href="#"><i class="far fa-clipboard"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link py-0 pe-0 base64-encoder-decoder-encoded-output-editor-clear-btn" data-id="${id}" href="#"><i class="fas fa-eraser"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        <pre class="form-control" id="base64-encoder-decoder-encoded-output-editor-${id}" style="height: calc(100vh - 250px); font-size: ${defaultFontSize}; margin-bottom: 0"></pre>
        <div class="bg-light p-1 font-monospace"><span id="base64-encoder-decoder-encoded-output-editor-${id}-footer">1:1</span></div>
      </div>
    </div>
  </div>
</div>`;
};
