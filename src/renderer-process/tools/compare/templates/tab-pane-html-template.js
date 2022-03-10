'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../../ui-components/editor-component');
const iframeComponent = require('../../../ui-components/iframe-component');
const EditorFooterBuilder = require('../../../ui-components/builders/editor-footer-builder');

module.exports = function tabPaneHtmlTemplate({
  prefix,
  prefixForSourceEditor,
  prefixForDestinationEditor,
  prefixForPreview,
  id,
  addActiveClass = false
}) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const editorHeight = '300px';
  const iframeHeight = 'calc(100vh - 250px)';
  const sourceEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForSourceEditor, id })
    .withRowColumnPosition()
    .build();
  const destinationEditorFooterHtml = new EditorFooterBuilder({
    prefix: prefixForDestinationEditor,
    id
  })
    .withRowColumnPosition()
    .build();
  const sourceFilenameOption = {
    prefix: prefixForSourceEditor,
    id,
    filename: 'Source'
  };
  const sourceBtnGenericOption = {
    prefix: prefixForSourceEditor,
    dataId: id
  };
  const sourceEditorOption = {
    prefix: prefixForSourceEditor,
    id,
    height: editorHeight
  };
  const destinationFilenameOption = {
    prefix: prefixForDestinationEditor,
    id,
    filename: 'Destination'
  };
  const destinationBtnGenericOption = {
    prefix: prefixForDestinationEditor,
    dataId: id
  };
  const destinationEditorOption = {
    prefix: prefixForDestinationEditor,
    id,
    height: editorHeight
  };
  const previewIframeOption = {
    prefix: prefixForPreview,
    id,
    classNames: ['github-markdown-body'],
    height: iframeHeight
  };

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="accordion" id="${prefix}-accordion">
    <div class="accordion-item">
      <h2 class="accordion-header" id="${prefix}-heading-input">
        <span class="accordion-button" data-bs-toggle="collapse" data-bs-target="#${prefix}-collapse-input" aria-expanded="true" aria-controls="${prefix}-collapse-input">
          Input
        </span>
      </h2>
      <div id="${prefix}-collapse-input" class="accordion-collapse collapse show" aria-labelledby="${prefix}-heading-input" data-bs-parent="#${prefix}-accordion">
        <div class="accordion-body p-0">
          <div class="container-fluid" style="padding: 0 12px 0;">
            <div class="row">
              <div class="col-md-12 col-lg-6 px-0">
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                  <div class="container-fluid">
                    ${tabPaneFilenameComponent.getHtml(sourceFilenameOption)}
                    <ul class="navbar-nav">
                      ${tabPaneNavItemComponent.getHtmlWrapNavItem(sourceBtnGenericOption)}
                      ${tabPaneNavItemComponent.getHtmlCopyNavItem(sourceBtnGenericOption)}
                      ${tabPaneNavItemComponent.getHtmlClearNavItem(sourceBtnGenericOption)}
                    </ul>
                  </div>
                </nav>
                ${editorComponent.getHtml(sourceEditorOption)}
                ${sourceEditorFooterHtml}
              </div>
              <div class="col-md-12 col-lg-6 px-0">
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                  <div class="container-fluid">
                    ${tabPaneFilenameComponent.getHtml(destinationFilenameOption)}
                    <ul class="navbar-nav">
                      ${tabPaneNavItemComponent.getHtmlWrapNavItem(destinationBtnGenericOption)}
                      ${tabPaneNavItemComponent.getHtmlCopyNavItem(destinationBtnGenericOption)}
                      ${tabPaneNavItemComponent.getHtmlClearNavItem(destinationBtnGenericOption)}
                    </ul>
                  </div>
                </nav>
                ${editorComponent.getHtml(destinationEditorOption)}
                ${destinationEditorFooterHtml}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="${prefix}-heading-output">
        <span class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#${prefix}-collapse-output" aria-expanded="false" aria-controls="${prefix}-collapse-output">
          Difference
        </span>
      </h2>
      <div id="${prefix}-collapse-output" class="accordion-collapse collapse" aria-labelledby="${prefix}-heading-output" data-bs-parent="#${prefix}-accordion">
        <div class="accordion-body p-0">
          <div class="container-fluid" style="padding: 0 12px 0;">
            <div class="row" style="height: calc(100vh - 250px); overflow-y: scroll; overflow-x: hidden;">
              <div class="col-md-12 col-lg-6 px-0">
                <pre id="${prefix}-pre-source-${id}" style="word-wrap: break-word; white-space: pre-wrap;"></pre>
              </div>
              <div class="col-md-12 col-lg-6 px-0">
                <pre id="${prefix}-pre-destination-${id}" style="word-wrap: break-word; white-space: pre-wrap;"></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
};
