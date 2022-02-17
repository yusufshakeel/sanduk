'use strict';

module.exports = function popError(element, message, timeout = 5000) {
  element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  setTimeout(() => (element.innerHTML = ''), timeout);
};
