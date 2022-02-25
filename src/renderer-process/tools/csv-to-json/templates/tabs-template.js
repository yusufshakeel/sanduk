'use strict';

const tabPaneHtmlTemplate = require('./tab-pane-html-template');
const tabComponent = require('../../../ui-components/tab-component');

module.exports = function tabsTemplate({
  prefix,
  prefixForCsvEditor,
  prefixForJsonEditor,
  totalNumberOfTabs = 1
}) {
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
    tabPanes.push(
      tabPaneHtmlTemplate({ prefix, prefixForCsvEditor, prefixForJsonEditor, id, addActiveClass })
    );
  }
  return {
    tabs: tabs.join(''),
    tabPanes: tabPanes.join('')
  };
};
