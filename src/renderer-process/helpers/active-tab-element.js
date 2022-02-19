'use strict';

/**
 * This will return the first element.
 * @param className {string} Can be a string word or space separated words
 * @param datasetAttribute {string} Single string
 * @param documentDOM {document} This is the document (DOM).
 * @return {string|undefined}
 */
function getActiveTabIdByClassName(className, datasetAttribute, documentDOM = document) {
  const activeTab = documentDOM.getElementsByClassName(className);
  return activeTab?.[0].dataset[datasetAttribute];
}

module.exports = { getActiveTabIdByClassName };
