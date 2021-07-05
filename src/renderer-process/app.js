'use strict';
const { ipcRenderer } = require('electron');
const {
  CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW,
  CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW
} = require('../constants/channel-constants');

const openUUIDV4BrowserWindowBtnElement = document.getElementById(
  'open-uuid-v4-browser-window-btn'
);
const openUUIDV5BrowserWindowBtnElement = document.getElementById(
  'open-uuid-v5-browser-window-btn'
);

openUUIDV4BrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_UUID_V4_BROWSER_WINDOW);
});

openUUIDV5BrowserWindowBtnElement.addEventListener('click', () => {
  ipcRenderer.send(CHANNEL_LAUNCH_UUID_V5_BROWSER_WINDOW);
});
