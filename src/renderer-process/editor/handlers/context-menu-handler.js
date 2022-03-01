'use strict';

const { clipboard } = require('electron');

function contextMenuCutHandler({ getActiveTabId, editors, electronClipboard = clipboard }) {
  const activeTabId = getActiveTabId();
  const editor = editors[activeTabId - 1];
  electronClipboard.writeText(editor.getCopyText());
  editor.insert('');
}

function contextMenuCopyHandler({ getActiveTabId, editors, electronClipboard = clipboard }) {
  const activeTabId = getActiveTabId();
  const editor = editors[activeTabId - 1];
  electronClipboard.writeText(editor.getCopyText());
}

function contextMenuPasteHandler({ getActiveTabId, editors, electronClipboard = clipboard }) {
  const activeTabId = getActiveTabId();
  const editor = editors[activeTabId - 1];
  editor.session.insert(editor.getCursorPosition(), electronClipboard.readText());
}

function contextMenuSelectAllHandler({ getActiveTabId, editors }) {
  const activeTabId = getActiveTabId();
  editors[activeTabId - 1].selectAll();
}

module.exports = {
  contextMenuCutHandler,
  contextMenuCopyHandler,
  contextMenuPasteHandler,
  contextMenuSelectAllHandler
};
