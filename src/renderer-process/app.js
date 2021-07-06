'use strict';
const { ipcRenderer } = require('electron');
const {
  CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW,
  CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW,
  CHANNEL_LAUNCH_JWT_DECODER_BROWSER_WINDOW,
  CHANNEL_LAUNCH_BASE64_ENCODER_DECODER_DECODER_BROWSER_WINDOW,
  CHANNEL_LAUNCH_EPOCH_BROWSER_WINDOW,
  CHANNEL_LAUNCH_JSON_FORMATTER_BROWSER_WINDOW
} = require('../constants/channel-constants');

const openUUIDV4BrowserWindowBtnElement = document.getElementById(
  'open-uuid-v4-browser-window-btn'
);
const openUUIDV5BrowserWindowBtnElement = document.getElementById(
  'open-uuid-v5-browser-window-btn'
);
const openBase64EncoderDecoderBrowserWindowBtnElement = document.getElementById(
  'open-base64-encoder-decoder-browser-window-btn'
);
const openJWTDecoderBrowserWindowBtnElement = document.getElementById(
  'open-jwt-decoder-browser-window-btn'
);
const openEpochBrowserWindowBtnElement = document.getElementById('open-epoch-browser-window-btn');
const openJSONFormatterBrowserWindowBtnElement = document.getElementById(
  'open-json-formatter-browser-window-btn'
);

openUUIDV4BrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW);
});

openUUIDV5BrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW);
});

openBase64EncoderDecoderBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_BASE64_ENCODER_DECODER_DECODER_BROWSER_WINDOW);
});

openJWTDecoderBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_JWT_DECODER_BROWSER_WINDOW);
});

openEpochBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_EPOCH_BROWSER_WINDOW);
});

openJSONFormatterBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_JSON_FORMATTER_BROWSER_WINDOW);
});
