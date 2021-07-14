'use strict';
const xmlFormatter = require('xml-formatter');
const xmljs = require('xml-js');
const xmlFormatterOption = {
  indentation: '  '
};

const { ALERT_TYPE_ERROR, ALERT_TYPE_PRIMARY } = require('../constants/alert-type-constants');

const {
  ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS
} = require('../constants/ace-editor-constants');

module.exports = function XmlToJsonToolComponent() {
  this.getHTML = () => {
    return `<!-- xml to json -->
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">XML to JSON</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12 px-5 pt-5">
      <!-- menu -->
      <div class="text-center">
        <div class="btn-group" role="group">
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="xml-to-json-format-xml-editor-btn">Pretty
          </button>
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="xml-to-json-compact-xml-editor-btn">Compact
          </button>
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="xml-to-json-toggle-wrap-xml-editor-btn" data-wrap="no">Wrap
          </button>
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="xml-to-json-transform-xml-editor-btn">Transform
          </button>
        </div>

        <div class="btn-group" role="group">
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="xml-to-json-increase-font-xml-editor-btn">
                    <i class="fas fa-search-plus"></i>
          </button>
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="xml-to-json-decrease-font-xml-editor-btn">
                    <i class="fas fa-search-minus"></i>
          </button>
        </div>
      </div>    
    </div>
    
    <div class="col-6 px-5">
      <!-- xml editor -->
      <pre class="form-control"
           id="xml-to-json-xml-editor"
           style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
       <div id="xml-to-json-xml-editor-footer" class="bg-dark p-5">Ln: 1 Col: 1</div>
    </div>
    
    <div class="col-6 px-5">
      <!-- json editor -->
      <pre class="form-control"
           id="xml-to-json-json-editor"
           style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
      <div id="xml-to-json-json-editor-footer" class="bg-dark p-5">Ln: 1 Col: 1</div>
    </div>
    
    <div class="col-12 p-5">
      <div id="xml-to-json-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const xmlEditorInput = document.getElementById('xml-to-json-xml-editor');
    const jsonEditorInput = document.getElementById('xml-to-json-json-editor');
    const xmlEditorFooter = document.getElementById('xml-to-json-xml-editor-footer');
    const jsonEditorFooter = document.getElementById('xml-to-json-json-editor-footer');
    const formatXmlBtn = document.getElementById('xml-to-json-format-xml-editor-btn');
    const xmlToJsonMessage = document.getElementById('xml-to-json-message');
    const compactXmlInputBtn = document.getElementById('xml-to-json-compact-xml-editor-btn');
    const toggleWrapXmlInputBtn = document.getElementById('xml-to-json-toggle-wrap-xml-editor-btn');
    const transformBtn = document.getElementById('xml-to-json-transform-xml-editor-btn');
    const increaseFontBtn = document.getElementById('xml-to-json-increase-font-xml-editor-btn');
    const decreaseFontBtn = document.getElementById('xml-to-json-decrease-font-xml-editor-btn');

    const theme = 'ace/theme/idle_fingers';

    let xmlEditor, jsonEditor;

    xmlEditor = window.ace.edit('xml-to-json-xml-editor');
    xmlEditor.setTheme(theme);
    xmlEditor.session.setMode('ace/mode/xml');
    xmlEditor.selection.on('changeCursor', () => {
      const { row, column } = xmlEditor.getCursorPosition();
      xmlEditorFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });

    jsonEditor = window.ace.edit('xml-to-json-json-editor');
    jsonEditor.setTheme(theme);
    jsonEditor.session.setMode('ace/mode/json');
    jsonEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = jsonEditor.getCursorPosition();
      jsonEditorFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });

    function hideMessage(element) {
      element.innerHTML = '';
    }

    function showMessage(element, message, alertType = ALERT_TYPE_PRIMARY) {
      element.innerHTML = `<div class="alert alert-${alertType}" role="alert">${message}</div>`;
      setTimeout(() => hideMessage(element), 5000);
    }

    function compactXml(input) {
      return xmlFormatter(input, { indentation: '', lineSeparator: '' });
    }

    transformBtn.addEventListener('click', () => {
      try {
        const xml = xmlEditor.getValue();
        if (!xml.length) {
          return;
        }
        const result = xmljs.xml2json(compactXml(xml), { compact: true, spaces: 0 });
        const json = JSON.stringify(JSON.parse(result), null, 2);
        jsonEditor.setValue(json, -1);
      } catch (e) {
        showMessage(xmlToJsonMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    toggleWrapXmlInputBtn.addEventListener('click', () => {
      if (!xmlEditor.getValue().length) {
        return;
      }
      const isWrapped = toggleWrapXmlInputBtn.dataset.wrap === 'yes';
      if (isWrapped) {
        xmlEditor.session.setUseWrapMode(false);
        toggleWrapXmlInputBtn.dataset.wrap = 'no';
        toggleWrapXmlInputBtn.innerText = 'Wrap';
      } else {
        xmlEditor.session.setUseWrapMode(true);
        toggleWrapXmlInputBtn.dataset.wrap = 'yes';
        toggleWrapXmlInputBtn.innerText = 'Unwrap';
      }
    });

    formatXmlBtn.addEventListener('click', () => {
      try {
        hideMessage(xmlToJsonMessage);
        const input = xmlEditor.getValue();
        if (!input.length) {
          return;
        }
        xmlEditor.setValue(xmlFormatter(input, xmlFormatterOption), -1);
      } catch (e) {
        showMessage(xmlToJsonMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    compactXmlInputBtn.addEventListener('click', () => {
      try {
        hideMessage(xmlToJsonMessage);
        const input = xmlEditor.getValue();
        if (!input.length) {
          return;
        }
        xmlEditor.setValue(compactXml(input), -1);
      } catch (e) {
        showMessage(xmlToJsonMessage, e.message, ALERT_TYPE_ERROR);
      }
    });

    increaseFontBtn.addEventListener('click', () => {
      const currentFontSizeXmlEditor = parseInt(xmlEditorInput.style.fontSize.split('px')[0]);
      if (currentFontSizeXmlEditor < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        xmlEditorInput.style.fontSize = `${currentFontSizeXmlEditor + 1}px`;
      }

      const currentFontSizeJsonEditor = parseInt(jsonEditorInput.style.fontSize.split('px')[0]);
      if (currentFontSizeJsonEditor < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        jsonEditorInput.style.fontSize = `${currentFontSizeJsonEditor + 1}px`;
      }
    });

    decreaseFontBtn.addEventListener('click', () => {
      const currentFontSizeXmlEditor = parseInt(xmlEditorInput.style.fontSize.split('px')[0]);
      if (currentFontSizeXmlEditor > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        xmlEditorInput.style.fontSize = `${currentFontSizeXmlEditor - 1}px`;
      }

      const currentFontSizeJsonEditor = parseInt(jsonEditorInput.style.fontSize.split('px')[0]);
      if (currentFontSizeJsonEditor > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        jsonEditorInput.style.fontSize = `${currentFontSizeJsonEditor - 1}px`;
      }
    });
  };
};
