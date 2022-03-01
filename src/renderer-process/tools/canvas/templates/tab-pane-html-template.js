'use strict';

const tabPaneNavItemComponent = require('../../../ui-components/tab-pane-nav-item-component');
const tabPaneFilenameComponent = require('../../../ui-components/tab-pane-filename-component');

module.exports = function tabPaneHtmlTemplate({ prefix, id, addActiveClass = false }) {
  const showActiveClassName = addActiveClass ? 'show active' : '';

  return `<div class="tab-pane ${showActiveClassName}" id="${prefix}-tab-${id}-content" role="tabpanel" aria-labelledby="tab-${id}">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      ${tabPaneFilenameComponent.getHtml({ prefix, id })}
      <ul class="navbar-nav">
        ${tabPaneNavItemComponent.getHtmlClearNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlUndoNavItem({ prefix, dataId: id })}
        ${tabPaneNavItemComponent.getHtmlRedoNavItem({ prefix, dataId: id })}
        <li>
          <select title="Brush" style="padding: 1px; margin: 2px;"
            class="${prefix}-brush-thickness" 
            id="${prefix}-brush-thickness-${id}">
            <option value="1">1</option>
            <option selected value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </li>
        <li class="nav-item">
          <input type="color" 
            title="Color"
            class="${prefix}-color-picker" 
            id="${prefix}-color-picker-${id}" 
            value="#000000" 
            style="height: 24px; width: 30px; margin: 3px; padding: 0;">
        </li>
      </ul>
    </div>
  </nav>
  <div class="text-center p-3" style="overflow: scroll; height: calc(100vh - 170px)">
    <canvas id="${prefix}-canvas-${id}" tabindex="1" class="shadow-lg"></canvas>
  </div>
</div>`;
};
