'use strict';

const NAVBAR_NAV_ITEMS = {
  EDIT: 'EDIT',
  PREVIEW: 'PREVIEW',
  SPLIT_VIEW: 'SPLIT_VIEW'
};

const navbarNavItemToIdMapper = ({ prefix }) => ({
  EDIT: { key: 'editNavbarNavItemElements', id: `${prefix}-navbar-nav-item-edit-btn` },
  PREVIEW: { key: 'previewNavbarNavItemElements', id: `${prefix}-navbar-nav-item-preview-btn` },
  SPLIT_VIEW: {
    key: 'splitViewNavbarNavItemElements',
    id: `${prefix}-navbar-nav-item-splitView-btn`
  }
});

function getHtmlEditNavbarNavItem({ prefix, title = 'Edit' }) {
  const id = navbarNavItemToIdMapper({ prefix }).EDIT.id;
  return `<li class="nav-item">
  <a class="nav-link" id="${id}"><i title="${title}" class="bi-pencil-square"></i></a>
</li>`;
}

function getHtmlPreviewNavbarNavItem({ prefix, title = 'Preview' }) {
  const id = navbarNavItemToIdMapper({ prefix }).PREVIEW.id;
  return `<li class="nav-item">
  <a class="nav-link" id="${id}"><i title="${title}" class="bi-image"></i></a>
</li>`;
}

function getHtmlSplitViewNavbarNavItem({ prefix, title = 'Split View' }) {
  const id = navbarNavItemToIdMapper({ prefix }).SPLIT_VIEW.id;
  return `<li class="nav-item">
  <a class="nav-link" id="${id}"><i title="${title}" class="bi-layout-split"></i></a>
</li>`;
}

/**
 * @param prefix {string}
 * @param specificNavItemsToPick {string[]}
 * @param documentDOM
 */
function getHtmlElements({
  prefix,
  specificNavItemsToPick = Object.values(NAVBAR_NAV_ITEMS),
  documentDOM = document
}) {
  return specificNavItemsToPick.reduce((result, navItem) => {
    const v = navbarNavItemToIdMapper({ prefix })[navItem];
    return { ...result, [v.key]: documentDOM.getElementById(v.id) };
  }, {});
}

module.exports = {
  NAVBAR_NAV_ITEMS,
  getHtmlElements,
  getHtmlSplitViewNavbarNavItem,
  getHtmlPreviewNavbarNavItem,
  getHtmlEditNavbarNavItem
};
