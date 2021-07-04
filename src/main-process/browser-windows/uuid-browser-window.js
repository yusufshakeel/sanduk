'use strict';
const { BrowserWindow } = require('electron');

let uuidWindow;

async function UUIDBrowserWindow() {
  uuidWindow = new BrowserWindow({
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true
    }
  });
  await uuidWindow.loadFile(__dirname + '/../../static/uuid.html');
  return uuidWindow;
}

module.exports = UUIDBrowserWindow;
