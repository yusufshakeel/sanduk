'use strict';
const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');
const fileManagement = require('./file-management');
const applicationMenu = require('./application-menu');

// global variable to prevent it from getting garbage collected.
let mainWindow;

function createWindow() {
  const windowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 800,
    minHeight: 500,
    backgroundColor: '#25282c',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // for dev work
  // mainWindow.webContents.openDevTools();

  windowState.manage(mainWindow);

  mainWindow.loadFile(__dirname + '/../static/app.html');

  fileManagement(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  applicationMenu();
  createWindow();
});

// Quit the app when all windows are closed. Not for macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When app icon is clicked and app is running then recreate BrowserWindow (macOS)
app.on('activate', async () => {
  if (!mainWindow) {
    createWindow();
  }
});
