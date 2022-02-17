'use strict';

const fs = require('fs');
const path = require('path');
const { clipboard } = require('electron');
const base64 = require('base-64');
const utf8 = require('utf8');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const inProgressTextAnimate = require('../../helpers/in-progress-text-animate');

module.exports = function base64EncoderDecoder() {
  document.getElementById('v-pills-base64-encoder-decoder').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

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

  encodeBtn.addEventListener('click', () => {
    try {
      clearContent(plainTextMessage);
      const input = plainTextInput.value.trim();
      base64EncodedOutput.value = base64.encode(utf8.encode(input));
    } catch (e) {
      popError(plainTextMessage, e.message);
    }
  });

  clearEncodedBtn.addEventListener('click', () => {
    clearContent(plainTextMessage);
    plainTextInput.value = '';
    base64EncodedOutput.value = '';
  });

  copyEncodedBtn.addEventListener('click', () => {
    if (!base64EncodedOutput.value.trim().length) {
      return;
    }
    inProgressTextAnimate(copyEncodedBtn, 'Copy', 'Copied!', 200);
    clipboard.writeText(base64EncodedOutput.value);
  });

  decodeBtn.addEventListener('click', () => {
    try {
      clearContent(base64EncodeMessage);
      const input = base64EncodedInput.value.trim();
      plainTextOutput.value = utf8.decode(base64.decode(input));
    } catch (e) {
      popError(base64EncodeMessage, e.message);
    }
  });

  clearDecodedBtn.addEventListener('click', () => {
    clearContent(base64EncodeMessage);
    plainTextOutput.value = '';
    base64EncodedInput.value = '';
  });

  copyDecodedBtn.addEventListener('click', () => {
    if (!plainTextOutput.value.trim().length) {
      return;
    }
    inProgressTextAnimate(copyDecodedBtn, 'Copy', 'Copied!', 200);
    clipboard.writeText(plainTextOutput.value);
  });
};
