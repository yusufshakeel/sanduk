'use strict';

const TAB_PANE_NAV_ITEMS = {
  CLEAR: 'CLEAR',
  CLOSE: 'CLOSE',
  COMPACT: 'COMPACT',
  COPY: 'COPY',
  FOLD: 'FOLD',
  PRETTY: 'PRETTY',
  SORT_ASCENDING: 'SORT_ASCENDING',
  SORT_DESCENDING: 'SORT_DESCENDING',
  TRANSFORM: 'TRANSFORM',
  VALIDATE: 'VALIDATE',
  WRAP: 'WRAP'
};

const tabPaneNavItemToClassNameMapper = ({ prefix }) => ({
  CLEAR: { key: 'clearNavItemElements', className: `${prefix}-clear-btn` },
  CLOSE: { key: 'closeNavItemElements', className: `${prefix}-close-btn` },
  COMPACT: { key: 'compactNavItemElements', className: `${prefix}-compact-btn` },
  COPY: { key: 'copyNavItemElements', className: `${prefix}-copy-btn` },
  FOLD: { key: 'foldNavItemElements', className: `${prefix}-fold-btn` },
  PRETTY: { key: 'prettyNavItemElements', className: `${prefix}-pretty-btn` },
  SORT_ASCENDING: {
    key: 'sortAscendingNavItemElements',
    className: `${prefix}-sort-ascending-btn`
  },
  SORT_DESCENDING: {
    key: 'sortDescendingNavItemElements',
    className: `${prefix}-sort-descending-btn`
  },
  TRANSFORM: { key: 'transformNavItemElements', className: `${prefix}-transform-btn` },
  VALIDATE: { key: 'validateNavItemElements', className: `${prefix}-validate-btn` },
  WRAP: { key: 'wrapNavItemElements', className: `${prefix}-wrap-btn` }
});

function getHtmlValidateNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).VALIDATE.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Validate" class="bi-check2-square"></i></a>
</li>`;
}

function getHtmlPrettyNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).PRETTY.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Pretty" class="bi-emoji-smile"></i></a>
</li>`;
}

function getHtmlCompactNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).COMPACT.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Compact" class="bi-justify-left"></i></a>
</li>`;
}

function getHtmlFoldNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).FOLD.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Fold" class="bi-arrows-collapse"></i></a>
</li>`;
}

function getHtmlWrapNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).WRAP.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}" data-wrap="no"><i title="Wrap" class="bi-body-text"></i></a>
</li>`;
}

function getHtmlCopyNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).COPY.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Copy" class="bi-clipboard"></i></a>
</li>`;
}

function getHtmlClearNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).CLEAR.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Erase" class="bi-eraser"></i></a>
</li>`;
}

function getHtmlSortAscendingNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).SORT_ASCENDING.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Ascending sort" class="bi-sort-alpha-down"></i></a>
</li>`;
}

function getHtmlSortDescendingNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).SORT_DESCENDING.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Descending sort" class="bi-sort-alpha-down-alt"></i></a>
</li>`;
}

function getHtmlTransformNavItem({ prefix, dataId, title = 'Transform' }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).TRANSFORM.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="${title}" class="bi-wrench-adjustable"></i></a>
</li>`;
}

function getHtmlCloseNavItem({ prefix, dataId }) {
  const className = tabPaneNavItemToClassNameMapper({ prefix }).CLOSE.className;
  return `<li class="nav-item">
  <a class="nav-link py-0 ${className}" data-id="${dataId}"><i title="Close" class="bi-x-lg"></i></a>
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
  return specificNavItemsToPick.reduce((result, navItem) => {
    const v = tabPaneNavItemToClassNameMapper({ prefix })[navItem];
    return { ...result, [v.key]: documentDOM.getElementsByClassName(v.className) };
  }, {});
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
  getHtmlClearNavItem,
  getHtmlSortAscendingNavItem,
  getHtmlSortDescendingNavItem,
  getHtmlTransformNavItem,
  getHtmlCloseNavItem
};
