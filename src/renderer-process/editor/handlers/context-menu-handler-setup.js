'use strict';

const {
  CONTEXT_MENU_CUT_COPY_PASTE_SELECT_ALL_HTML_CONTAINER_ID,
  CONTEXT_MENU_EVENT_TYPE_CUT,
  CONTEXT_MENU_EVENT_TYPE_COPY,
  CONTEXT_MENU_EVENT_TYPE_PASTE,
  CONTEXT_MENU_EVENT_TYPE_SELECT_ALL
} = require('../../constants/editor-constants');
const showEditorCutCopyPasteSelectAllContextMenu = require('../../helpers/show-editor-cut-copy-paste-select-all-context-menu');
const contextMenuHandler = require('./context-menu-handler');

module.exports = function contextMenuHandlerSetup({
  eventEmitter,
  contextMenuEventHandlerId,
  editors,
  getActiveTabId
}) {
  // CONTEXT MENU setup
  editors.forEach(editor => {
    editor.container.addEventListener(
      'contextmenu',
      e => {
        const element = document.getElementById(
          CONTEXT_MENU_CUT_COPY_PASTE_SELECT_ALL_HTML_CONTAINER_ID
        );
        element.setAttribute('data-eventData', JSON.stringify({ contextMenuEventHandlerId }));
        showEditorCutCopyPasteSelectAllContextMenu({ htmlEvent: e });
      },
      false
    );
  });

  // CUT - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_CUT, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuCutHandler({ getActiveTabId, editors });
    }
  });

  // COPY - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_COPY, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuCopyHandler({ getActiveTabId, editors });
    }
  });

  // PASTE - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_PASTE, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuPasteHandler({ getActiveTabId, editors });
    }
  });

  // SELECT ALL - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_SELECT_ALL, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuSelectAllHandler({ getActiveTabId, editors });
    }
  });
};
