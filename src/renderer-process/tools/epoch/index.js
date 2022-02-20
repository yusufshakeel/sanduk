'use strict';

const fs = require('fs');
const path = require('path');
const { clipboard } = require('electron');
const popError = require('../../helpers/pop-error');
const clearContent = require('../../helpers/clear-content');
const inProgressHtmlAnimate = require('../../helpers/in-progress-html-animate');

module.exports = function epoch() {
  document.getElementById('v-pills-epoch').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const epochInput = document.getElementById('epoch-input');
  const epochMessage = document.getElementById('epoch-message');
  const timeInLocale = document.getElementById('time-in-locale');
  const timeInUTC = document.getElementById('time-in-utc');
  const computeBtn = document.getElementById('compute-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyCurrentTimeEpochBtn = document.getElementById('copy-current-time-epoch-btn');
  const currentTimeLocale = document.getElementById('current-time-locale');
  const currentTimeUTC = document.getElementById('current-time-utc');
  const currentTimeEpoch = document.getElementById('current-time-epoch');

  const updateCurrentTimes = () => {
    const date = new Date();
    currentTimeLocale.innerText = date.toString().split('GMT')[0].trim();
    currentTimeUTC.innerText = date.toUTCString();
    currentTimeEpoch.innerText = parseInt(date.getTime() / 1000);
  };
  setInterval(updateCurrentTimes, 1000);

  function validateEpoch(epoch) {
    if (!Number.isInteger(epoch)) {
      popError(epochMessage, 'Epoch should be an integer value.');
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
    timeInLocale.value = inLocal;
    timeInUTC.value = inUTC;
  });

  clearBtn.addEventListener('click', () => {
    clearContent(epochMessage);
    epochInput.value = '';
    timeInLocale.value = ' ';
    timeInUTC.value = ' ';
  });

  copyCurrentTimeEpochBtn.addEventListener('click', () => {
    inProgressHtmlAnimate(
      copyCurrentTimeEpochBtn,
      '<i title="Copy" class="bi-clipboard"></i>',
      '<i title="Copy" class="bi-clipboard-check-fill"></i>',
      200
    );
    clipboard.writeText(currentTimeEpoch.innerText);
  });
};
