'use strict';

function getActiveTabIdByClassName(className, datasetAttribute = 'tabid') {
  const activeTab = document.getElementsByClassName(className);
  return activeTab[0].dataset[datasetAttribute];
}

module.exports = { getActiveTabIdByClassName };
