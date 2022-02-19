'use strict';

module.exports = function tabHtmlTemplate(id, addActiveClass = false) {
  const activeClassName = addActiveClass ? 'active' : '';
  return `<li class="nav-item" role="presentation">
  <button class="nav-link sanduk-base64-encoder-decoder-tab ${activeClassName}" 
    data-tabid="${id}"
    id="base64-encoder-decoder-tab-${id}" 
    data-bs-toggle="tab" 
    data-bs-target="#base64-encoder-decoder-tab-${id}-content" 
    type="button" 
    role="tab" 
    aria-controls="tab-${id}" 
    aria-selected="true">Tab ${id}</button>
</li>`;
};
