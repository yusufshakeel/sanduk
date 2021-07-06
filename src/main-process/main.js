'use strict';
const { app } = require('electron');
const applicationMenu = require('./application-menu');
const appBrowserWindows = require('./browser-windows')();
const ipcHandler = require('../handlers/ipc');

app.whenReady().then(async () => {
  await applicationMenu();
  await appBrowserWindows.mainBrowserWindow.createWindow();
  ipcHandler({ appBrowserWindows });
});

// Quit the app when all windows are closed. Not for macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When app icon is clicked and app is running then recreate BrowserWindow (macOS)
app.on('activate', async () => {
  if (!appBrowserWindows.mainBrowserWindow.getBrowserWindowInstance()) {
    await appBrowserWindows.mainBrowserWindow.createWindow();
  }
});
