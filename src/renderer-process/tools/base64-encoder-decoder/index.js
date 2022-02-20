'use strict';

const fs = require('fs');
const path = require('path');
const base64 = require('base-64');
const utf8 = require('utf8');
const popError = require('../../helpers/pop-error');
const popInfo = require('../../helpers/pop-info');
const clearContent = require('../../helpers/clear-content');
const tabHtmlTemplate = require('./templates/tab-html-template');
const tabPaneHtmlTemplate = require('./templates/tab-pane-html-template');
const inProgressTextAnimate = require('../../helpers/in-progress-text-animate');
const activeTabElement = require('../../helpers/active-tab-element');
const wrapBtnHandler = require('../../editor/handlers/wrap-btn-handler');
const copyBtnHandler = require('../../editor/handlers/copy-btn-handler');
const clearBtnHandler = require('../../editor/handlers/clear-btn-handler');
const setupEditor = require('../../editor/setup-editor');
const fontSize = require('../../editor/font-size');

module.exports = function base64EncoderDecoder() {
  document.getElementById('v-pills-base64-encoder-decoder').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById(
    'increase-font-input-base64-encoder-decoder-btn'
  );
  const decreaseFontInputBtn = document.getElementById(
    'decrease-font-input-base64-encoder-decoder-btn'
  );
  const resetFontInputBtn = document.getElementById('reset-font-input-base64-encoder-decoder-btn');
  const base64EncodeDecodeMessage = document.getElementById('base64-encoder-decoder-message');

  const totalTabs = 7;
  document.getElementById('base64EncoderDecoderTab').innerHTML = Array.from(Array(totalTabs).keys())
    .map((id, index) => tabHtmlTemplate(id + 1, index === 0))
    .join('');
  document.getElementById('base64EncoderDecoderTabContent').innerHTML = Array.from(
    Array(totalTabs).keys()
  )
    .map((id, index) => tabPaneHtmlTemplate(id + 1, index === 0))
    .join('');

  const inputFooters = [];
  const outputFooters = [];
  const inputEditors = [];
  const inputElems = [];
  const outputEditors = [];
  const outputElems = [];
  const encodeBtns = document.getElementsByClassName(
    'base64-encoder-decoder-plaintext-input-editor-encode-btn'
  );
  const decodeBtns = document.getElementsByClassName(
    'base64-encoder-decoder-encoded-output-editor-decode-btn'
  );
  const plainTextWrapBtns = document.getElementsByClassName(
    'base64-encoder-decoder-plaintext-input-editor-wrap-btn'
  );
  const encodedTextWrapBtns = document.getElementsByClassName(
    'base64-encoder-decoder-encoded-output-editor-wrap-btn'
  );
  const plainTextCopyBtns = document.getElementsByClassName(
    'base64-encoder-decoder-plaintext-input-editor-copy-btn'
  );
  const encodedTextCopyBtns = document.getElementsByClassName(
    'base64-encoder-decoder-encoded-output-editor-copy-btn'
  );
  const plainTextClearBtns = document.getElementsByClassName(
    'base64-encoder-decoder-plaintext-input-editor-clear-btn'
  );
  const encodedTextClearBtns = document.getElementsByClassName(
    'base64-encoder-decoder-encoded-output-editor-clear-btn'
  );

  for (let id = 1; id <= totalTabs; id++) {
    inputFooters.push(
      document.getElementById(`base64-encoder-decoder-plaintext-input-editor-${id}-footer`)
    );
    outputFooters.push(
      document.getElementById(`base64-encoder-decoder-encoded-output-editor-${id}-footer`)
    );

    let inputEditor = window.ace.edit(`base64-encoder-decoder-plaintext-input-editor-${id}`);
    setupEditor({ editor: inputEditor, rowColumnPositionElement: inputFooters[id - 1] });
    inputEditors.push(inputEditor);

    let outputEditor = window.ace.edit(`base64-encoder-decoder-encoded-output-editor-${id}`);
    setupEditor({ editor: outputEditor, rowColumnPositionElement: outputFooters[id - 1] });
    outputEditors.push(outputEditor);

    inputElems.push(document.getElementById(`base64-encoder-decoder-plaintext-input-editor-${id}`));
    outputElems.push(document.getElementById(`base64-encoder-decoder-encoded-output-editor-${id}`));
  }

  const getActiveTabId = () =>
    activeTabElement.getActiveTabIdByClassName('sanduk-base64-encoder-decoder-tab active', 'tabid');

  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, plainTextWrapBtns, inputEditors);
  wrapBtnHandler.initWrapBtnHandler(getActiveTabId, encodedTextWrapBtns, outputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, plainTextCopyBtns, inputEditors);
  copyBtnHandler.initCopyBtnHandler(getActiveTabId, encodedTextCopyBtns, outputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, plainTextClearBtns, inputEditors);
  clearBtnHandler.initClearBtnHandler(getActiveTabId, encodedTextClearBtns, outputEditors);

  for (const btn of encodeBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(base64EncodeDecodeMessage);
        const input = inputEditors[activeTabId - 1].getValue();
        if (input.length) {
          inProgressTextAnimate(encodeBtns[activeTabId - 1], 'Encode', 'Encoding!', 200);
          outputEditors[activeTabId - 1].setValue(base64.encode(utf8.encode(input)), -1);
        } else {
          popInfo(base64EncodeDecodeMessage, 'Nothing to encode', 1000);
        }
      } catch (e) {
        popError(base64EncodeDecodeMessage, e.message);
      }
    });
  }

  for (const btn of decodeBtns) {
    btn.addEventListener('click', () => {
      const activeTabId = getActiveTabId();
      try {
        clearContent(base64EncodeDecodeMessage);
        const input = outputEditors[activeTabId - 1].getValue();
        if (input.length) {
          inProgressTextAnimate(decodeBtns[activeTabId - 1], 'Decode', 'Decoding!', 200);
          inputEditors[activeTabId - 1].setValue(utf8.decode(base64.decode(input)), -1);
        } else {
          popInfo(base64EncodeDecodeMessage, 'Nothing to decode', 1000);
        }
      } catch (e) {
        popError(base64EncodeDecodeMessage, e.message);
      }
    });
  }

  increaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.increaseFontSize(inputElems[activeTabId - 1]);
    fontSize.increaseFontSize(outputElems[activeTabId - 1]);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.decreaseFontSize(inputElems[activeTabId - 1]);
    fontSize.decreaseFontSize(outputElems[activeTabId - 1]);
  });

  resetFontInputBtn.addEventListener('click', () => {
    const activeTabId = getActiveTabId();
    fontSize.resetFontSize(inputElems[activeTabId - 1]);
    fontSize.resetFontSize(outputElems[activeTabId - 1]);
  });
};
