'use strict';
require('../../handlers/ipc/main-ipc');
const { BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

function MainBrowserWindow() {
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
    const windowState = windowStateKeeper({
      defaultWidth: 400,
      defaultHeight: 400
    });

    browserWindowInstance = new BrowserWindow({
      x: windowState.x,
      y: windowState.y,
      width: windowState.width,
      height: windowState.height,
      minWidth: 400,
      minHeight: 400,
      maxWidth: 400,
      maxHeight: 400,
      backgroundColor: '#25282c',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
      }
    });
    windowState.manage(browserWindowInstance);
    await browserWindowInstance.loadFile(__dirname + '/../../static/main.html');

    bootstrap();
  };
}

module.exports = MainBrowserWindow;
