'use strict';
const { BrowserWindow, ipcMain } = require('electron');
const { v4: uuidV4 } = require('uuid');

let uuidWindow;

ipcMain.on('create-uuid-v4', e => {
  e.sender.send('created-uuid-v4', { data: { uuid: uuidV4() } });
});

async function UUIDBrowserWindow() {
  uuidWindow = new BrowserWindow({
    width: 600,
    height: 200,
    minWidth: 600,
    minHeight: 200,
    maxWidth: 600,
    maxHeight: 200,
    backgroundColor: '#fff',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  await uuidWindow.loadFile(__dirname + '/../../static/uuid.html');

  // for dev work
  // uuidWindow.webContents.openDevTools();

  return uuidWindow;
}

module.exports = UUIDBrowserWindow;
