'use strict';
const { ipcRenderer } = require('electron');
const markdown = require('markdown-it')();
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');

const {
  CHANNEL_OPEN_FILE_DIALOG_MARKDOWN,
  CHANNEL_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN,
  CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH
} = require('../../main-process/constants/channel-constants');

const {
  ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS,
  ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS
} = require('../constants/ace-editor-constants');

module.exports = function MarkdownToolComponent() {
  this.getHtml = () => {
    return `<!-- markdown -->
  <div class="row">
    <div class="col-12 text-center">
      <p class="font-size-20 my-0">Markdown</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12 px-5 pt-5">
      <!-- menu -->
      <div class="text-center">
        <div class="btn-group" role="group">
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="generate-markdown-btn">Generate
          </button>
          <button class="btn btn-default btn-rounded"
                  data-sanduk-auto-load-markdown-isActive="false"
                  type="button"
                  id="auto-load-markdown-btn">Auto
          </button>
        </div>

        <div class="btn-group" role="group">
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="increase-font-markdown-btn">
                    <i class="fas fa-search-plus"></i>
          </button>
          <button class="btn btn-primary btn-rounded"
                  type="button"
                  id="decrease-font-markdown-btn">
                    <i class="fas fa-search-minus"></i>
          </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="open-file-markdown-btn">
                    <i class="fas fa-folder-open"></i>
            </button>
            <button class="btn btn-primary btn-rounded"
                    type="button"
                    id="save-file-markdown-btn">
                    <i class="fas fa-save"></i>
            </button>
        </div>
      </div>    
    </div>
    
    <div class="col-6 px-5">
      <!-- markdown editor -->
      <pre class="form-control"
           id="markdown-editor"
           style="height: 65vh; font-size: 16px; margin-bottom: 0"></pre>
       <div id="markdown-editor-footer" class="bg-dark p-5">Ln: 1 Col: 1</div>
    </div>
    
    <div class="col-6 px-5">
      <div
        id="markdown-iframe-output"
        class="py-5"
        style="border: 1px solid #444; 
          overflow: scroll; 
          padding: 5px;
          margin-top: 16px;
          height: 69.5vh;"></div>
    </div>
    
    <div class="col-12 p-5">
      <div id="xml-to-json-message"></div>
    </div>
  </div>`;
  };

  this.init = () => {
    const autoLoadBtn = document.getElementById('auto-load-markdown-btn');
    const markdownEditor = document.getElementById('markdown-editor');
    const markdownOutput = document.getElementById('markdown-iframe-output');
    const generateBtn = document.getElementById('generate-markdown-btn');
    const inputFooter = document.getElementById('markdown-editor-footer');
    const openFileBtn = document.getElementById('open-file-markdown-btn');
    const saveFileBtn = document.getElementById('save-file-markdown-btn');
    const increaseFontInputBtn = document.getElementById('increase-font-markdown-btn');
    const decreaseFontInputBtn = document.getElementById('decrease-font-markdown-btn');

    let markdownInputEditor;

    let isAutoloading = false;

    const theme = 'ace/theme/idle_fingers';
    // cobalt, idle_fingers, merbivore_soft
    // dracula*, gruvbox*, tomorrow_night_eighties*
    const mode = 'ace/mode/markdown';

    markdownInputEditor = window.ace.edit('markdown-editor');
    markdownInputEditor.setTheme(theme);
    markdownInputEditor.session.setMode(mode);
    markdownInputEditor.selection.on('changeCursor', () => {
      const { row = 0, column = 0 } = markdownInputEditor.getCursorPosition();
      inputFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
    });

    ipcRenderer.on(CHANNEL_OPEN_FILE_DIALOG_MARKDOWN_FILE_PATH, async (e, args) => {
      try {
        const markdownData = fs.readFileSync(args.filePath).toString();
        markdownInputEditor.getSession().setValue(markdownData, -1);
      } catch (e) {
        //
      }
    });

    ipcRenderer.on(CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN_FILE_PATH, async (e, args) => {
      try {
        const data = markdownInputEditor.getValue();
        fs.writeFileSync(args.filePath, data, 'utf8');
      } catch (e) {
        //
      }
    });

    openFileBtn.addEventListener('click', () => {
      ipcRenderer.send(CHANNEL_OPEN_FILE_DIALOG_MARKDOWN);
    });

    saveFileBtn.addEventListener('click', () => {
      ipcRenderer.send(CHANNEL_OPEN_SAVE_FILE_DIALOG_MARKDOWN);
    });

    const renderMarkdown = () => {
      const markdownData = markdownInputEditor.getValue();
      // markdownOutput.innerHTML = sanitizeHtml(marked(markdownData));
      markdownOutput.innerHTML = markdown.render(sanitizeHtml(markdownData));
    };

    markdownInputEditor.commands.on('afterExec', () => {
      if (isAutoloading) {
        renderMarkdown();
      }
    });

    autoLoadBtn.addEventListener('click', () => {
      isAutoloading = true;
      autoLoadBtn.classList.remove('btn-default');
      autoLoadBtn.classList.add('btn-primary');
      generateBtn.classList.remove('btn-primary');
      generateBtn.classList.add('btn-default');
      renderMarkdown();
    });

    generateBtn.addEventListener('click', () => {
      if (isAutoloading) {
        isAutoloading = false;
        generateBtn.classList.add('btn-primary');
        generateBtn.classList.remove('btn-default');
        autoLoadBtn.classList.add('btn-default');
        autoLoadBtn.classList.remove('btn-primary');
      }
      renderMarkdown();
    });

    increaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(markdownEditor.style.fontSize.split('px')[0]);
      if (currentFontSize < ACE_EDITOR_MAX_FONT_SIZE_IN_PIXELS) {
        markdownEditor.style.fontSize = `${currentFontSize + 1}px`;
      }
    });

    decreaseFontInputBtn.addEventListener('click', () => {
      const currentFontSize = parseInt(markdownEditor.style.fontSize.split('px')[0]);
      if (currentFontSize > ACE_EDITOR_MIN_FONT_SIZE_IN_PIXELS) {
        markdownEditor.style.fontSize = `${currentFontSize - 1}px`;
      }
    });
  };
};
