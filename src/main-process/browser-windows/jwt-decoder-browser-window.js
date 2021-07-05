'use strict';
const { BrowserWindow } = require('electron');

function JWTDecoderBrowserWindow() {
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
      height: 500,
      minWidth: 600,
      minHeight: 500,
      backgroundColor: '#25282c',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
      }
    });

    await browserWindowInstance.loadFile(__dirname + '/../../static/jwt-decoder.html');

    bootstrap();
  };
}

module.exports = JWTDecoderBrowserWindow;
