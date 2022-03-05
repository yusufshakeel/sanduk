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
          <select title="Brush Color" style="padding: 1px; margin: 2px;"
            class="${prefix}-brush-color" 
            id="${prefix}-brush-color-${id}">
            <option selected value="#000000">Black</option>
            <option value="#ffffff">White</option>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
            <option value="#ffe00e">Yellow</option>
            <option value="#fb22aa">Pink</option>
          </select>
        </li>
        <li>
          <select title="Brush Size" style="padding: 1px; margin: 2px;"
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
      </ul>
    </div>
  </nav>
  <div class="text-center p-3" style="overflow: scroll; height: calc(100vh - 170px);">
    <canvas id="${prefix}-canvas-${id}" tabindex="1" class="shadow-lg"></canvas>
  </div>
</div>`;
};
