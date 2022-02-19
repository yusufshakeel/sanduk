'use strict';

module.exports = function popInfo(element, message, timeout = 5000) {
  element.innerHTML = `<div class="alert alert-info" role="alert">${message}</div>`;
  setTimeout(() => (element.innerHTML = ''), timeout);
};
