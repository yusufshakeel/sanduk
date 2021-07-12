'use strict';

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
                    id="validate-input1-btn">Validate
            </button>
            <button class="btn btn-primary"
                    type="button"
                    id="format-input1-btn">Pretty
            </button>
            <button class="btn btn-primary"
                    type="button"
                    id="compact-input1-btn">Compact
            </button>
            <button class="btn btn-primary"
                    type="button"
                    id="fold-input1-btn">Fold
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="toggle-wrap-input1-btn" data-wrap="no">Wrap
            </button>
          </div>

          <div class="btn-group" role="group">
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="increase-font-input1-btn">A<sup>+</sup>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="decrease-font-input1-btn">A<sup>-</sup>
            </button>
          </div>
        </div>

        <!-- input editor -->
        <pre class="form-control"
             id="json-input1"
             style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
        <div id="input1-footer" class="bg-dark p-5"></div>
      </div>
      <div id="json-input1-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const validateInput1Btn = document.getElementById('validate-input1-btn');
    const toggleWrapInput1Btn = document.getElementById('toggle-wrap-input1-btn');
    const formatInput1Btn = document.getElementById('format-input1-btn');
    const compactInput1Btn = document.getElementById('compact-input1-btn');
    const foldInput1Btn = document.getElementById('fold-input1-btn');
    const jsonInput1Message = document.getElementById('json-input1-message');
    const jsonInput1 = document.getElementById('json-input1');
    const input1Footer = document.getElementById('input1-footer');
    const increaseFontInput1Btn = document.getElementById('increase-font-input1-btn');
    const decreaseFontInput1Btn = document.getElementById('decrease-font-input1-btn');

    let input1Editor;

    const theme = 'ace/theme/idle_fingers';
    // cobalt, idle_fingers, merbivore_soft
    // dracula*, gruvbox*, tomorrow_night_eighties*
    const mode = 'ace/mode/json';

    input1Editor = window.ace.edit('json-input1');
    input1Editor.setTheme(theme);
    input1Editor.session.setMode(mode);
    input1Editor.selection.on('changeCursor', () => {
      const { row, column } = input1Editor.getCursorPosition();
      input1Footer.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
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

    validateInput1Btn.addEventListener('click', () => {
      const input = input1Editor.getValue();
      if (input.length && isValidJSON(input, jsonInput1Message)) {
        showMessage(jsonInput1Message, 'Valid JSON', ALERT_TYPE_SUCCESS);
      }
    });

    formatInput1Btn.addEventListener('click', () => {
      try {
        hideMessage(jsonInput1Message);
        const input = input1Editor.getValue();
        if (!input.length) {
          return;
        }
        const json = JSON.stringify(JSON.parse(input), null, 2);
        input1Editor.setValue(json, -1);
      } catch (e) {
        showMessage(jsonInput1Message, e.message, ALERT_TYPE_ERROR);
      }
    });

    compactInput1Btn.addEventListener('click', () => {
      try {
        hideMessage(jsonInput1Message);
        const input = input1Editor.getValue();
        if (!input.length) {
          return;
        }
        const json = JSON.stringify(JSON.parse(input));
        input1Editor.setValue(json, -1);
      } catch (e) {
        showMessage(jsonInput1Message, e.message, ALERT_TYPE_ERROR);
      }
    });

    toggleWrapInput1Btn.addEventListener('click', () => {
      if (!input1Editor.getValue().length) {
        return;
      }
      const isWrapped = toggleWrapInput1Btn.dataset.wrap === 'yes';
      if (isWrapped) {
        input1Editor.session.setUseWrapMode(false);
        toggleWrapInput1Btn.dataset.wrap = 'no';
        toggleWrapInput1Btn.innerText = 'Wrap';
      } else {
        input1Editor.session.setUseWrapMode(true);
        toggleWrapInput1Btn.dataset.wrap = 'yes';
        toggleWrapInput1Btn.innerText = 'Unwrap';
      }
    });

    foldInput1Btn.addEventListener('click', () => {
      if (!input1Editor.getValue().length) {
        return;
      }
      input1Editor.getSession().foldAll(1);
    });

    increaseFontInput1Btn.addEventListener('click', () => {
      const currentFontSize = parseInt(jsonInput1.style.fontSize.split('px')[0]);
      if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        jsonInput1.style.fontSize = `${currentFontSize + 1}px`;
      }
    });

    decreaseFontInput1Btn.addEventListener('click', () => {
      const currentFontSize = parseInt(jsonInput1.style.fontSize.split('px')[0]);
      if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        jsonInput1.style.fontSize = `${currentFontSize - 1}px`;
      }
    });
  };
};
