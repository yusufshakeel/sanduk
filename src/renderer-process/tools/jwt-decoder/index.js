'use strict';

const fs = require('fs');
const path = require('path');
const jwtDecode = require('jwt-decode');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');

module.exports = function jwtDecoder() {
  document.getElementById('v-pills-jwt-decoder').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const jwtInputMessage = document.getElementById('jwt-decoder-input-message');
  const decodeJWTBtn = document.getElementById('jwt-decoder-decode-btn');
  const clearJWTBtn = document.getElementById('jwt-deocder-clear-btn');

  const theme = aceTheme;
  const mode = aceMode.json;

  let jwtInputEditor = window.ace.edit('jwt-decoder-input');
  jwtInputEditor.setTheme(theme);
  jwtInputEditor.session.setMode(aceMode.text);
  jwtInputEditor.session.setUseWrapMode(true);
  jwtInputEditor.setShowPrintMargin(false);

  let decodedHeaderEditor = window.ace.edit('jwt-decoder-decoded-header');
  decodedHeaderEditor.setTheme(theme);
  decodedHeaderEditor.session.setMode(mode);
  decodedHeaderEditor.setShowPrintMargin(false);

  let decodedPayloadEditor = window.ace.edit('jwt-decoder-decoded-payload');
  decodedPayloadEditor.setTheme(theme);
  decodedPayloadEditor.session.setMode(mode);
  decodedPayloadEditor.setShowPrintMargin(false);

  decodeJWTBtn.addEventListener('click', () => {
    try {
      clearContent(jwtInputMessage);
      const input = jwtInputEditor.getValue().trim();
      if (!input.length) {
        return;
      }
      const decodedHeader = jwtDecode(input, { header: true });
      const decodedJWT = jwtDecode(input);
      decodedHeaderEditor.setValue(JSON.stringify(decodedHeader, null, 2), -1);
      decodedPayloadEditor.setValue(JSON.stringify(decodedJWT, null, 2), -1);
    } catch (e) {
      popError(jwtInputMessage, e.message);
    }
  });

  clearJWTBtn.addEventListener('click', () => {
    clearContent(jwtInputMessage);
    jwtInputEditor.setValue('');
    decodedHeaderEditor.setValue('');
    decodedPayloadEditor.setValue('');
  });
};
