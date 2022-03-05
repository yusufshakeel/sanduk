'use strict';
const { ipcMain, dialog } = require('electron');
const messageDialog = require('./dialogs/message-dialog');

const {
  IPC_EVENT_OPEN_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH,

  IPC_EVENT_OPEN_FILE_DIALOG_XML,
  IPC_EVENT_OPEN_FILE_DIALOG_XML_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_XML,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_XML_FILE_PATH,

  IPC_EVENT_OPEN_FILE_DIALOG_EDITOR,
  IPC_EVENT_OPEN_FILE_DIALOG_EDITOR_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH,

  IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN,
  IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH,

  IPC_EVENT_OPEN_FILE_DIALOG_CANVAS,
  IPC_EVENT_OPEN_FILE_DIALOG_CANVAS_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS_FILE_PATH,

  IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES,
  IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES_USER_OPTION_SELECTION
} = require('./constants/ipc-event-constants');

module.exports = function fileManagement(
  browserWindow,
  electronDialog = dialog,
  electronIpcMain = ipcMain
) {
  const msgDialog = messageDialog(browserWindow, electronDialog);

  electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_JSON, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectJsonFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveJsonFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_XML, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectXmlFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_FILE_DIALOG_XML_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_XML, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveXmlFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_XML_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_EDITOR, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_FILE_DIALOG_EDITOR_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH, {
          filePath: result.filePath
        });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectMarkdownFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveMarkdownFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH, {
          filePath: result.filePath
        });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_CANVAS, async event => {
    try {
      const result = await msgDialog.showOpenDialogToSelectCanvasFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_FILE_DIALOG_CANVAS_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS, async event => {
    try {
      const result = await msgDialog.showSaveDialogToSaveCanvasFile();
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_CANVAS_FILE_PATH, {
          filePath: result.filePath
        });
      }
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES, async event => {
    try {
      const buttons = ['Save', 'Ignore changes', 'Cancel'];
      const result = await msgDialog.showMessageBoxUnsavedChanges({
        type: 'question',
        buttons: ['Save', 'Ignore changes', 'Cancel'],
        message: 'Do you want to save the changes?'
      });
      event.reply(IPC_EVENT_OPEN_MESSAGE_BOX_UNSAVED_CHANGES_USER_OPTION_SELECTION, {
        buttons,
        clickedButtonIndex: result.response,
        clickedButton: buttons[result.response],
        clicked: {
          saveButton: result.response === 0,
          ignoreButton: result.response === 1,
          cancelButton: result.response === 2
        }
      });
    } catch (e) {
      await msgDialog.showErrorDialog(e);
    }
  });
};
