'use strict';
const { app, BrowserWindow } = require('electron');
const applicationMenu = require('./application-menu');

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 400,
    backgroundColor: '#fff'
  });
  mainWindow.loadFile(__dirname + '/../static/main.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  applicationMenu();
  createMainWindow();
});

// Quit the app when all windows are closed. Not for macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When app icon is clicked and app is running then recreate BrowserWindow (macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
