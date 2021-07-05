'use strict';
const jwtDecode = require('jwt-decode');

const jwtInput = document.getElementById('jwt-input');
const jwtInputMessage = document.getElementById('jwt-input-message');
const jwtDecodedPayload = document.getElementById('jwt-decoded-payload');
const jwtDecodedHeader = document.getElementById('jwt-decoded-header');
const decodeJWTBtn = document.getElementById('decode-jwt-btn');
const clearJWTBtn = document.getElementById('clear-jwt-btn');

function hideError() {
  jwtInputMessage.innerHTML = '';
}

function showError(message) {
  jwtInputMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
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
