'use strict';
const { clipboard } = require('electron');
const base64 = require('base-64');
const utf8 = require('utf8');

const plainText = document.getElementById('plain-text');
const base64EncodeMessage = document.getElementById('base64-encode-message');
const base64Encoded = document.getElementById('base64-encoded');
const decodeBtn = document.getElementById('decode-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

function hideError() {
  base64EncodeMessage.innerHTML = '';
}

function showError(message) {
  base64EncodeMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}

decodeBtn.addEventListener('click', () => {
  try {
    hideError();
    const input = base64Encoded.value.trim();
    plainText.value = utf8.decode(base64.decode(input));
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
  if (!plainText.value.trim().length) {
    return;
  }
  copyBtn.innerText = 'Copied!';
  clipboard.writeText(plainText.value);
  setTimeout(() => {
    copyBtn.innerText = 'Copy';
  }, 200);
});
