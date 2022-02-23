'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../../ui-components/editor-component');
const iframeComponent = require('../../../ui-components/iframe-component');
const EditorFooterBuilder = require('../../../ui-components/builders/editor-footer-builder');

module.exports = function tabPaneHtmlTemplate({
  prefix,
  prefixForMarkdown,
  prefixForPreview,
  id,
  addActiveClass = false
}) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const editorHeight = 'calc(100vh - 250px)';
  const iframeHeight = 'calc(100vh - 250px)';
  const markdownEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForMarkdown, id })
    .withRowColumnPosition()
    .build();
  const markdownFilenameOption = {
    prefix: prefixForMarkdown,
    id
  };
  const markdownBtnGenericOption = {
    prefix: prefixForMarkdown,
    dataId: id
  };
  const previewFilenameOption = {
    prefix: prefixForPreview,
    id,
    filename: 'Preview'
  };
  const previewBtnGenericOption = {
    prefix: prefixForPreview,
    dataId: id
  };
  const previewIframeOption = {
    prefix: prefixForPreview,
    id,
    classNames: ['github-markdown-body'],
    height: iframeHeight
  };

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-6 p-0" id="${prefix}-tab-${id}-markdown-column"
        data-viewEditorOnly="col-md-12 col-lg-12 p-0"
        data-viewEditorAndPreview="col-md-12 col-lg-6 p-0"
        data-viewPreviewOnly="d-none">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(markdownFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(markdownBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(markdownBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(markdownBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForMarkdown, id, height: editorHeight })}
        ${markdownEditorFooterHtml}
      </div>
      <div class="col-md-12 col-lg-6 p-0" id="${prefix}-tab-${id}-preview-column"
        data-viewEditorOnly="d-none"
        data-viewEditorAndPreview="col-md-12 col-lg-6 p-0"
        data-viewPreviewOnly="col-md-12 col-lg-12 p-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(previewFilenameOption)}
            <ul class="navbar-nav">
              <li class="nav-item">
                ${tabPaneNavItemComponent.getHtmlCloseNavItem(previewBtnGenericOption)}
              </li>
            </ul>
          </div>
        </nav>
        ${iframeComponent.getHtml(previewIframeOption)}
      </div>
    </div>
  </div>
</div>`;
};
