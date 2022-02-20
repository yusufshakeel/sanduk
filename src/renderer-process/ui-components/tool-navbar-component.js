'use strict';

function getHtml({ toolName }) {
  return `<nav class="navbar navbar-expand-sm navbar-light bg-light sticky-top mb-1">
  <div class="container-fluid">
    <span class="pe-3">${toolName}</span>
  </div>
</nav>`;
}

function getHtmlWithNavbarCollapse({ toolName, prefix, navbarCollapseHtml }) {
  return `<nav class="navbar navbar-expand-sm navbar-light bg-light mb-1">
  <div class="container-fluid">
    <span class="pe-3">${toolName}</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#${prefix}-navbar"
            aria-controls="json-formatter-navbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="${prefix}-navbar">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        ${navbarCollapseHtml}
      </ul>
    </div>
  </div>
</nav>`;
}

module.exports = { getHtml, getHtmlWithNavbarCollapse };
