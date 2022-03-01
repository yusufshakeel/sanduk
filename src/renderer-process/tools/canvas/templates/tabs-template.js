'use strict';

const tabsTemplate = require('../../../templates/tabs-template');
const tabPaneHtmlTemplate = require('./tab-pane-html-template');

module.exports = function ({ prefix, totalNumberOfTabs = 1 }) {
  return tabsTemplate({ prefix, totalNumberOfTabs, tabPaneHtmlTemplate });
};
