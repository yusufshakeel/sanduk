'use strict';

const EditorContextMenuBuilder = require('../ui-components/builders/editor-context-menu-builder');
const {
  CONTEXT_MENU_EVENT_TYPE_CUT,
  CONTEXT_MENU_EVENT_TYPE_COPY,
  CONTEXT_MENU_EVENT_TYPE_PASTE,
  CONTEXT_MENU_EVENT_TYPE_SELECT_ALL
} = require('../constants/editor-constants');

module.exports = function ({ eventEmitter, documentDOM = document }) {
  const cutCopyPasteSelectAllPrefix = 'cutCopyPasteSelectAll';
  const cutCopyPasteSelectAllContextMenuHtml = new EditorContextMenuBuilder({
    prefix: cutCopyPasteSelectAllPrefix
  })
    .withCutMenuItem()
    .withCopyMenuItem()
    .withPasteMenuItem()
    .withSelectAllMenuItem()
    .build();
  documentDOM.getElementById('sanduk-context-menu-container').innerHTML +=
    cutCopyPasteSelectAllContextMenuHtml;

  const cutCopyPasteSelectAllContextMenuContainerElement = documentDOM.getElementById(
    `${cutCopyPasteSelectAllPrefix}-editor-context-menu-container`
  );

  // setting event emitter
  const menuItemAndEventConfig = [
    {
      id: `${cutCopyPasteSelectAllPrefix}-editor-context-menu-cut-btn`,
      eventType: CONTEXT_MENU_EVENT_TYPE_CUT
    },
    {
      id: `${cutCopyPasteSelectAllPrefix}-editor-context-menu-copy-btn`,
      eventType: CONTEXT_MENU_EVENT_TYPE_COPY
    },
    {
      id: `${cutCopyPasteSelectAllPrefix}-editor-context-menu-paste-btn`,
      eventType: CONTEXT_MENU_EVENT_TYPE_PASTE
    },
    {
      id: `${cutCopyPasteSelectAllPrefix}-editor-context-menu-select-all-btn`,
      eventType: CONTEXT_MENU_EVENT_TYPE_SELECT_ALL
    }
  ];

  menuItemAndEventConfig.forEach(config => {
    const { id, eventType } = config;
    documentDOM.getElementById(id).addEventListener('click', () => {
      const eventData = JSON.parse(
        cutCopyPasteSelectAllContextMenuContainerElement.getAttribute('data-eventData')
      );
      eventEmitter.emit(eventType, { eventData, eventType });
    });
  });
};
