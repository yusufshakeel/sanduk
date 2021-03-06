'use strict';

const fs = require('fs');
const path = require('path');
const { clipboard } = require('electron');
const { v4: uuidV4, v5: uuidV5 } = require('uuid');
const popError = require('../../helpers/pop-error');
const inProgressTextAnimate = require('../../helpers/in-progress-text-animate');
const inProgressHtmlAnimate = require('../../helpers/in-progress-html-animate');

function renderHistory(history, historyContainer) {
  historyContainer.innerHTML = history
    .map(
      v =>
        `<p class="font-monospace p-1">${v} <span class="sanduk-click-to-copy" data-value="${v}" style="cursor: pointer"><i title="Copy" class="bi-clipboard"></i></span></p>`
    )
    .reverse()
    .join('');

  const elems = document.getElementsByClassName('sanduk-click-to-copy');
  for (const el of elems) {
    el.addEventListener('click', () => {
      inProgressHtmlAnimate(
        el,
        '<i title="Copy" class="bi-clipboard"></i>',
        '<i title="Copy" class="bi-clipboard-check-fill"></i>',
        200
      );
      clipboard.writeText(el.dataset.value);
    });
  }
}

function uuidV4Handler() {
  const btnGenerateUUIDV4 = document.getElementById('generate-uuid-v4-btn');
  const btnCopyUUIDV4 = document.getElementById('copy-uuid-v4-btn');
  const uuidV4Output = document.getElementById('uuid-v4-output');
  const btnClearUUIDV4 = document.getElementById('clear-uuid-v4-btn');
  const historyElem = document.getElementById('uuid-v4-history');

  const historyLimit = 20;
  const history = [];

  btnGenerateUUIDV4.addEventListener('click', () => {
    const value = uuidV4();
    uuidV4Output.value = value;
    history.length >= historyLimit && history.splice(0, 1);
    history.push(value);
    renderHistory(history, historyElem);
  });

  btnCopyUUIDV4.addEventListener('click', () => {
    if (!uuidV4Output.value.trim().length) {
      return;
    }
    inProgressTextAnimate(btnCopyUUIDV4, 'Copy', 'Copied!', 200);
    clipboard.writeText(uuidV4Output.value);
  });

  btnClearUUIDV4.addEventListener('click', () => {
    uuidV4Output.value = '';
  });
}

function uuidV5Handler() {
  const uuidV5Name = document.getElementById('uuid-v5-name');
  const uuidV5Namespace = document.getElementById('uuid-v5-namespace');
  const btnGenerateUUIDV5 = document.getElementById('generate-uuid-v5-btn');
  const btnCopyUUIDV5 = document.getElementById('copy-uuid-v5-btn');
  const btnClearUUIDV5 = document.getElementById('clear-uuid-v5-btn');
  const uuidV5Output = document.getElementById('uuid-v5-output');
  const historyElem = document.getElementById('uuid-v5-history');

  const historyLimit = 20;
  const history = [];

  btnGenerateUUIDV5.addEventListener('click', () => {
    try {
      if (!uuidV5Namespace.value.trim().length) {
        popError({ message: 'Namespace required.' });
        return;
      }
      let value = uuidV5(uuidV5Name.value, uuidV5Namespace.value);
      uuidV5Output.value = value;
      history.length >= historyLimit && history.splice(0, 1);
      history.push(value);
      renderHistory(history, historyElem);
    } catch (e) {
      popError({ message: e.message });
    }
  });

  btnCopyUUIDV5.addEventListener('click', () => {
    if (!uuidV5Output.value.trim().length) {
      return;
    }
    inProgressTextAnimate(btnCopyUUIDV5, 'Copy', 'Copied!', 200);
    btnCopyUUIDV5.innerText = 'Copied!';
  });

  btnClearUUIDV5.addEventListener('click', () => {
    uuidV5Output.value = '';
    uuidV5Name.value = '';
    uuidV5Namespace.value = '';
  });
}

module.exports = function uuid() {
  document.getElementById('v-pills-uuid').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  uuidV4Handler();
  uuidV5Handler();
};
