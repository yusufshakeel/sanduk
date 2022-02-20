'use strict';

module.exports = function awaiting(milliseconds = 1000) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
