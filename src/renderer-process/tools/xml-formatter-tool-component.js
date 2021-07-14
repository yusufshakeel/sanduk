'use strict';
const xmlFormatter = require('xml-formatter');

const xmlFormatterOption = {
  indentation: '  '
};

// const FileHandler = require('../../handlers/file-handler');
// const fileHandler = new FileHandler();

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
                    id="xml-formatter-format-input-btn">Pretty
            </button>
            <button class="btn btn-primary"
                    type="button"
                    id="xml-formatter-compact-input-btn">Compact
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="xml-formatter-toggle-wrap-input-btn" data-wrap="no">Wrap
            </button>
          </div>

          <div class="btn-group" role="group">
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="xml-formatter-increase-font-input-btn">
                    <i class="fas fa-search-plus"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="xml-formatter-decrease-font-input-btn">
                    <i class="fas fa-search-minus"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="open-file-xml-formatter-btn">
                    <i class="fas fa-folder-open"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="save-file-xml-formatter-btn">
                    <i class="fas fa-save"></i>
            </button>
          </div>
        </div>

        <!-- input editor -->
        <pre class="form-control"
             id="xml-formatter-input"
             style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
        <div id="xml-formatter-input-footer" class="bg-dark p-5">Ln: 1 Col: 1</div>
      </div>
      <div id="xml-formatter-xml-input1-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const formatInputBtn = document.getElementById('xml-formatter-format-input-btn');
    const compactInputBtn = document.getElementById('xml-formatter-compact-input-btn');
    const toggleWrapInputBtn = document.getElementById('xml-formatter-toggle-wrap-input-btn');
    const xmlInputMessage = document.getElementById('xml-formatter-xml-input1-message');
    const inputFooter = document.getElementById('xml-formatter-input-footer');
    const xmlInput = document.getElementById('xml-formatter-input');
    const openFileBtn = document.getElementById('open-file-xml-formatter-btn');
    const saveFileBtn = document.getElementById('save-file-xml-formatter-btn');
    const increaseFontInputBtn = document.getElementById('xml-formatter-increase-font-input-btn');
    const decreaseFontInputBtn = document.getElementById('xml-formatter-decrease-font-input-btn');

    let xmlInputEditor;

    const theme = 'ace/theme/idle_fingers';
    const mode = 'ace/mode/xml';

    xmlInputEditor = window.ace.edit('xml-formatter-input');
    xmlInputEditor.setTheme(theme);
    xmlInputEditor.session.setMode(mode);
    xmlInputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = xmlInputEditor.getCursorPosition();
      inputFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });

    function hideMessage(element) {
      element.innerHTML = '';
    }

    function showMessage(element, message, alertType = ALERT_TYPE_PRIMARY) {
      element.innerHTML = `<div class="alert alert-${alertType}" role="alert">${message}</div>`;
      setTimeout(() => hideMessage(element), 5000);
    }

    // ipcRenderer.on(CHANNEL_OPEN_FILE_DIALOG_XML_FILE_PATH, async (e, args) => {
    //   try {
    //     console.log(args);
    //     const xml = await fileHandler.readFile({ filePath: args.filePath });
    //     console.log(xml);
    //     xmlInputEditor.setValue(xml, -1)
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
    //
    // ipcRenderer.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_XML_FILE_PATH, async (e, args) => {
    //   try {
    //     const data = xmlInputEditor.getValue();
    //     await fileHandler.writeFile({ filePath: args.filePath, data });
    //   } catch (e) {
    //     //
    //   }
    // });

    openFileBtn.addEventListener('click', () => {
      // ipcRenderer.send(CHANNEL_OPEN_FILE_DIALOG_XML);
    });

    saveFileBtn.addEventListener('click', () => {
      // ipcRenderer.send(CHANNEL_OPEN_SAVE_FILE_DIALOG_XML);
    });

    formatInputBtn.addEventListener('click', () => {
      try {
        hideMessage(xmlInputMessage);
        const input = xmlInputEditor.getValue();
        if (!input.length) {
          return;
        }
        xmlInputEditor.setValue(xmlFormatter(input, xmlFormatterOption), -1);
      } catch (e) {
        showMessage(xmlInputMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    compactInputBtn.addEventListener('click', () => {
      try {
        hideMessage(xmlInputMessage);
        const input = xmlInputEditor.getValue();
        if (!input.length) {
          return;
        }
        xmlInputEditor.setValue(xmlFormatter(input, { indentation: '', lineSeparator: '' }), -1);
      } catch (e) {
        showMessage(xmlInputMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    toggleWrapInputBtn.addEventListener('click', () => {
      if (!xmlInputEditor.getValue().length) {
        return;
      }
      const isWrapped = toggleWrapInputBtn.dataset.wrap === 'yes';
      if (isWrapped) {
        xmlInputEditor.session.setUseWrapMode(false);
        toggleWrapInputBtn.dataset.wrap = 'no';
        toggleWrapInputBtn.innerText = 'Wrap';
      } else {
        xmlInputEditor.session.setUseWrapMode(true);
        toggleWrapInputBtn.dataset.wrap = 'yes';
        toggleWrapInputBtn.innerText = 'Unwrap';
      }
    });

    increaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(xmlInput.style.fontSize.split('px')[0]);
      if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        xmlInput.style.fontSize = `${currentFontSize + 1}px`;
      }
    });

    decreaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(xmlInput.style.fontSize.split('px')[0]);
      if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        xmlInput.style.fontSize = `${currentFontSize - 1}px`;
      }
    });
  };
};
