'use strict';
const { ipcRenderer } = require('electron');
const path = require('path');

const {
  CHANNEL_OPEN_FILE_DIALOG_EDITOR,
  CHANNEL_OPEN_FILE_DIALOG_EDITOR_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH
} = require('../../main-process/constants/channel-constants');

const fs = require('fs');

const {
  ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS
} = require('../constants/ace-editor-constants');

module.exports = function EditorToolComponent() {
  this.getHtml = () => {
    return `<!-- editor -->
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">Editor</p>
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
                    id="increase-font-input-editor-btn">
                    <i class="fas fa-search-plus"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="decrease-font-input-editor-btn">
                    <i class="fas fa-search-minus"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="open-file-editor-btn">
                    <i class="fas fa-folder-open"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="save-file-editor-btn">
                    <i class="fas fa-save"></i>
            </button>
          </div>
        </div>

        <!-- input editor -->
        <pre class="form-control"
             id="editor-input-editor"
             style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
        <div class="bg-dark p-5">
          <span 
            id="input-footer-editor" 
            class="d-inline-block">Ln: 1 Col: 1</span>
          <span 
            id="opened-filename-footer-editor" 
            class="d-inline-block float-right">Untitled</span>
        </div>
      </div>
      <div id="editor-input-editor-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const editorInput = document.getElementById('editor-input-editor');
    const editorFooter = document.getElementById('input-footer-editor');
    const openFileBtn = document.getElementById('open-file-editor-btn');
    const saveFileBtn = document.getElementById('save-file-editor-btn');
    const increaseFontInputBtn = document.getElementById('increase-font-input-editor-btn');
    const decreaseFontInputBtn = document.getElementById('decrease-font-input-editor-btn');
    const openedFileName = document.getElementById('opened-filename-footer-editor');

    const dummyFileName = 'Untitled';
    let openedFilePath;
    let openedFileChanged = false;
    let editorInputEditor;

    const theme = 'ace/theme/idle_fingers';
    // cobalt, idle_fingers, merbivore_soft
    // dracula*, gruvbox*, tomorrow_night_eighties*
    // const mode = 'ace/mode/json';

    editorInputEditor = window.ace.edit('editor-input-editor');
    editorInputEditor.setTheme(theme);
    // editorInputEditor.session.setMode(mode);
    editorInputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = editorInputEditor.getCursorPosition();
      editorFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });

    editorInputEditor.commands.on('afterExec', eventData => {
      if (!openedFileChanged && eventData.command.name === 'insertstring') {
        openedFileChanged = true;
        if (openedFilePath) {
          openedFileName.innerText = `${path.basename(openedFilePath).substr(0, 20)}*`;
        } else {
          openedFileName.innerText = `${dummyFileName}*`;
        }
      }
    });

    editorInputEditor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: () => {
        if (!openedFilePath) {
          ipcRenderer.send(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR);
        } else {
          writeToFile(openedFilePath);
        }
      }
    });

    editorInputEditor.commands.addCommand({
      name: 'open',
      bindKey: { win: 'Ctrl-O', mac: 'Cmd-O' },
      exec: () => {
        ipcRenderer.send(CHANNEL_OPEN_FILE_DIALOG_EDITOR);
      }
    });

    function writeToFile(filePath) {
      try {
        openedFileName.innerText = 'Saving...';
        const data = editorInputEditor.getValue();
        fs.writeFileSync(filePath, data, 'utf8');
      } catch (e) {
        //
      } finally {
        openedFileChanged = false;
        openedFilePath = filePath;
        openedFileName.innerText = path.basename(openedFilePath).substr(0, 20);
      }
    }

    ipcRenderer.on(CHANNEL_OPEN_FILE_DIALOG_EDITOR_FILE_PATH, async (e, args) => {
      try {
        openedFilePath = args.filePath;
        openedFileName.innerText = path.basename(openedFilePath).substr(0, 20);
        const data = fs.readFileSync(args.filePath).toString();
        editorInputEditor.getSession().setValue(data, -1);
      } catch (e) {
        //
      }
    });

    ipcRenderer.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR_FILE_PATH, async (e, args) => {
      writeToFile(args.filePath);
    });

    openFileBtn.addEventListener('click', () => {
      ipcRenderer.send(CHANNEL_OPEN_FILE_DIALOG_EDITOR);
    });

    saveFileBtn.addEventListener('click', () => {
      ipcRenderer.send(CHANNEL_OPEN_SAVE_FILE_DIALOG_EDITOR);
    });

    increaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(editorInput.style.fontSize.split('px')[0]);
      if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        editorInput.style.fontSize = `${currentFontSize + 1}px`;
      }
    });

    decreaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(editorInput.style.fontSize.split('px')[0]);
      if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        editorInput.style.fontSize = `${currentFontSize - 1}px`;
      }
    });
  };
};
