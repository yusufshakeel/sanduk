'use strict';
const { dialog, ipcMain } = require('electron');
const {
  CHANNEL_OPEN_FILE_DIALOG_JSON,
  CHANNEL_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH,

  CHANNEL_OPEN_FILE_DIALOG_XML,
  CHANNEL_OPEN_FILE_DIALOG_XML_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_XML,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_XML_FILE_PATH,

  CHANNEL_OPEN_FILE_DIALOG_EDITOR,
  CHANNEL_OPEN_FILE_DIALOG_EDITOR_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH,

  CHANNEL_OPEN_FILE_DIALOG_MARKDOWN,
  CHANNEL_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH
} = require('./constants/channel-constants');

module.exports = function fileManagement(browserWindow) {
  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_JSON, async event => {
    try {
      const result = await dialog.showOpenDialog(browserWindow, {
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openFile', 'openDirectory']
      });
      if (!result.canceled && result.filePaths.length) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePaths[0] });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON, async event => {
    try {
      const result = await dialog.showSaveDialog(browserWindow, {
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openDirectory']
      });
      if (!result.canceled && result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_XML, async event => {
    try {
      const result = await dialog.showOpenDialog(browserWindow, {
        filters: [{ name: 'XML', extensions: ['xml'] }],
        properties: ['openFile', 'openDirectory']
      });
      if (!result.canceled && result.filePaths.length) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_XML_FILE_PATH, { filePath: result.filePaths[0] });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_XML, async event => {
    try {
      const result = await dialog.showSaveDialog(browserWindow, {
        filters: [{ name: 'XML', extensions: ['xml'] }],
        properties: ['openDirectory']
      });
      if (!result.canceled && result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_XML_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_EDITOR, async event => {
    try {
      const result = await dialog.showOpenDialog(browserWindow, {
        properties: ['openFile', 'openDirectory']
      });
      if (!result.canceled && result.filePaths.length) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_EDITOR_FILE_PATH, { filePath: result.filePaths[0] });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR, async event => {
    try {
      const result = await dialog.showSaveDialog(browserWindow, {
        properties: ['openDirectory']
      });
      if (!result.canceled && result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_MARKDOWN, async event => {
    try {
      const result = await dialog.showOpenDialog(browserWindow, {
        filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
        properties: ['openFile', 'openDirectory']
      });
      if (!result.canceled && result.filePaths.length) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH, { filePath: result.filePaths[0] });
      }
    } catch (e) {
      //
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN, async event => {
    try {
      const result = await dialog.showSaveDialog(browserWindow, {
        properties: ['openDirectory']
      });
      if (!result.canceled && result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH, {
          filePath: result.filePath
        });
      }
    } catch (e) {
      //
    }
  });
};
