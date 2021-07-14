'use strict';
const packageJson = require('../../package.json');
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
  const { version } = packageJson;
  navbarComponent({ version })
    .then(sidebarComponent)
    .then(contentComponent)
    .then(addClickEventListenerToTools);
};
