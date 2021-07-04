'use strict';
const {ipcRenderer} = require('electron');

const btnToolUUID = document.getElementById('tool-uuid');

btnToolUUID.addEventListener('click', e => {
  console.log('i was clicked', e);
  ipcRenderer.send('launch-uuid-browser-window');
  e.preventDefault();
});
