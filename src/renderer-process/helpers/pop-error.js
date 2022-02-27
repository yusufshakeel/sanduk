'use strict';

/**
 * @param message {string} This is a string.
 * @param timeout {Number} In milliseconds
 * @param documentDOM {document}
 */
module.exports = function popError({ message, timeout = 5000, documentDOM = document }) {
  const element = documentDOM.getElementById('sanduk-pop-message-container');
  element.classList.add('show');
  element.classList.remove('d-none');

  documentDOM.getElementById(
    'sanduk-pop-message-header-title'
  ).innerHTML = `<i class="bi-exclamation-circle-fill text-danger"></i> Error`;

  documentDOM.getElementById('sanduk-pop-message-body').innerHTML = `${message}`;

  setTimeout(() => {
    element.classList.add('d-none');
    element.classList.remove('show');
  }, timeout);
};
