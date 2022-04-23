'use strict';

const toolNavbarComponent = require('../../ui-components/tool-navbar-component');
const toolNavbarNavItemComponent = require('../../ui-components/tool-navbar-nav-item-component');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabComponent = require('../../ui-components/tab-component');

module.exports = function ui({ toolName, prefix }) {
  const transform = toolNavbarNavItemComponent.getHtmlTransformNavbarNavItem({
    prefix,
    title: 'Compare'
  });
  const fontSizeMenu = fontSizeAdjustmentNavItemComponent.getHtml({ prefix });
  const navbarCollapseHtml = [fontSizeMenu, transform].join('');
  const navBar = toolNavbarComponent.getHtmlWithNavbarCollapse({
    toolName,
    prefix,
    navbarCollapseHtml
  });
  const tabs = tabComponent.getHtml({ prefix });

  return [navBar, tabs].join('');
};
