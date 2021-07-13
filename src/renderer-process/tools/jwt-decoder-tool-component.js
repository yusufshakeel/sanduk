'use strict';
const jwtDecode = require('jwt-decode');

module.exports = function JwtDecoderToolComponent() {
  this.getHtml = () => {
    return `<!-- jwt decoder -->
  <style>
    textarea#jwt-decoder-input {
      resize: vertical;
      font-size: 1em;
    }
    
    #jwt-decoder-decoded-header,
    #jwt-decoder-decoded-payload {
      overflow-y: scroll;
      -webkit-user-select: text;
      height: max-content;
      min-height: 100px;
      max-height: 400px;
      padding: 5px 5px 10px 5px;
      margin: 0;
      font-size: 1em;
    }
  </style>
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">JSON Web Token Decoder</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="form-group">
        <label for="jwt-decoder-input">JWT</label>
        <textarea class="form-control" id="jwt-decoder-input"></textarea>
      </div>
      <div id="jwt-decoder-input-message"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <label for="jwt-decoder-decoded-header">Header</label>
        <pre class="form-control" id="jwt-decoder-decoded-header"></pre>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <label for="jwt-decoder-decoded-payload">Payload</label>
        <pre class="form-control" id="jwt-decoder-decoded-payload"></pre>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <button id="jwt-decoder-decode-btn" class="btn btn-rounded btn-primary sanduk-tool-btn">Decode</button>
      <button id="jwt-deocder-clear-btn" class="btn btn-rounded btn-default sanduk-tool-btn">Clear</button>
    </div>
  </div>`;
  };

  this.init = () => {
    const jwtInput = document.getElementById('jwt-decoder-input');
    const jwtInputMessage = document.getElementById('jwt-decoder-input-message');
    const jwtDecodedPayload = document.getElementById('jwt-decoder-decoded-payload');
    const jwtDecodedHeader = document.getElementById('jwt-decoder-decoded-header');
    const decodeJWTBtn = document.getElementById('jwt-decoder-decode-btn');
    const clearJWTBtn = document.getElementById('jwt-deocder-clear-btn');

    function hideError() {
      jwtInputMessage.innerHTML = '';
    }

    function showError(message) {
      jwtInputMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
      setTimeout(hideError, 5000);
    }

    decodeJWTBtn.addEventListener('click', () => {
      try {
        hideError();
        const input = jwtInput.value.trim();
        if (!input.length) {
          return;
        }
        const decodedHeader = jwtDecode(input, { header: true });
        const decodedJWT = jwtDecode(input);
        jwtDecodedHeader.innerText = JSON.stringify(decodedHeader, null, 2);
        jwtDecodedPayload.innerText = JSON.stringify(decodedJWT, null, 2);
        const heightOfJwtDecodedHeader = jwtDecodedHeader.offsetHeight;
        const heightOfjwtDecodedPayload = jwtDecodedPayload.offsetHeight;
        const maxHeight =
          heightOfJwtDecodedHeader > heightOfjwtDecodedPayload
            ? heightOfJwtDecodedHeader
            : heightOfjwtDecodedPayload;
        jwtDecodedHeader.style.height = `${maxHeight}px`;
        jwtDecodedPayload.style.height = `${maxHeight}px`;
      } catch (e) {
        showError(e.message);
      }
    });

    clearJWTBtn.addEventListener('click', () => {
      hideError();
      jwtInput.value = '';
      jwtDecodedHeader.innerText = '';
      jwtDecodedPayload.innerText = '';
    });
  };
};
