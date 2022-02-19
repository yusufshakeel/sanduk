'use strict';

/**
 * This will pop error message inside the html element.
 * @param element {HTMLElement} The html element.
 * @param message {string} This is a string.
 * @param timeout {Number} In milliseconds
 */
module.exports = function popError(element, message, timeout = 5000) {
  element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  setTimeout(() => (element.innerHTML = ''), timeout);
};
