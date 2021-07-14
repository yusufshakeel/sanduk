'use strict';
const { ipcRenderer } = require('electron');

const {
  CHANNEL_OPEN_FILE_DIALOG_JSON,
  CHANNEL_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH
} = require('../../main-process/constants/channel-constants');

const fs = require('fs');

const {
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_PRIMARY
} = require('../constants/alert-type-constants');

const {
  ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS
} = require('../constants/ace-editor-constants');

module.exports = function JsonFormatterToolComponent() {
  this.getHtml = () => {
    return `<!-- json formatter -->
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">JSON Formatter</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12 p-5">
      <div class="form-group">
        <!-- menu -->
        <div class="text-center">
          <div class="btn-group" role="group">
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="validate-input-json-formatter-btn">Validate
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="format-input-json-formatter-btn">Pretty
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="compact-input-json-formatter-btn">Compact
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="fold-input-json-formatter-btn">Fold
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="toggle-wrap-input-json-formatter-btn" data-wrap="no">Wrap
            </button>
          </div>

          <div class="btn-group" role="group">
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="increase-font-input-json-formatter-btn">
                    <i class="fas fa-search-plus"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="decrease-font-input-json-formatter-btn">
                    <i class="fas fa-search-minus"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="open-file-json-formatter-btn">
                    <i class="fas fa-folder-open"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="save-file-json-formatter-btn">
                    <i class="fas fa-save"></i>
            </button>
          </div>
        </div>

        <!-- input editor -->
        <pre class="form-control"
             id="json-input-json-formatter"
             style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
        <div id="input-footer-json-formatter" class="bg-dark p-5">Ln: 1 Col: 1</div>
      </div>
      <div id="json-input-json-formatter-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const validateInputBtn = document.getElementById('validate-input-json-formatter-btn');
    const toggleWrapInputBtn = document.getElementById('toggle-wrap-input-json-formatter-btn');
    const formatInputBtn = document.getElementById('format-input-json-formatter-btn');
    const compactInputBtn = document.getElementById('compact-input-json-formatter-btn');
    const foldInputBtn = document.getElementById('fold-input-json-formatter-btn');
    const jsonInputMessage = document.getElementById('json-input-json-formatter-message');
    const jsonInput = document.getElementById('json-input-json-formatter');
    const inputFooter = document.getElementById('input-footer-json-formatter');
    const openFileBtn = document.getElementById('open-file-json-formatter-btn');
    const saveFileBtn = document.getElementById('save-file-json-formatter-btn');
    const increaseFontInputBtn = document.getElementById('increase-font-input-json-formatter-btn');
    const decreaseFontInputBtn = document.getElementById('decrease-font-input-json-formatter-btn');

    let jsonInputEditor;

    const theme = 'ace/theme/idle_fingers';
    // cobalt, idle_fingers, merbivore_soft
    // dracula*, gruvbox*, tomorrow_night_eighties*
    const mode = 'ace/mode/json';

    jsonInputEditor = window.ace.edit('json-input-json-formatter');
    jsonInputEditor.setTheme(theme);
    jsonInputEditor.session.setMode(mode);
    jsonInputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = jsonInputEditor.getCursorPosition();
      inputFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });

    function hideMessage(element) {
      element.innerHTML = '';
    }

    function showMessage(element, message, alertType = ALERT_TYPE_PRIMARY) {
      element.innerHTML = `<div class="alert alert-${alertType}" role="alert">${message}</div>`;
      setTimeout(() => hideMessage(element), 5000);
    }

    function isValidJSON(json, element) {
      try {
        JSON.parse(json);
        return true;
      } catch (e) {
        showMessage(element, e.message, ALERT_TYPE_ERROR);
      }
      return false;
    }

    ipcRenderer.on(CHANNEL_OPEN_FILE_DIALOG_JSON_FILE_PATH, async (e, args) => {
      try {
        const json = fs.readFileSync(args.filePath).toString();
        jsonInputEditor.getSession().setValue(json, -1);
      } catch (e) {
        //
      }
    });

    ipcRenderer.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, async (e, args) => {
      try {
        const data = jsonInputEditor.getValue();
        fs.writeFileSync(args.filePath, data, 'utf8');
      } catch (e) {
        //
      }
    });

    openFileBtn.addEventListener('click', () => {
      ipcRenderer.send(CHANNEL_OPEN_FILE_DIALOG_JSON);
    });

    saveFileBtn.addEventListener('click', () => {
      ipcRenderer.send(CHANNEL_OPEN_SAVE_FILE_DIALOG_JSON);
    });

    validateInputBtn.addEventListener('click', () => {
      const input = jsonInputEditor.getValue();
      if (input.length && isValidJSON(input, jsonInputMessage)) {
        showMessage(jsonInputMessage, 'Valid JSON', ALERT_TYPE_SUCCESS);
      }
    });

    formatInputBtn.addEventListener('click', () => {
      try {
        hideMessage(jsonInputMessage);
        const input = jsonInputEditor.getValue();
        if (!input.length) {
          return;
        }
        const json = JSON.stringify(JSON.parse(input), null, 2);
        jsonInputEditor.setValue(json, -1);
      } catch (e) {
        showMessage(jsonInputMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    compactInputBtn.addEventListener('click', () => {
      try {
        hideMessage(jsonInputMessage);
        const input = jsonInputEditor.getValue();
        if (!input.length) {
          return;
        }
        const json = JSON.stringify(JSON.parse(input));
        jsonInputEditor.setValue(json, -1);
      } catch (e) {
        showMessage(jsonInputMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    toggleWrapInputBtn.addEventListener('click', () => {
      if (!jsonInputEditor.getValue().length) {
        return;
      }
      const isWrapped = toggleWrapInputBtn.dataset.wrap === 'yes';
      if (isWrapped) {
        jsonInputEditor.session.setUseWrapMode(false);
        toggleWrapInputBtn.dataset.wrap = 'no';
        toggleWrapInputBtn.innerText = 'Wrap';
      } else {
        jsonInputEditor.session.setUseWrapMode(true);
        toggleWrapInputBtn.dataset.wrap = 'yes';
        toggleWrapInputBtn.innerText = 'Unwrap';
      }
    });

    foldInputBtn.addEventListener('click', () => {
      if (!jsonInputEditor.getValue().length) {
        return;
      }
      jsonInputEditor.getSession().foldAll(1);
    });

    increaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(jsonInput.style.fontSize.split('px')[0]);
      if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        jsonInput.style.fontSize = `${currentFontSize + 1}px`;
      }
    });

    decreaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(jsonInput.style.fontSize.split('px')[0]);
      if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        jsonInput.style.fontSize = `${currentFontSize - 1}px`;
      }
    });
  };
};
