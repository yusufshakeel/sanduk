'use strict';

module.exports = function popSuccess(element, message, timeout = 5000) {
  element.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
  setTimeout(() => (element.innerHTML = ''), timeout);
};
