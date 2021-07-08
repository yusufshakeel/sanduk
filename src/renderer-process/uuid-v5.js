'use strict';
const { clipboard } = require('electron');
const { v5: uuidV5 } = require('uuid');

const uuidV5Name = document.getElementById('uuid-v5-name');
const uuidV5Namespace = document.getElementById('uuid-v5-namespace');
const uuidV5NamespaceMessage = document.getElementById('uuid-v5-namespace-message');
const btnGenerateUUIDV5 = document.getElementById('generate-uuid-v5-btn');
const btnCopyUUIDV5 = document.getElementById('copy-uuid-v5-btn');
const btnClearUUIDV5 = document.getElementById('clear-uuid-v5-btn');
const uuidV5Output = document.getElementById('uuid-v5-output');

function hideError() {
  uuidV5NamespaceMessage.innerHTML = '';
}

function showError(message) {
  uuidV5NamespaceMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  setTimeout(hideError, 5000);
}

btnGenerateUUIDV5.addEventListener('click', () => {
  try {
    hideError();
    if (!uuidV5Namespace.value.trim().length) {
      showError('Namespace required.');
      return;
    }
    uuidV5Output.innerText = uuidV5(uuidV5Name.value, uuidV5Namespace.value);
  } catch (e) {
    showError(e.message);
  }
});

btnCopyUUIDV5.addEventListener('click', () => {
  if (!uuidV5Output.innerText.trim().length) {
    return;
  }
  btnCopyUUIDV5.innerText = 'Copied!';
  clipboard.writeText(uuidV5Output.innerText);
  setTimeout(() => {
    btnCopyUUIDV5.innerText = 'Copy';
  }, 200);
});

btnClearUUIDV5.addEventListener('click', () => {
  hideError();
  uuidV5Output.innerText = ' ';
  uuidV5Name.value = '';
  uuidV5Namespace.value = '';
});
