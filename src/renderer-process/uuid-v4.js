'use strict';
const { clipboard } = require('electron');
const { v4: uuidV4 } = require('uuid');

const btnGenerateUUIDV4 = document.getElementById('generate-uuid-v4-btn');
const btnCopyUUIDV4 = document.getElementById('copy-uuid-v4-btn');
const uuidV4Output = document.getElementById('uuid-v4-output');

function updateUUIDV4() {
  uuidV4Output.innerText = uuidV4();
}

setTimeout(updateUUIDV4, 100);

btnGenerateUUIDV4.addEventListener('click', updateUUIDV4);

btnCopyUUIDV4.addEventListener('click', () => {
  if (!uuidV4Output.innerText.trim().length) {
    return;
  }
  btnCopyUUIDV4.innerText = 'Copied!';
  clipboard.writeText(uuidV4Output.innerText);
  setTimeout(() => {
    btnCopyUUIDV4.innerText = 'Copy';
  }, 200);
});
