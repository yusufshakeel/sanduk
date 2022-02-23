'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../../ui-components/editor-component');
const EditorFooterBuilder = require('../../../ui-components/builders/editor-footer-builder');

module.exports = function tabPaneHtmlTemplate({
  prefix,
  prefixForXmlEditor,
  prefixForJsonEditor,
  id,
  addActiveClass = false
}) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const editorHeight = 'calc(100vh - 250px)';
  const xmlEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForXmlEditor, id })
    .withRowColumnPosition()
    .build();
  const jsonEditorFooterHtml = new EditorFooterBuilder({ prefix: prefixForJsonEditor, id })
    .withRowColumnPosition()
    .build();
  const xmlFilenameOption = {
    prefix: prefixForXmlEditor,
    id,
    filename: 'XML'
  };
  const xmlBtnGenericOption = {
    prefix: prefixForXmlEditor,
    dataId: id
  };
  const xmlToJsonBtnOption = {
    prefix: prefixForXmlEditor,
    dataId: id,
    title: 'Transform to JSON'
  };
  const jsonFilenameOption = {
    prefix: prefixForJsonEditor,
    id,
    filename: 'JSON'
  };
  const jsonBtnGenericOption = {
    prefix: prefixForJsonEditor,
    dataId: id
  };
  const jsonToXmlBtnOption = {
    prefix: prefixForJsonEditor,
    dataId: id,
    title: 'Transform to XML'
  };

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(xmlFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlTransformNavItem(xmlToJsonBtnOption)}
              ${tabPaneNavItemComponent.getHtmlPrettyNavItem(xmlBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCompactNavItem(xmlBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(xmlBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(xmlBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(xmlBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForXmlEditor, id, height: editorHeight })}
        ${xmlEditorFooterHtml}
      </div>
      <div class="col-md-12 col-lg-6 px-0">
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            ${tabPaneFilenameComponent.getHtml(jsonFilenameOption)}
            <ul class="navbar-nav">
              ${tabPaneNavItemComponent.getHtmlTransformNavItem(jsonToXmlBtnOption)}
              ${tabPaneNavItemComponent.getHtmlPrettyNavItem(jsonBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCompactNavItem(jsonBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlFoldNavItem(jsonBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlWrapNavItem(jsonBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlCopyNavItem(jsonBtnGenericOption)}
              ${tabPaneNavItemComponent.getHtmlClearNavItem(jsonBtnGenericOption)}
            </ul>
          </div>
        </nav>
        ${editorComponent.getHtml({ prefix: prefixForJsonEditor, id, height: editorHeight })}
        ${jsonEditorFooterHtml}
      </div>
    </div>
  </div>
</div>`;
};
