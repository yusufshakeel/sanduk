'use strict';
const deepSortObject = require('deep-sort-object');

/**
 * Sort object by the key.
 * @param data {object} This is the object to sort.
 * @param descendingSort {boolean} If set to true will sort in descending order.
 */
module.exports = function sortObject({ data, descendingSort = false }) {
  return descendingSort ? deepSortObject(data, (a, b) => b.localeCompare(a)) : deepSortObject(data);
};
