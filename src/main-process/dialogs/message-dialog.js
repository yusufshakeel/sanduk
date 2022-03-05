'use strict';

const { dialog } = require('electron');

module.exports = function messageDialog(browserWindow, electronDialog = dialog) {
  const showOpenDialog = async option => {
    const result = await electronDialog.showOpenDialog(browserWindow, option);
    return !result.canceled && result.filePaths.length ? { filePath: result.filePaths[0] } : {};
  };

  const showSaveDialog = async option => {
    const result = await electronDialog.showSaveDialog(browserWindow, option);
    return !result.canceled && result.filePath ? { filePath: result.filePath } : {};
  };

  const showErrorDialog = async error => {
    await electronDialog.showMessageBox(browserWindow, {
      type: 'error',
      message: error.message ? error.message : 'Some error occurred!'
    });
  };

  const showOpenDialogToSelectJsonFile = async () => {
    return showOpenDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showSaveDialogToSaveJsonFile = async () => {
    return showSaveDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openDirectory']
    });
  };

  const showOpenDialogToSelectXmlFile = async () => {
    return showOpenDialog({
      filters: [{ name: 'XML', extensions: ['xml'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showSaveDialogToSaveXmlFile = async () => {
    return showSaveDialog({
      filters: [{ name: 'XML', extensions: ['xml'] }],
      properties: ['openDirectory']
    });
  };

  const showOpenDialogToSelectFile = async () => {
    return showOpenDialog({
      properties: ['openFile', 'openDirectory']
    });
  };

  const showSaveDialogToSaveFile = async () => {
    return showSaveDialog({
      properties: ['openDirectory']
    });
  };

  const showOpenDialogToSelectMarkdownFile = async () => {
    return showOpenDialog({
      filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showSaveDialogToSaveMarkdownFile = async () => {
    return showSaveDialog({
      filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showOpenDialogToSelectCanvasFile = async () => {
    return showOpenDialog({
      filters: [{ name: 'Image', extensions: ['png'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showSaveDialogToSaveCanvasFile = async () => {
    return showSaveDialog({
      filters: [{ name: 'Image', extensions: ['png'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showMessageBoxUnsavedChanges = async option => {
    return electronDialog.showMessageBox(browserWindow, option);
  };

  return {
    showOpenDialog,
    showSaveDialog,
    showErrorDialog,
    showOpenDialogToSelectJsonFile,
    showSaveDialogToSaveJsonFile,
    showOpenDialogToSelectXmlFile,
    showSaveDialogToSaveXmlFile,
    showOpenDialogToSelectFile,
    showSaveDialogToSaveFile,
    showOpenDialogToSelectMarkdownFile,
    showSaveDialogToSaveMarkdownFile,
    showOpenDialogToSelectCanvasFile,
    showSaveDialogToSaveCanvasFile,
    showMessageBoxUnsavedChanges
  };
};
