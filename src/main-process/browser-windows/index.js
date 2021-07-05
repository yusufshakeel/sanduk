'use strict';
const MainBrowserWindow = require('./main-browser-window');
const UUIDV4BrowserWindow = require('./uuid-v4-browser-window');
const UUIDV5BrowserWindow = require('./uuid-v5-browser-window');
const JWTDecoderBrowserWindow = require('./jwt-decoder-browser-window');
const Base64EncodeBrowserWindow = require('./base64-encode-browser-window');
const Base64DecodeBrowserWindow = require('./base64-decode-browser-window');

function appBrowserWindows() {
  return {
    mainBrowserWindow: new MainBrowserWindow(),
    uuidV4BrowserWindow: new UUIDV4BrowserWindow(),
    uuidV5BrowserWindow: new UUIDV5BrowserWindow(),
    jwtDecoderBrowserWindow: new JWTDecoderBrowserWindow(),
    base64EncodeBrowserWindow: new Base64EncodeBrowserWindow(),
    base64DecodeBrowserWindow: new Base64DecodeBrowserWindow()
  };
}

module.exports = appBrowserWindows;
