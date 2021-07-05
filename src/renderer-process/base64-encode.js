'use strict';
const { clipboard } = require('electron');
const base64 = require('base-64');
const utf8 = require('utf8');

const plainText = document.getElementById('plain-text');
const plainTextMessage = document.getElementById('plain-text-message');
const base64Encoded = document.getElementById('base64-encoded');
const encodeBtn = document.getElementById('encode-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

function hideError() {
  plainTextMessage.innerHTML = '';
}

function showError(message) {
  plainTextMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}

encodeBtn.addEventListener('click', () => {
  try {
    hideError();
    const input = plainText.value.trim();
    base64Encoded.value = base64.encode(utf8.encode(input));
  } catch (e) {
    showError(e.message);
  }
});

clearBtn.addEventListener('click', () => {
  hideError();
  plainText.value = '';
  base64Encoded.value = '';
});

copyBtn.addEventListener('click', () => {
  if (!base64Encoded.value.trim().length) {
    return;
  }
  copyBtn.innerText = 'Copied!';
  clipboard.writeText(base64Encoded.value);
  setTimeout(() => {
    copyBtn.innerText = 'Copy';
  }, 200);
});
