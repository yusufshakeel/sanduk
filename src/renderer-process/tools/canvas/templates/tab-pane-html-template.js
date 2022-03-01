'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');

module.exports = function tabPaneHtmlTemplate({ prefix, id, addActiveClass = false }) {
  const showActiveClassName = addActiveClass ? 'show active' : '';

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      ${tabPaneFilenameComponent.getHtml({ prefix, id, filename: 'Canvas' })}
      <ul class="navbar-nav">
        <li>
          <label for="exampleColorInput" class="form-label d-none">Color</label>
          <input type="color" class="form-control-sm form-control-color ${prefix}-color-picker" id="${prefix}-color-picker-${id}" value="#000000">
        </li>
        ${tabPaneNavItemComponent.getHtmlClearNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlUndoNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlRedoNavItem({ prefix, dataId: id })}
      </ul>
    </div>
  </nav>
  <div class="text-center p-3" style="overflow: scroll; height: calc(100vh - 140px)">
    <canvas id="${prefix}-canvas-${id}" tabindex="1" class="shadow-lg"></canvas>
  </div>
</div>`;
};
