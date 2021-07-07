'use strict';
const { clipboard } = require('electron');

const epochInput = document.getElementById('epoch-input');
const epochMessage = document.getElementById('epoch-message');
const timeInLocale = document.getElementById('time-in-locale');
const timeInUTC = document.getElementById('time-in-utc');
const computeBtn = document.getElementById('compute-btn');
const clearBtn = document.getElementById('clear-btn');
const copyCurrentTimeEpochBtn = document.getElementById('copy-current-time-epocb-btn');
const currentTimeLocale = document.getElementById('current-time-locale');
const currentTimeUTC = document.getElementById('current-time-utc');
const currentTimeEpoch = document.getElementById('current-time-epoch');

function updateCurrentTimes() {
  const date = new Date();
  currentTimeLocale.innerText = date.toString().split('GMT')[0].trim();
  currentTimeUTC.innerText = date.toUTCString();
  currentTimeEpoch.innerText = parseInt(date.getTime() / 1000);
}

setInterval(updateCurrentTimes, 1000);

function hideError() {
  epochMessage.innerHTML = '';
}

function showError(message) {
  epochMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  setTimeout(hideError, 5000);
}

function validateEpoch(epoch) {
  if (!Number.isInteger(epoch)) {
    showError('Epoch should be an integer value.');
    return false;
  }
  return epoch;
}

computeBtn.addEventListener('click', () => {
  const epoch = Number(epochInput.value);
  if (validateEpoch(epoch) === false) {
    return;
  }
  const unixEpochTimeMS = epoch * 1000;
  const date = new Date(unixEpochTimeMS);
  const inLocal = date.toString().split('GMT')[0].trim();
  const inUTC = date.toUTCString();
  timeInLocale.innerText = inLocal;
  timeInUTC.innerText = inUTC;
});

clearBtn.addEventListener('click', () => {
  hideError();
  epochInput.value = '';
  timeInLocale.innerText = ' ';
  timeInUTC.innerText = ' ';
});

copyCurrentTimeEpochBtn.addEventListener('click', () => {
  copyCurrentTimeEpochBtn.innerHTML = '<i class="fas fa-check"></i>';
  clipboard.writeText(currentTimeEpoch.innerText);
  setTimeout(() => {
    copyCurrentTimeEpochBtn.innerHTML = '<i class="fas fa-clipboard"></i>';
  }, 200);
});
