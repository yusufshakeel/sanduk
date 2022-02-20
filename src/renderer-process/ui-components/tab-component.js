'use strict';

function getHtml({ prefix }) {
  return `<ul class="nav nav-tabs" id="${prefix}-Tab" role="tablist"></ul>
<div class="tab-content" id="${prefix}-TabContent"></div>`;
}

function getHtmlTabNavItem({ id, prefix, otherClassNames, tabName }) {
  return `<li class="nav-item" role="presentation">
  <button class="nav-link ${prefix}-tab ${otherClassNames.join(' ')}"
    data-tabid="${id}"
    id="${prefix}-tab-${id}" 
    data-bs-toggle="tab" 
    data-bs-target="#${prefix}-tab-${id}-content" 
    type="button" 
    role="tab"
    aria-controls="tab-${id}" 
    aria-selected="true">${tabName}</button>
</li>`;
}

module.exports = { getHtml, getHtmlTabNavItem };
