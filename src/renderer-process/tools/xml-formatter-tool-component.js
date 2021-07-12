'use strict';
let xmlFormatter = require('xml-formatter');

const { ALERT_TYPE_ERROR, ALERT_TYPE_PRIMARY } = require('../constants/alert-type-constants');

const {
  ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS
} = require('../constants/ace-editor-constants');

module.exports = function XmlFormatterToolComponent() {
  this.getHtml = () => {
    return `<!-- xml formatter -->
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">XML Formatter</p>
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
                    id="xml-formatter-format-input1-btn">Pretty
            </button>
            <button class="btn btn-primary"
                    type="button"
                    id="xml-formatter-compact-input1-btn">Compact
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="xml-formatter-toggle-wrap-input1-btn" data-wrap="no">Wrap
            </button>
          </div>

          <div class="btn-group" role="group">
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="xml-formatter-increase-font-input1-btn">A<sup>+</sup>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="xml-formatter-decrease-font-input1-btn">A<sup>-</sup>
            </button>
          </div>
        </div>

        <!-- input editor -->
        <pre class="form-control"
             id="xml-formatter-input1"
             style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
        <div id="xml-formatter-input1-footer" class="bg-dark p-5"></div>
      </div>
      <div id="xml-formatter-xml-input1-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const formatInput1Btn = document.getElementById('xml-formatter-format-input1-btn');
    const compactInput1Btn = document.getElementById('xml-formatter-compact-input1-btn');
    const toggleWrapInput1Btn = document.getElementById('xml-formatter-toggle-wrap-input1-btn');
    const xmlInput1Message = document.getElementById('xml-formatter-xml-input1-message');
    const input1Footer = document.getElementById('xml-formatter-input1-footer');
    const xmlInput1 = document.getElementById('xml-formatter-input1');
    const increaseFontInput1Btn = document.getElementById('xml-formatter-increase-font-input1-btn');
    const decreaseFontInput1Btn = document.getElementById('xml-formatter-decrease-font-input1-btn');

    let input1Editor;

    const theme = 'ace/theme/idle_fingers';
    const mode = 'ace/mode/xml';

    input1Editor = window.ace.edit('xml-formatter-input1');
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

    formatInput1Btn.addEventListener('click', () => {
      try {
        hideMessage(xmlInput1Message);
        const input = input1Editor.getValue();
        if (!input.length) {
          return;
        }
        input1Editor.setValue(xmlFormatter(input), -1);
      } catch (e) {
        showMessage(xmlInput1Message, e.message, ALERT_TYPE_ERROR);
      }
    });

    compactInput1Btn.addEventListener('click', () => {
      try {
        hideMessage(xmlInput1Message);
        const input = input1Editor.getValue();
        if (!input.length) {
          return;
        }
        input1Editor.setValue(xmlFormatter(input, { indentation: '', lineSeparator: '' }), -1);
      } catch (e) {
        showMessage(xmlInput1Message, e.message, ALERT_TYPE_ERROR);
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

    increaseFontInput1Btn.addEventListener('click', () => {
      const currentFontSize = parseInt(xmlInput1.style.fontSize.split('px')[0]);
      if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        xmlInput1.style.fontSize = `${currentFontSize + 1}px`;
      }
    });

    decreaseFontInput1Btn.addEventListener('click', () => {
      const currentFontSize = parseInt(xmlInput1.style.fontSize.split('px')[0]);
      if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        xmlInput1.style.fontSize = `${currentFontSize - 1}px`;
      }
    });
  };
};
