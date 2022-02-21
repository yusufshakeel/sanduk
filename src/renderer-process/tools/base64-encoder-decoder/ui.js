'use strict';

const toolNavbarComponent = require('../../ui-components/tool-navbar-component');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabComponent = require('../../ui-components/tab-component');
const toolFooterMessageComponent = require('../../ui-components/tool-footer-message-component');

module.exports = function ui({ toolName, prefix }) {
  const fontSizeMenu = fontSizeAdjustmentNavItemComponent.getHtml({ prefix });
  const navbarCollapseHtml = [fontSizeMenu].join('');
  const navBar = toolNavbarComponent.getHtmlWithNavbarCollapse({
    toolName,
    prefix,
    navbarCollapseHtml
  });
  const tabs = tabComponent.getHtml({ prefix });
  const footer = toolFooterMessageComponent.getHtml({ prefix });

  return [navBar, tabs, footer].join('');
};
