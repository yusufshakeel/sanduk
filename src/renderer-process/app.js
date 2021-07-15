'use strict';
const ClickedToolHandler = require('../handlers/clicked-tool-handler');
const navbarComponent = require('../renderer-process/navbar-component');
const sidebarComponent = require('../renderer-process/sidebar-component');
const contentComponent = require('../renderer-process/content-component');
const clickedToolHandler = new ClickedToolHandler();

async function addClickEventListenerToTools() {
  const menuItems = document.getElementsByClassName('sanduk-tool');
  const contentWrappers = document.getElementsByClassName('sandook-tool-content-wrapper');
  if (!menuItems || !contentWrappers) {
    return;
  }
  clickedToolHandler.registerMenuItems(menuItems);
  clickedToolHandler.registerContentWrappers(contentWrappers);
}

window.onload = () => {
  navbarComponent()
    .then(sidebarComponent)
    .then(contentComponent)
    .then(addClickEventListenerToTools);
};
