'use strict';
const {ipcRenderer} = require('electron');

const btnToolUUIDV4 = document.getElementById('tool-uuid-v4');

btnToolUUIDV4.addEventListener('click', e => {
  console.log('i was clicked', e);
  ipcRenderer.send('launch-uuid-browser-window');
  e.preventDefault();
});
