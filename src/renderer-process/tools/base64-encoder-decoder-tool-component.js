'use strict';
const { clipboard } = require('electron');
const base64 = require('base-64');
const utf8 = require('utf8');

module.exports = function Base64EncoderDecoderToolComponent() {
  this.getHtml = () => {
    return `<!-- base64 encoder decoder -->
  <style>
    .sanduk-textarea-container {
      resize: vertical; 
      font-size: 1em;
      height: 25vh;
    }
  </style>
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">Base64 Encoder Decoder</p>
    </div>
  </div>
  <div class="row">
    <div id="base64-encoder-container" class="col-6 p-5">
      <h5>Encode</h5>
      <div class="form-group">
        <label for="plain-text-input">Plain Text</label>
        <textarea class="form-control sanduk-textarea-container" id="plain-text-input"></textarea>
      </div>
      <div id="plain-text-message"></div>

      <button id="encode-btn" class="btn btn-rounded btn-primary sanduk-tool-btn mb-10">Encode</button>

      <div class="form-group">
        <label for="base64-encoded-output">Base64 Encoded</label>
        <textarea class="form-control sanduk-textarea-container" id="base64-encoded-output"></textarea>
      </div>

      <button id="copy-encoded-btn" class="btn btn-rounded btn-secondary sanduk-tool-btn">Copy</button>
      <button id="clear-encoded-btn" class="btn btn-rounded btn-default sanduk-tool-btn float-right">Clear</button>
    </div>

    <div id="base64-decoder-container" class="col-6 p-5">
      <h5>Decode</h5>
      <div class="form-group">
        <label for="base64-encoded-input">Base64 Encoded</label>
        <textarea class="form-control sanduk-textarea-container" id="base64-encoded-input"></textarea>
      </div>
      <div id="base64-encode-message"></div>

      <button id="decode-btn" class="btn btn-rounded btn-primary sanduk-tool-btn mb-10">Decode</button>

      <div class="form-group">
        <label for="plain-text-output">Plain Text</label>
        <textarea class="form-control sanduk-textarea-container" id="plain-text-output"></textarea>
      </div>

      <button id="copy-decoded-btn" class="btn btn-rounded btn-secondary sanduk-tool-btn">Copy</button>
      <button id="clear-decoded-btn" class="btn btn-rounded btn-default sanduk-tool-btn float-right">Clear</button>
    </div>
  </div>`;
  };

  this.init = () => {
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
        copyEncodedBtn.innerText = 'Copy';
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
        copyDecodedBtn.innerText = 'Copy';
      }, 200);
    });
  };
};
