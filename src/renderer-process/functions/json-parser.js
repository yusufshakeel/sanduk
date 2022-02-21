'use strict';

module.exports = function jsonParser(str) {
  try {
    const data = JSON.parse(str);
    return { isValidJSON: true, data };
  } catch (e) {
    return { isValidJSON: false, error: e, errorMessage: e.message };
  }
};
