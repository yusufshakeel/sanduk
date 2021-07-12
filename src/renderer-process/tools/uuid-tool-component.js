'use strict';
const { clipboard } = require('electron');
const { v4: uuidV4, v5: uuidV5 } = require('uuid');

module.exports = function UUIDToolComponent() {
  this.getUUIDV4Html = () => {
    return `<!-- uuid v4 -->
  <div class="row mb-20">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">UUID v4</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="form-group">
        <input class="form-control text-center text-monospace font-size-18" id="uuid-v4-output" readonly>
      </div>
      <button id="generate-uuid-v4-btn" class="btn btn-rounded btn-primary sanduk-tool-btn">Generate</button>
      <button id="copy-uuid-v4-btn" class="btn btn-rounded btn-secondary sanduk-tool-btn">Copy</button>
      <button id="clear-uuid-v4-btn" class="btn btn-rounded btn-default sanduk-tool-btn float-right">Clear</button>
    </div>
  </div>`;
  };

  this.getUUIDV5Html = () => {
    return `<!-- uuid v5 -->
  <div class="row my-20">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">UUID v5</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="form-group">
        <label for="uuid-v5-name">String</label>
        <input class="form-control" id="uuid-v5-name">
      </div>
      <div class="form-group">
        <label for="uuid-v5-namespace">Namespace</label>
        <input class="form-control" id="uuid-v5-namespace">
        <div id="uuid-v5-namespace-message"></div>
      </div>
      <div class="form-group">
        <label for="uuid-v5-output">UUID v5</label>
        <input class="form-control text-center text-monospace font-size-18" id="uuid-v5-output" readonly>
      </div>
      <button id="generate-uuid-v5-btn" class="btn btn-rounded btn-primary sanduk-tool-btn">Generate</button>
      <button id="copy-uuid-v5-btn" class="btn btn-rounded btn-secondary sanduk-tool-btn">Copy</button>
      <button id="clear-uuid-v5-btn" class="btn btn-rounded btn-default sanduk-tool-btn float-right">Clear</button>
    </div>
  </div>`;
  };

  this.initUUIDV4 = () => {
    const btnGenerateUUIDV4 = document.getElementById('generate-uuid-v4-btn');
    const btnCopyUUIDV4 = document.getElementById('copy-uuid-v4-btn');
    const uuidV4Output = document.getElementById('uuid-v4-output');
    const btnClearUUIDV4 = document.getElementById('clear-uuid-v4-btn');

    btnGenerateUUIDV4.addEventListener('click', () => {
      uuidV4Output.value = uuidV4();
    });

    btnCopyUUIDV4.addEventListener('click', () => {
      if (!uuidV4Output.value.trim().length) {
        return;
      }
      btnCopyUUIDV4.innerText = 'Copied!';
      clipboard.writeText(uuidV4Output.value);
      setTimeout(() => {
        btnCopyUUIDV4.innerText = 'Copy';
      }, 200);
    });

    btnClearUUIDV4.addEventListener('click', () => {
      uuidV4Output.value = '';
    });
  };

  this.initUUIDV5 = () => {
    const uuidV5Name = document.getElementById('uuid-v5-name');
    const uuidV5Namespace = document.getElementById('uuid-v5-namespace');
    const uuidV5NamespaceMessage = document.getElementById('uuid-v5-namespace-message');
    const btnGenerateUUIDV5 = document.getElementById('generate-uuid-v5-btn');
    const btnCopyUUIDV5 = document.getElementById('copy-uuid-v5-btn');
    const btnClearUUIDV5 = document.getElementById('clear-uuid-v5-btn');
    const uuidV5Output = document.getElementById('uuid-v5-output');

    function hideError() {
      uuidV5NamespaceMessage.innerHTML = '';
    }

    function showError(message) {
      uuidV5NamespaceMessage.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
      setTimeout(hideError, 5000);
    }

    btnGenerateUUIDV5.addEventListener('click', () => {
      try {
        hideError();
        if (!uuidV5Namespace.value.trim().length) {
          showError('Namespace required.');
          return;
        }
        uuidV5Output.value = uuidV5(uuidV5Name.value, uuidV5Namespace.value);
      } catch (e) {
        showError(e.message);
      }
    });

    btnCopyUUIDV5.addEventListener('click', () => {
      if (!uuidV5Output.value.trim().length) {
        return;
      }
      btnCopyUUIDV5.innerText = 'Copied!';
      clipboard.writeText(uuidV5Output.value);
      setTimeout(() => {
        btnCopyUUIDV5.innerText = 'Copy';
      }, 200);
    });

    btnClearUUIDV5.addEventListener('click', () => {
      hideError();
      uuidV5Output.value = '';
      uuidV5Name.value = '';
      uuidV5Namespace.value = '';
    });
  };
};
