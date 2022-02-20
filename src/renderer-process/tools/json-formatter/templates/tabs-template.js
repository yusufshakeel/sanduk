'use strict';

const tabHtmlTemplate = require('./tab-html-template');
const tabPaneHtmlTemplate = require('./tab-pane-html-template');

module.exports = function tabsTemplate({ prefix, totalNumberOfTabs = 1 }) {
  const tabs = [];
  const tabPanes = [];
  for (let id = 1; id <= totalNumberOfTabs; id++) {
    tabs.push(tabHtmlTemplate({ prefix, tabName: `Tab ${id}`, id, addActiveClass: id === 1 }));
    tabPanes.push(tabPaneHtmlTemplate({ prefix, id, addActiveClass: id === 1 }));
  }
  return {
    tabs: tabs.join(''),
    tabPanes: tabPanes.join('')
  };
};
