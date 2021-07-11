'use strict';
const ClickedToolHandler = require('../handlers/clicked-tool-handler');
const clickedToolHandler = new ClickedToolHandler();

function addClickEventListenerToTools() {
  const menuItems = document.getElementsByClassName('sanduk-tool');
  const contentWrappers = document.getElementsByClassName('sandook-tool-content-wrapper');
  if (!menuItems || !contentWrappers) {
    return;
  }
  clickedToolHandler.registerMenuItems(menuItems);
  clickedToolHandler.registerContentWrappers(contentWrappers);
}

window.onload = () => {
  addClickEventListenerToTools();
};
