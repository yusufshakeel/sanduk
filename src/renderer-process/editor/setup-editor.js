'use strict';

const { theme: aceTheme, mode: aceMode } = require('../constants/ace-editor-constants');

module.exports = function setupEditor({
  editor,
  rowColumnPositionElement,
  theme = aceTheme,
  mode = aceMode.text,
  showPrintMargin = false,
  useWrapMode = false
}) {
  editor.setTheme(theme);
  editor.session.setMode(mode);
  editor.session.setUseWrapMode(useWrapMode);
  editor.setShowPrintMargin(showPrintMargin);
  rowColumnPositionElement &&
    editor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = editor.getCursorPosition();
      rowColumnPositionElement.innerText = `${row + 1}:${column + 1}`;
    });
};
