'use strict';
const { dialog, ipcMain } = require('electron');
const messageDialog = require('./dialog/message-dialog');

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
  const msgDialog = messageDialog(browserWindow);

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_JSON, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectJsonFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveJsonFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_XML, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectXmlFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_XML_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_XML, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveXmlFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_XML_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_EDITOR, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_EDITOR_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_FILE_DIALOG_MARKDOWN, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectMarkdownFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });

  ipcMain.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveMarkdownFile();
      if (result.filePath) {
        event.reply(CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH, {
          filePath: result.filePath
        });
      }
    } catch (e) {
      await showErrorDialog(e);
    }
  });
};
