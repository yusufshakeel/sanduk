'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../../ui-components/editor-component');
const EditorFooterBuilder = require('../../../ui-components/builders/editor-footer-builder');

module.exports = function tabPaneHtmlTemplate({
  prefix,
  prefixForEncoder,
  prefixForDecoder,
  id,
  addActiveClass = false
}) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const editorHeight = 'calc(100vh - 195px)';
  const encoderEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForEncoder, id })
    .withRowColumnPosition()
    .build();
  const decoderEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForDecoder, id })
    .withRowColumnPosition()
    .build();
  const encoderFilenameOption = {
    prefix: prefixForEncoder,
    id,
    filename: 'Plain Text'
  };
  const encoderBtnGenericOption = {
    prefix: prefixForEncoder,
    dataId: id
  };
  const encoderEncodeBtnOption = {
    prefix: prefixForEncoder,
    dataId: id,
    title: 'Encode'
  };
  const decoderFilenameOption = {
    prefix: prefixForDecoder,
    id,
    filename: 'Encoded Text'
  };
  const decoderBtnGenericOption = {
    prefix: prefixForDecoder,
    dataId: id
  };
  const decoderDecodeBtnOption = {
    prefix: prefixForDecoder,
    dataId: id,
    title: 'Decode'
  };

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid" style="padding: 0 12px 0;">
    <div class="row">
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(encoderFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlTransformNavItem(encoderEncodeBtnOption)}
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(encoderBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(encoderBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(encoderBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForEncoder, id, height: editorHeight })}
        ${encoderEditorFooterHtml}
      </div>
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(decoderFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlTransformNavItem(decoderDecodeBtnOption)}
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(decoderBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(decoderBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(decoderBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForDecoder, id, height: editorHeight })}
        ${decoderEditorFooterHtml}
      </div>
    </div>
  </div>
</div>`;
};
