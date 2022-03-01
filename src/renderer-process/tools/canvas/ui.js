'use strict';

const toolNavbarComponent = require('../../ui-components/tool-navbar-component');
const tabComponent = require('../../ui-components/tab-component');
const fileMenuDropdownNavItemComponent = require('../../ui-components/file-menu-dropdown-nav-item-component');

module.exports = function ui({ toolName, prefix }) {
  const fileMenu = fileMenuDropdownNavItemComponent.getHtml({ prefix });
  const navbarCollapseHtml = [fileMenu].join('');
  const navBar = toolNavbarComponent.getHtmlWithNavbarCollapse({
    toolName,
    prefix,
    navbarCollapseHtml
  });
  const tabs = tabComponent.getHtml({ prefix });

  return [navBar, tabs].join('');
};
