'use strict';

module.exports = function tabHtmlTemplate(id, addActiveClass = false) {
  const activeClassName = addActiveClass ? 'active' : '';
  return `<li class="nav-item" role="presentation">
  <button class="nav-link sanduk-xml-to-json-tab ${activeClassName}" 
    data-tabid="${id}"
    id="xml-to-json-tab-${id}" 
    data-bs-toggle="tab" 
    data-bs-target="#xml-to-json-tab-${id}-content" 
    type="button" 
    role="tab" 
    aria-controls="tab-${id}" 
    aria-selected="true">Tab ${id}</button>
</li>`;
};
