'use strict';
const { BrowserWindow } = require('electron');

function UUIDV4BrowserWindow() {
  let browserWindowInstance = null;

  this.getBrowserWindowInstance = () => browserWindowInstance;

  const bootstrap = () => {
    browserWindowInstance.on('closed', () => {
      browserWindowInstance = null;
    });

    // for dev work
    // browserWindowInstance.webContents.openDevTools()
  };

  this.createWindow = async () => {
    browserWindowInstance = new BrowserWindow({
      width: 600,
      height: 240,
      minWidth: 600,
      minHeight: 240,
      maxWidth: 600,
      maxHeight: 240,
      backgroundColor: '#25282c',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
      }
    });

    await browserWindowInstance.loadFile(__dirname + '/../../static/uuid-v4.html');

    bootstrap();
  };
}

module.exports = UUIDV4BrowserWindow;
