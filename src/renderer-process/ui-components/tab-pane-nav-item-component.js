'use strict';

const TAB_PANE_NAV_ITEMS = {
  CLEAR: 'CLEAR',
  COMPACT: 'COMPACT',
  COPY: 'COPY',
  FOLD: 'FOLD',
  PRETTY: 'PRETTY',
  VALIDATE: 'VALIDATE',
  WRAP: 'WRAP'
};

function getHtmlValidateNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-validate-btn" data-id="${dataId}" href="#"><i title="Validate" class="bi-check2-square"></i></a>
</li>`;
}

function getHtmlPrettyNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-pretty-btn" data-id="${dataId}" href="#"><i title="Pretty" class="bi-emoji-smile"></i></a>
</li>`;
}

function getHtmlCompactNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-compact-btn" data-id="${dataId}" href="#"><i title="Compact" class="bi-justify-left"></i></a>
</li>`;
}

function getHtmlFoldNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-fold-btn" data-id="${dataId}" href="#"><i title="Fold" class="bi-arrows-collapse"></i></a>
</li>`;
}

function getHtmlWrapNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-wrap-btn" data-id="${dataId}" href="#" data-wrap="no"><i title="Wrap" class="bi-body-text"></i></a>
</li>`;
}

function getHtmlCopyNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-copy-btn" data-id="${dataId}" href="#"><i title="Copy" class="bi-clipboard"></i></a>
</li>`;
}

function getHtmlClearNavItem({ prefix, dataId }) {
  return `<li class="nav-item">
  <a class="nav-link py-0 ${prefix}-clear-btn" data-id="${dataId}" href="#"><i title="Erase" class="bi-eraser"></i></a>
</li>`;
}

/**
 * @param prefix {string}
 * @param specificNavItemsToPick {string[]}
 * @param documentDOM
 */
function getHtmlElements({
  prefix,
  specificNavItemsToPick = Object.values(TAB_PANE_NAV_ITEMS),
  documentDOM = document
}) {
  const validateNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.VALIDATE)
    ? documentDOM.getElementsByClassName(`${prefix}-validate-btn`)
    : undefined;

  const prettyNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.PRETTY)
    ? documentDOM.getElementsByClassName(`${prefix}-pretty-btn`)
    : undefined;

  const compactNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.COMPACT)
    ? documentDOM.getElementsByClassName(`${prefix}-compact-btn`)
    : undefined;

  const foldNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.FOLD)
    ? documentDOM.getElementsByClassName(`${prefix}-fold-btn`)
    : undefined;

  const wrapNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.WRAP)
    ? documentDOM.getElementsByClassName(`${prefix}-wrap-btn`)
    : undefined;

  const copyNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.COPY)
    ? documentDOM.getElementsByClassName(`${prefix}-copy-btn`)
    : undefined;

  const clearNavItemElements = specificNavItemsToPick.includes(TAB_PANE_NAV_ITEMS.CLEAR)
    ? documentDOM.getElementsByClassName(`${prefix}-clear-btn`)
    : undefined;

  return {
    validateNavItemElements,
    prettyNavItemElements,
    compactNavItemElements,
    foldNavItemElements,
    wrapNavItemElements,
    copyNavItemElements,
    clearNavItemElements
  };
}

module.exports = {
  TAB_PANE_NAV_ITEMS,
  getHtmlElements,
  getHtmlValidateNavItem,
  getHtmlPrettyNavItem,
  getHtmlCompactNavItem,
  getHtmlFoldNavItem,
  getHtmlWrapNavItem,
  getHtmlCopyNavItem,
  getHtmlClearNavItem
};
