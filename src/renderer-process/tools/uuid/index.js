'use strict';

const fs = require('fs');
const path = require('path');
const { clipboard } = require('electron');
const { v4: uuidV4, v5: uuidV5 } = require('uuid');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const inProgressTextAnimate = require('../../helpers/in-progress-text-animate');

function uuidV4Handler() {
  const btnGenerateUUIDV4 = document.getElementById('generate-uuid-v4-btn');
  const btnCopyUUIDV4 = document.getElementById('copy-uuid-v4-btn');
  const uuidV4Output = document.getElementById('uuid-v4-output');
  const btnClearUUIDV4 = document.getElementById('clear-uuid-v4-btn');

  btnGenerateUUIDV4.addEventListener('click', () => {
    uuidV4Output.value = uuidV4();
  });

  btnCopyUUIDV4.addEventListener('click', () => {
    if (!uuidV4Output.value.trim().length) {
      return;
    }
    inProgressTextAnimate(btnCopyUUIDV4, 'Copy', 'Copied!', 200);
    clipboard.writeText(uuidV4Output.value);
  });

  btnClearUUIDV4.addEventListener('click', () => {
    uuidV4Output.value = '';
  });
}

function uuidV5Handler() {
  const uuidV5Name = document.getElementById('uuid-v5-name');
  const uuidV5Namespace = document.getElementById('uuid-v5-namespace');
  const uuidV5NamespaceMessage = document.getElementById('uuid-v5-namespace-message');
  const btnGenerateUUIDV5 = document.getElementById('generate-uuid-v5-btn');
  const btnCopyUUIDV5 = document.getElementById('copy-uuid-v5-btn');
  const btnClearUUIDV5 = document.getElementById('clear-uuid-v5-btn');
  const uuidV5Output = document.getElementById('uuid-v5-output');

  btnGenerateUUIDV5.addEventListener('click', () => {
    try {
      clearContent(uuidV5NamespaceMessage);
      if (!uuidV5Namespace.value.trim().length) {
        popError(uuidV5NamespaceMessage, 'Namespace required.');
        return;
      }
      uuidV5Output.value = uuidV5(uuidV5Name.value, uuidV5Namespace.value);
    } catch (e) {
      popError(uuidV5NamespaceMessage, e.message);
    }
  });

  btnCopyUUIDV5.addEventListener('click', () => {
    if (!uuidV5Output.value.trim().length) {
      return;
    }
    inProgressTextAnimate(btnCopyUUIDV5, 'Copy', 'Copied!', 200);
    btnCopyUUIDV5.innerText = 'Copied!';
  });

  btnClearUUIDV5.addEventListener('click', () => {
    clearContent(uuidV5NamespaceMessage);
    uuidV5Output.value = '';
    uuidV5Name.value = '';
    uuidV5Namespace.value = '';
  });
}

module.exports = function uuid() {
  document.getElementById('v-pills-uuid').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  uuidV4Handler();
  uuidV5Handler();
};
