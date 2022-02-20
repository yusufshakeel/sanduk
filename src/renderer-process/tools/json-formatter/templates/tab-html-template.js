'use strict';

const tabComponent = require('../../../ui-components/tab-component');

module.exports = function tabHtmlTemplate({ prefix, tabName, id, addActiveClass = false }) {
  const activeClassName = addActiveClass ? 'active' : '';
  return tabComponent.getHtmlTabNavItem({
    id,
    prefix,
    otherClassNames: [activeClassName],
    tabName
  });
};
