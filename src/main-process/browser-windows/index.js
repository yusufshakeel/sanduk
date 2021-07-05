'use strict';
const MainBrowserWindow = require('./main-browser-window');
const UUIDV4BrowserWindow = require('./uuid-v4-browser-window');
const UUIDV5BrowserWindow = require('./uuid-v5-browser-window');

function appBrowserWindows() {
  return {
    mainBrowserWindow: new MainBrowserWindow(),
    uuidV4BrowserWindow: new UUIDV4BrowserWindow(),
    uuidV5BrowserWindow: new UUIDV5BrowserWindow()
  };
}

module.exports = appBrowserWindows;
