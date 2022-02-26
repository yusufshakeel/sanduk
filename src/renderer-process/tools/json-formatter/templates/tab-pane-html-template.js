'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');
const editorComponent = require('../../../ui-components/editor-component');
const EditorFooterBuilder = require('../../../ui-components/builders/editor-footer-builder');

module.exports = function tabPaneHtmlTemplate({ prefix, id, addActiveClass = false }) {
  const showActiveClassName = addActiveClass ? 'show active' : '';
  const editorFooterHtml = new EditorFooterBuilder({ prefix, id }).withRowColumnPosition().build();

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      ${tabPaneFilenameComponent.getHtml({ prefix, id })}
      <ul class="navbar-nav">
        ${tabPaneNavItemComponent.getHtmlValidateNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlPrettyNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlCompactNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlFoldNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlSortAscendingNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlSortDescendingNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlWrapNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlCopyNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlClearNavItem({ prefix, dataId: id })}
      </ul>
    </div>
  </nav>
  ${editorComponent.getHtml({ prefix, id, height: 'calc(100vh - 190px)' })}
  ${editorFooterHtml}
</div>`;
};
