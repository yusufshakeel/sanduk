'use strict';

/**
 * @param message {string}
 * @param timeout {number}
 * @param documentDOM {document}
 */
module.exports = function popInfo({ message, timeout = 5000, documentDOM = document }) {
  const element = documentDOM.getElementById('sanduk-pop-message-container');
  element.classList.add('show');
  element.classList.remove('d-none');

  documentDOM.getElementById(
    'sanduk-pop-message-header-title'
  ).innerHTML = `<i class="bi-exclamation-circle-fill text-info"></i> Info`;

  documentDOM.getElementById('sanduk-pop-message-body').innerHTML = `${message}`;

  setTimeout(() => {
    element.classList.add('d-none');
    element.classList.remove('show');
  }, timeout);
};
