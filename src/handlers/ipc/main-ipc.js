'use strict';
const { ipcMain } = require('electron');
const {
  CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW,
  CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW,
  CHANNEL_LAUNCH_JWT_DECODER_BROWSER_WINDOW,
  CHANNEL_LAUNCH_BASE64_ENCODE_BROWSER_WINDOW,
  CHANNEL_LAUNCH_BASE64_DECODE_BROWSER_WINDOW
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

  ipcMain.on(CHANNEL_LAUNCH_JWT_DECODER_BROWSER_WINDOW, () => {
    if (!appBrowserWindows.jwtDecoderBrowserWindow.getBrowserWindowInstance()) {
      appBrowserWindows.jwtDecoderBrowserWindow.createWindow();
    } else {
      appBrowserWindows.jwtDecoderBrowserWindow.getBrowserWindowInstance().focus();
    }
  });

  ipcMain.on(CHANNEL_LAUNCH_BASE64_ENCODE_BROWSER_WINDOW, () => {
    if (!appBrowserWindows.base64EncodeBrowserWindow.getBrowserWindowInstance()) {
      appBrowserWindows.base64EncodeBrowserWindow.createWindow();
    } else {
      appBrowserWindows.base64EncodeBrowserWindow.getBrowserWindowInstance().focus();
    }
  });

  ipcMain.on(CHANNEL_LAUNCH_BASE64_DECODE_BROWSER_WINDOW, () => {
    if (!appBrowserWindows.base64DecodeBrowserWindow.getBrowserWindowInstance()) {
      appBrowserWindows.base64DecodeBrowserWindow.createWindow();
    } else {
      appBrowserWindows.base64DecodeBrowserWindow.getBrowserWindowInstance().focus();
    }
  });
}

module.exports = mainIpc;
