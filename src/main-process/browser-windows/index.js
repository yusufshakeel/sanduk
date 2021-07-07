'use strict';
const MainBrowserWindow = require('./main-browser-window');
const UUIDV4BrowserWindow = require('./uuid-v4-browser-window');
const UUIDV5BrowserWindow = require('./uuid-v5-browser-window');
const JWTDecoderBrowserWindow = require('./jwt-decoder-browser-window');
const Base64EncoderDecoderBrowserWindow = require('./base64-encoder-decoder-browser-window');
const EpochBrowserWindow = require('./epoch-browser-window');
const JSONFormatterBrowserWindow = require('./json-formatter-browser-window');
const XMLFormatterBrowserWindow = require('./xml-formatter-browser-window');

function appBrowserWindows() {
  return {
    mainBrowserWindow: new MainBrowserWindow(),
    uuidV4BrowserWindow: new UUIDV4BrowserWindow(),
    uuidV5BrowserWindow: new UUIDV5BrowserWindow(),
    jwtDecoderBrowserWindow: new JWTDecoderBrowserWindow(),
    base64EncoderDecoderBrowserWindow: new Base64EncoderDecoderBrowserWindow(),
    epochBrowserWindow: new EpochBrowserWindow(),
    jsonFormatterBrowserWindow: new JSONFormatterBrowserWindow(),
    xmlFormatterBrowserWindow: new XMLFormatterBrowserWindow()
  };
}

module.exports = appBrowserWindows;
