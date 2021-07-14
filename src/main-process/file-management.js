'use strict';
const { dialog, ipcMain } = require('electron');
const {
  CHANNEL_OPEN_FILE_DIALOG_JSON,
  CHANNEL_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH
} = require('./constants/channel-constants');

module.exports = function fileManagement(browserWindow) {
  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_JSON, async event => {
    try {
      const result = await dialog.showOpenDialog(browserWindow, {
        title: 'Open File',
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
        title: 'Save File',
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
};