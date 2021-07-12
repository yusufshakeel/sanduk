'use strict';
const { clipboard } = require('electron');

module.exports = function EpochToolComponent() {
  this.getEpochHtml = () => {
    return `<!-- epoch -->
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">Epoch</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="form-group">
        <label for="epoch-input">Enter epoch time</label>
        <input class="form-control" id="epoch-input">
        <div id="epoch-message"></div>
      </div>
      <div class="form-group">
        <p>Time in UTC/GMT</p>
        <pre class="my-5 border d-block text-center font-size-20" id="time-in-utc">&nbsp;</pre>
      </div>
      <div class="form-group">
        <p>Time in locale</p>
        <pre class="my-5 border d-block text-center font-size-20" id="time-in-locale">&nbsp;</pre>
      </div>
      <button id="compute-btn" class="btn btn-rounded btn-primary sanduk-tool-btn">Compute</button>
      <button id="clear-btn" class="btn btn-rounded btn-default sanduk-tool-btn float-right">Clear</button>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div id="time-table">
        <table class="table">
          <tbody>
          <tr>
            <td style="width: 35%" class="text-right">Locale</td>
            <td style="width: 50%" id="current-time-locale"></td>
            <td style="width: 15%"></td>
          </tr>
          <tr>
            <td class="text-right">UTC/GMT</td>
            <td id="current-time-utc"></td>
            <td></td>
          </tr>
          <tr>
            <td class="text-right">Epoch</td>
            <td id="current-time-epoch"></td>
            <td><button id="copy-current-time-epocb-btn" type="button" class="btn float-right"><i class="fas fa-clipboard"></i></button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
  };

  this.initEpoch = () => {
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
  };
};
