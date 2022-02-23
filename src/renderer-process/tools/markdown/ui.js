'use strict';

const fileMenuDropdownNavItemComponent = require('../../ui-components/file-menu-dropdown-nav-item-component');
const toolNavbarComponent = require('../../ui-components/tool-navbar-component');
const fontSizeAdjustmentNavItemComponent = require('../../ui-components/font-size-adjustment-nav-item-component');
const tabComponent = require('../../ui-components/tab-component');
const toolFooterMessageComponent = require('../../ui-components/tool-footer-message-component');
const toolNavbarNavItemComponent = require('../../ui-components/tool-navbar-nav-item-component');

module.exports = function ui({ toolName, prefix }) {
  const fileMenu = fileMenuDropdownNavItemComponent.getHtml({ prefix });
  const fontSizeMenu = fontSizeAdjustmentNavItemComponent.getHtml({ prefix });
  const editorOnlyMenuItem = toolNavbarNavItemComponent.getHtmlEditNavbarNavItem({
    prefix,
    title: 'Editor Only'
  });
  const editorAndPreviewMenuItem = toolNavbarNavItemComponent.getHtmlSplitViewNavbarNavItem({
    prefix,
    title: 'Editor and Preview'
  });
  const previewOnlyMenuItem = toolNavbarNavItemComponent.getHtmlPreviewNavbarNavItem({
    prefix,
    title: 'Preview Only'
  });
  const navbarCollapseHtml = [
    fileMenu,
    fontSizeMenu,
    editorOnlyMenuItem,
    editorAndPreviewMenuItem,
    previewOnlyMenuItem
  ].join('');
  const navBar = toolNavbarComponent.getHtmlWithNavbarCollapse({
    toolName,
    prefix,
    navbarCollapseHtml
  });
  const tabs = tabComponent.getHtml({ prefix });
  const footer = toolFooterMessageComponent.getHtml({ prefix });

  return [navBar, tabs, footer].join('');
};
