'use strict';
const { clipboard } = require('electron');
const base64 = require('base-64');
const utf8 = require('utf8');

const plainTextInput = document.getElementById('plain-text-input');
const plainTextMessage = document.getElementById('plain-text-message');
const base64EncodedOutput = document.getElementById('base64-encoded-output');
const encodeBtn = document.getElementById('encode-btn');
const clearEncodedBtn = document.getElementById('clear-encoded-btn');
const copyEncodedBtn = document.getElementById('copy-encoded-btn');

const plainTextOutput = document.getElementById('plain-text-output');
const base64EncodeMessage = document.getElementById('base64-encode-message');
const base64EncodedInput = document.getElementById('base64-encoded-input');
const decodeBtn = document.getElementById('decode-btn');
const clearDecodedBtn = document.getElementById('clear-decoded-btn');
const copyDecodedBtn = document.getElementById('copy-decoded-btn');

function hideError(element) {
  element.innerHTML = '';
}

function showError(element, message) {
  element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  setTimeout(() => hideError(element), 5000);
}

encodeBtn.addEventListener('click', () => {
  try {
    hideError(plainTextMessage);
    const input = plainTextInput.value.trim();
    base64EncodedOutput.value = base64.encode(utf8.encode(input));
  } catch (e) {
    showError(plainTextMessage, e.message);
  }
});

clearEncodedBtn.addEventListener('click', () => {
  hideError(plainTextMessage);
  plainTextInput.value = '';
  base64EncodedOutput.value = '';
});

copyEncodedBtn.addEventListener('click', () => {
  if (!base64EncodedOutput.value.trim().length) {
    return;
  }
  copyEncodedBtn.innerText = 'Copied!';
  clipboard.writeText(base64EncodedOutput.value);
  setTimeout(() => {
    copyEncodedBtn.innerText = 'Copy Encoded';
  }, 200);
});

decodeBtn.addEventListener('click', () => {
  try {
    hideError(base64EncodeMessage);
    const input = base64EncodedInput.value.trim();
    plainTextOutput.value = utf8.decode(base64.decode(input));
  } catch (e) {
    showError(base64EncodeMessage, e.message);
  }
});

clearDecodedBtn.addEventListener('click', () => {
  hideError(base64EncodeMessage);
  plainTextOutput.value = '';
  base64EncodedInput.value = '';
});

copyDecodedBtn.addEventListener('click', () => {
  if (!plainTextOutput.value.trim().length) {
    return;
  }
  copyDecodedBtn.innerText = 'Copied!';
  clipboard.writeText(plainTextOutput.value);
  setTimeout(() => {
    copyDecodedBtn.innerText = 'Copy Decoded';
  }, 200);
});
