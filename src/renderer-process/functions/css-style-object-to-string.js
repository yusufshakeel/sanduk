'use strict';

/**
 *
 * @param styleObject
 * @return {string}
 */
module.exports = function cssStyleObjectToString(styleObject) {
  return Object.entries(styleObject)
    .reduce((result, [key, value]) => [...result, `${key}:${value};`], [])
    .join('');
};
