'use strict';

const tabComponent = require('../ui-components/tab-component');

module.exports = function tabsTemplate({ prefix, totalNumberOfTabs = 1, tabPaneHtmlTemplate }) {
  const tabs = [];
  const tabPanes = [];
  for (let id = 1; id <= totalNumberOfTabs; id++) {
    const addActiveClass = id === 1;
    tabs.push(
      tabComponent.getHtmlTabNavItem({
        id,
        prefix,
        otherClassNames: [addActiveClass ? 'active' : ''],
        tabName: `Tab ${id}`
      })
    );
    tabPanes.push(tabPaneHtmlTemplate({ prefix, id, addActiveClass }));
  }
  return {
    tabs: tabs.join(''),
    tabPanes: tabPanes.join('')
  };
};
