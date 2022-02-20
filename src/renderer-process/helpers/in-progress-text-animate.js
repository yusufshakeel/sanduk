'use strict';

module.exports = function inProgressTextAnimate(element, olderText, newerText, timeout = 500) {
  element.innerText = newerText;
  setTimeout(() => (element.innerText = olderText), timeout);
};
