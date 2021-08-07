'use strict';
const jwtDecode = require('jwt-decode');

module.exports = function JwtDecoderToolComponent() {
  this.getHtml = () => {
    return `<!-- jwt decoder -->
  <style>
    textarea#jwt-decoder-input {
      resize: vertical;
      font-size: 1em;
      height: 20vh;
    }
    
    #jwt-decoder-decoded-header,
    #jwt-decoder-decoded-payload {
      overflow-y: scroll;
      -webkit-user-select: text;
      height: 20vh;
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
    <div class="col-12 p-5">
      <div class="form-group">
        <label for="jwt-decoder-input">JWT</label>
        <pre class="form-control" 
          id="jwt-decoder-input"
          style="height: 20vh; font-size: 16px; margin-bottom: 0"></pre>
      </div>
      <div id="jwt-decoder-input-message"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-6 p-5">
      <div class="form-group">
        <label for="jwt-decoder-decoded-header">Header</label>
        <pre class="form-control" 
          id="jwt-decoder-decoded-header"
          style="height: 40vh; font-size: 16px; margin-bottom: 0"></pre>
      </div>
    </div>
    <div class="col-6 p-5">
      <div class="form-group">
        <label for="jwt-decoder-decoded-payload">Payload</label>
        <pre class="form-control" 
          id="jwt-decoder-decoded-payload"
          style="height: 40vh; font-size: 16px; margin-bottom: 0"></pre>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 p-5">
      <button id="jwt-decoder-decode-btn" class="btn btn-rounded btn-primary sanduk-tool-btn">Decode</button>
      <button id="jwt-deocder-clear-btn" class="btn btn-rounded btn-default sanduk-tool-btn">Clear</button>
    </div>
  </div>`;
  };

  this.init = () => {
    const jwtInputMessage = document.getElementById('jwt-decoder-input-message');
    const decodeJWTBtn = document.getElementById('jwt-decoder-decode-btn');
    const clearJWTBtn = document.getElementById('jwt-deocder-clear-btn');

    const theme = 'ace/theme/idle_fingers';
    const mode = 'ace/mode/json';

    let jwtInputEditor = window.ace.edit('jwt-decoder-input');
    jwtInputEditor.setTheme(theme);
    jwtInputEditor.session.setMode('ace/mode/text');
    jwtInputEditor.session.setUseWrapMode(true);

    let decodedHeaderEditor = window.ace.edit('jwt-decoder-decoded-header');
    decodedHeaderEditor.setTheme(theme);
    decodedHeaderEditor.session.setMode(mode);

    let decodedPayloadEditor = window.ace.edit('jwt-decoder-decoded-payload');
    decodedPayloadEditor.setTheme(theme);
    decodedPayloadEditor.session.setMode(mode);

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
        const input = jwtInputEditor.getValue().trim();
        if (!input.length) {
          return;
        }
        const decodedHeader = jwtDecode(input, { header: true });
        const decodedJWT = jwtDecode(input);
        decodedHeaderEditor.setValue(JSON.stringify(decodedHeader, null, 2), -1);
        decodedPayloadEditor.setValue(JSON.stringify(decodedJWT, null, 2), -1);
      } catch (e) {
        showError(e.message);
      }
    });

    clearJWTBtn.addEventListener('click', () => {
      hideError();
      jwtInputEditor.setValue('');
      decodedHeaderEditor.setValue('');
      decodedPayloadEditor.setValue('');
    });
  };
};
