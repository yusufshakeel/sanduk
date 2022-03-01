'use strict';

const toolNavbarComponent = require('../../ui-components/tool-navbar-component');
const tabComponent = require('../../ui-components/tab-component');

module.exports = function ui({ toolName, prefix }) {
  const navBar = toolNavbarComponent.getHtml({
    toolName
  });
  const tabs = tabComponent.getHtml({ prefix });

  return [navBar, tabs].join('');
};
