'use strict';
const { ipcMain } = require('electron');
const {
  CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW,
  CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW
} = require('../../constants/channel-constants');

function mainIpc({ appBrowserWindows }) {
  ipcMain.on(CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW, () => {
    if (!appBrowserWindows.uuidV4BrowserWindow.getBrowserWindowInstance()) {
      appBrowserWindows.uuidV4BrowserWindow.createWindow();
    } else {
      appBrowserWindows.uuidV4BrowserWindow.getBrowserWindowInstance().focus();
    }
  });

  ipcMain.on(CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW, () => {
    if (!appBrowserWindows.uuidV5BrowserWindow.getBrowserWindowInstance()) {
      appBrowserWindows.uuidV5BrowserWindow.createWindow();
    } else {
      appBrowserWindows.uuidV5BrowserWindow.getBrowserWindowInstance().focus();
    }
  });
}

module.exports = mainIpc;
