'use strict';

const {
  ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS
} = require('../constants/ace-editor-constants');

function increaseFontSize(htmlElement) {
  const currentFontSize = parseInt(htmlElement.style.fontSize.split('px')[0]);
  if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
    htmlElement.style.fontSize = `${currentFontSize + 1}px`;
  }
}

function decreaseFontSize(htmlElement) {
  const currentFontSize = parseInt(htmlElement.style.fontSize.split('px')[0]);
  if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
    htmlElement.style.fontSize = `${currentFontSize - 1}px`;
  }
}

function resetFontSize(htmlElement) {
  htmlElement.style.fontSize = `${ACE_EDITOR_DEFAULT_FONT_SIZE_IN_PIXELS}px`;
}

module.exports = { increaseFontSize, decreaseFontSize, resetFontSize };
