'use strict';
const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const applicationMenu = require('./application-menu');
const uuidBrowserWindow = require('./browser-windows/uuid-browser-window');

let mainWindow;
let uuidWindow;

ipcMain.on('launch-uuid-browser-window', async () => {
  if (!uuidWindow) {
    uuidWindow = await uuidBrowserWindow();
    uuidWindow.on('closed', () => {
      uuidWindow = null;
    });
  } else {
    uuidWindow.focus();
  }
});

const createMainWindow = async () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 400
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 400,
    minHeight: 400,
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: '#fff',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  mainWindowState.manage(mainWindow);
  await mainWindow.loadFile(__dirname + '/../static/main.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // for dev work
  // mainWindow.webContents.openDevTools()
};

app.whenReady().then(async () => {
  await createMainWindow();
  await applicationMenu();
});

// Quit the app when all windows are closed. Not for macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When app icon is clicked and app is running then recreate BrowserWindow (macOS)
app.on('activate', async () => {
  if (mainWindow === null) {
    await createMainWindow();
  }
});
