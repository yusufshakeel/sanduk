'use strict';

module.exports = function inProgressHtmlAnimate(element, olderHtml, newerHtml = '', timeout = 500) {
  element.innerHTML = newerHtml;
  setTimeout(() => (element.innerHTML = olderHtml), timeout);
};
