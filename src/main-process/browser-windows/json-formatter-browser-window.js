'use strict';
const { BrowserWindow } = require('electron');

function JSONFormatterBrowserWindow() {
  let browserWindowInstance = null;

  this.getBrowserWindowInstance = () => browserWindowInstance;

  const bootstrap = () => {
    browserWindowInstance.on('closed', () => {
      browserWindowInstance = null;
    });

    // for dev work
    // browserWindowInstance.webContents.openDevTools();
  };

  this.createWindow = async () => {
    browserWindowInstance = new BrowserWindow({
      width: 1000,
      height: 680,
      minWidth: 640,
      minHeight: 680,
      backgroundColor: '#25282c',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
      }
    });

    await browserWindowInstance.loadFile(__dirname + '/../../static/json-formatter.html');

    bootstrap();
  };
}

module.exports = JSONFormatterBrowserWindow;
