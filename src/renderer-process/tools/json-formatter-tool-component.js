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
                    id="increase-font-input-json-formatter-btn">A<sup>+</sup>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="decrease-font-input-json-formatter-btn">A<sup>-</sup>
            </button>
          </div>
        </div>

        <!-- input editor -->
        <pre class="form-control"
             id="json-input1-json-formatter"
             style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
        <div id="input1-footer-json-formatter" class="bg-dark p-5">Ln: 1 Col: 1</div>
      </div>
      <div id="json-input1-json-formatter-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const validateInputBtn = document.getElementById('validate-input-json-formatter-btn');
    const toggleWrapInputBtn = document.getElementById('toggle-wrap-input-json-formatter-btn');
    const formatInputBtn = document.getElementById('format-input-json-formatter-btn');
    const compactInputBtn = document.getElementById('compact-input-json-formatter-btn');
    const foldInputBtn = document.getElementById('fold-input-json-formatter-btn');
    const jsonInputMessage = document.getElementById('json-input1-json-formatter-message');
    const jsonInput = document.getElementById('json-input1-json-formatter');
    const inputFooter = document.getElementById('input1-footer-json-formatter');
    const increaseFontInputBtn = document.getElementById(
      'increase-font-input-json-formatter-btn'
    );
    const decreaseFontInputBtn = document.getElementById(
      'decrease-font-input-json-formatter-btn'
    );

    let input1Editor;

    const theme = 'ace/theme/idle_fingers';
    // cobalt, idle_fingers, merbivore_soft
    // dracula*, gruvbox*, tomorrow_night_eighties*
    const mode = 'ace/mode/json';

    input1Editor = window.ace.edit('json-input1-json-formatter');
    input1Editor.setTheme(theme);
    input1Editor.session.setMode(mode);
    input1Editor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = input1Editor.getCursorPosition();
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

    validateInputBtn.addEventListener('click', () => {
      const input = input1Editor.getValue();
      if (input.length && isValidJSON(input, jsonInputMessage)) {
        showMessage(jsonInputMessage, 'Valid JSON', ALERT_TYPE_SUCCESS);
      }
    });

    formatInputBtn.addEventListener('click', () => {
      try {
        hideMessage(jsonInputMessage);
        const input = input1Editor.getValue();
        if (!input.length) {
          return;
        }
        const json = JSON.stringify(JSON.parse(input), null, 2);
        input1Editor.setValue(json, -1);
      } catch (e) {
        showMessage(jsonInputMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    compactInputBtn.addEventListener('click', () => {
      try {
        hideMessage(jsonInputMessage);
        const input = input1Editor.getValue();
        if (!input.length) {
          return;
        }
        const json = JSON.stringify(JSON.parse(input));
        input1Editor.setValue(json, -1);
      } catch (e) {
        showMessage(jsonInputMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    toggleWrapInputBtn.addEventListener('click', () => {
      if (!input1Editor.getValue().length) {
        return;
      }
      const isWrapped = toggleWrapInputBtn.dataset.wrap === 'yes';
      if (isWrapped) {
        input1Editor.session.setUseWrapMode(false);
        toggleWrapInputBtn.dataset.wrap = 'no';
        toggleWrapInputBtn.innerText = 'Wrap';
      } else {
        input1Editor.session.setUseWrapMode(true);
        toggleWrapInputBtn.dataset.wrap = 'yes';
        toggleWrapInputBtn.innerText = 'Unwrap';
      }
    });

    foldInputBtn.addEventListener('click', () => {
      if (!input1Editor.getValue().length) {
        return;
      }
      input1Editor.getSession().foldAll(1);
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
