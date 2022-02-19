'use strict';

const fs = require('fs');
const path = require('path');
const immutabilityHelper = require('immutability-helper');
const markdown = require('markdown-it')();
const sanitizeHtml = require('sanitize-html');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const fontSize = require('../../editor/font-size');

module.exports = function markdownTool() {
  document.getElementById('v-pills-markdown').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const gitHubMarkdownCss = fs.readFileSync(
    path.resolve(__dirname, 'github-markdown.min.css'),
    'utf8'
  );

  const increaseFontInputBtn = document.getElementById('increase-font-input-markdown-btn');
  const decreaseFontInputBtn = document.getElementById('decrease-font-input-markdown-btn');
  const resetFontInputBtn = document.getElementById('reset-font-input-markdown-btn');
  const autoLoadBtn = document.getElementById('auto-load-markdown-btn');
  const markdownOutput = document.getElementById('markdown-iframe-output');
  const generateBtn = document.getElementById('generate-markdown-btn');
  const inputFooter = document.getElementById('markdown-editor-footer');
  const markdownInputElem = document.getElementById('markdown-editor');

  let markdownInputEditor;
  let isAutoLoading = false;

  markdownInputEditor = window.ace.edit('markdown-editor');
  markdownInputEditor.setTheme(aceTheme);
  markdownInputEditor.session.setMode(aceMode.markdown);
  markdownInputEditor.selection.on('changeCursor', () => {
    const { row = 0, column = 0 } = markdownInputEditor.getCursorPosition();
    inputFooter.innerText = `Ln: ${row + 1} Col: ${column + 1}`;
  });

  const renderMarkdown = () => {
    const markdownData = markdownInputEditor.getValue();
    const html = markdown.render(markdownData);
    const sanitizedHtml = sanitizeHtml(html, {
      transformTags: {
        a: function (tagName, attribs) {
          const modifiedAttributes = immutabilityHelper(attribs, {
            href: { $set: '#' }
          });
          return {
            tagName: tagName,
            attribs: modifiedAttributes
          };
        }
      }
    });
    const enrichedHtml = `<style>${gitHubMarkdownCss}</style><article class="markdown-body">${sanitizedHtml}</article>`;
    markdownOutput.contentDocument.write(enrichedHtml);
    markdownOutput.contentDocument.close();
  };

  markdownInputEditor.commands.on('afterExec', () => {
    if (isAutoLoading) {
      renderMarkdown();
    }
  });

  autoLoadBtn.addEventListener('click', () => {
    if (isAutoLoading) {
      isAutoLoading = false;
      autoLoadBtn.innerHTML = 'Auto <i class="fas fa-toggle-off"></i>';
    } else {
      isAutoLoading = true;
      autoLoadBtn.innerHTML = 'Auto <i class="fas fa-toggle-on"></i>';
    }
    renderMarkdown();
  });

  generateBtn.addEventListener('click', () => {
    if (isAutoLoading) {
      isAutoLoading = false;
      autoLoadBtn.innerHTML = 'Auto <i class="fas fa-toggle-off"></i>';
    }
    renderMarkdown();
  });

  increaseFontInputBtn.addEventListener('click', () => {
    fontSize.increaseFontSize(markdownInputElem);
  });

  decreaseFontInputBtn.addEventListener('click', () => {
    fontSize.decreaseFontSize(markdownInputElem);
  });

  resetFontInputBtn.addEventListener('click', () => {
    fontSize.resetFontSize(markdownInputElem);
  });
};
