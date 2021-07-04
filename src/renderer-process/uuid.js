'use strict';
const {ipcRenderer, clipboard} = require('electron');

const btnGenerateUUIDV4 = document.getElementById('generate-uuid-v4-btn');
const btnCopyUUIDV4 = document.getElementById('copy-uuid-v4-btn');
const uuidV4Output = document.getElementById('uuid-v4-output');

btnGenerateUUIDV4.addEventListener('click', () => {
  ipcRenderer.send('create-uuid-v4');
});

btnCopyUUIDV4.addEventListener('click', () => {
  btnCopyUUIDV4.innerText = 'Copied!';
  clipboard.writeText(uuidV4Output.innerText);
  setTimeout(() => {
    btnCopyUUIDV4.innerText = 'Copy';
  }, 200);
});

ipcRenderer.on('created-uuid-v4', (e, args) => {
  uuidV4Output.innerText = args.data.uuid;
});
