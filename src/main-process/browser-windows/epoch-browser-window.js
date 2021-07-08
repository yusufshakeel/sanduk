'use strict';
const { BrowserWindow } = require('electron');

function EpochBrowserWindow() {
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
      height: 600,
      minWidth: 600,
      minHeight: 600,
      maxWidth: 600,
      maxHeight: 600,
      backgroundColor: '#25282c',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
      }
    });

    await browserWindowInstance.loadFile(__dirname + '/../../static/epoch.html');

    bootstrap();
  };
}

module.exports = EpochBrowserWindow;
