'use strict';
const { BrowserWindow } = require('electron');

function Base64EncoderDecoderBrowserWindow() {
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
      height: 640,
      minWidth: 600,
      minHeight: 640,
      backgroundColor: '#25282c',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
      }
    });

    await browserWindowInstance.loadFile(__dirname + '/../../static/base64-encoder-decoder.html');

    bootstrap();
  };
}

module.exports = Base64EncoderDecoderBrowserWindow;
