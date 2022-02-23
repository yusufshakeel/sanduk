'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../../ui-components/editor-component');
const EditorFooterBuilder = require('../../../ui-components/builders/editor-footer-builder');

module.exports = function tabPaneHtmlTemplate({
  prefix,
  prefixForInput,
  prefixForOutput,
  id,
  addActiveClass = false
}) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const editorHeight = 'calc(100vh - 250px)';
  const inputEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForInput, id })
    .withRowColumnPosition()
    .build();
  const outputEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForOutput, id })
    .withRowColumnPosition()
    .build();
  const inputFilenameOption = {
    prefix: prefixForInput,
    id,
    filename: 'JWT'
  };
  const inputBtnGenericOption = {
    prefix: prefixForInput,
    dataId: id
  };
  const inputDecodeBtnOption = {
    prefix: prefixForInput,
    dataId: id,
    title: 'Decode'
  };
  const outputFilenameOption = {
    prefix: prefixForOutput,
    id,
    filename: 'Decoded'
  };
  const outputBtnGenericOption = {
    prefix: prefixForOutput,
    dataId: id
  };

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(inputFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlTransformNavItem(inputDecodeBtnOption)}
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(inputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(inputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(inputBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForInput, id, height: editorHeight })}
        ${inputEditorFooterHtml}
      </div>
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(outputFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlPrettyNavItem(outputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCompactNavItem(outputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlFoldNavItem(outputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(outputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(outputBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(outputBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForOutput, id, height: editorHeight })}
        ${outputEditorFooterHtml}
      </div>
    </div>
  </div>
</div>`;
};
