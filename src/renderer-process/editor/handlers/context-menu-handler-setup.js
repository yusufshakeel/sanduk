'use strict';

const { clipboard } = require('electron');

const {
  CONTEXT_MENU_CUT_COPY_PASTE_SELECT_ALL_HTML_CONTAINER_ID,
  CONTEXT_MENU_EVENT_TYPE_CUT,
  CONTEXT_MENU_EVENT_TYPE_COPY,
  CONTEXT_MENU_EVENT_TYPE_PASTE,
  CONTEXT_MENU_EVENT_TYPE_SELECT_ALL
} = require('../../constants/editor-constants');
const ShowEditorCutCopyPasteSelectAllContextMenu = require('../../helpers/show-editor-cut-copy-paste-select-all-context-menu');
const ContextMenuHandler = require('./context-menu-handler');

module.exports = function contextMenuHandlerSetup({
  eventEmitter,
  contextMenuEventHandlerId,
  editors,
  getActiveTabId,
  documentDOM = document,
  electronClipboard = clipboard,
  contextMenuHandler = ContextMenuHandler,
  showEditorCutCopyPasteSelectAllContextMenu = ShowEditorCutCopyPasteSelectAllContextMenu
}) {
  // CONTEXT MENU setup
  editors.forEach(editor => {
    editor.container.addEventListener(
      'contextmenu',
      htmlEvent => {
        const element = documentDOM.getElementById(
          CONTEXT_MENU_CUT_COPY_PASTE_SELECT_ALL_HTML_CONTAINER_ID
        );
        element.setAttribute('data-eventData', JSON.stringify({ contextMenuEventHandlerId }));
        showEditorCutCopyPasteSelectAllContextMenu({ documentDOM, htmlEvent });
      },
      false
    );
  });

  // CUT - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_CUT, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuCutHandler({ getActiveTabId, editors, electronClipboard });
    }
  });

  // COPY - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_COPY, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuCopyHandler({ getActiveTabId, editors, electronClipboard });
    }
  });

  // PASTE - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_PASTE, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuPasteHandler({ getActiveTabId, editors, electronClipboard });
    }
  });

  // SELECT ALL - context menu event
  eventEmitter.on(CONTEXT_MENU_EVENT_TYPE_SELECT_ALL, args => {
    if (args.eventData.contextMenuEventHandlerId === contextMenuEventHandlerId) {
      contextMenuHandler.contextMenuSelectAllHandler({ getActiveTabId, editors });
    }
  });
};
