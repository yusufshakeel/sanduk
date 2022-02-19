'use strict';

module.exports = function tabHtmlTemplate(id, addActiveClass = false) {
  const activeClassName = addActiveClass ? 'active' : '';
  return `<li class="nav-item" role="presentation">
  <button class="nav-link sanduk-json-formatter-tab ${activeClassName}" 
    data-tabid="${id}"
    id="json-formatter-tab-${id}" 
    data-bs-toggle="tab" 
    data-bs-target="#json-formatter-tab-${id}-content" 
    type="button" 
    role="tab" 
    aria-controls="tab-${id}" 
    aria-selected="true">Tab ${id}</button>
</li>`;
};
