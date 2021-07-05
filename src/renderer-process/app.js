'use strict';
const { ipcRenderer } = require('electron');
const {
  CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW,
  CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW,
  CHANNEL_LAUNCH_JWT_DECODER_BROWSER_WINDOW,
  CHANNEL_LAUNCH_BASE64_ENCODE_BROWSER_WINDOW,
  CHANNEL_LAUNCH_BASE64_DECODE_BROWSER_WINDOW
} = require('../constants/channel-constants');

const openUUIDV4BrowserWindowBtnElement = document.getElementById(
  'open-uuid-v4-browser-window-btn'
);
const openUUIDV5BrowserWindowBtnElement = document.getElementById(
  'open-uuid-v5-browser-window-btn'
);
const openJWTDecoderBrowserWindowBtnElement = document.getElementById(
  'open-jwt-decoder-browser-window-btn'
);
const openBase64EncodeBrowserWindowBtnElement = document.getElementById(
  'open-base64-encode-browser-window-btn'
);
const openBase64DecodeBrowserWindowBtnElement = document.getElementById(
  'open-base64-decode-browser-window-btn'
);

openUUIDV4BrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW);
});

openUUIDV5BrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW);
});

openJWTDecoderBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_JWT_DECODER_BROWSER_WINDOW);
});

openBase64EncodeBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_BASE64_ENCODE_BROWSER_WINDOW);
});

openBase64DecodeBrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_BASE64_DECODE_BROWSER_WINDOW);
});
