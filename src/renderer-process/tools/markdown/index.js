'use strict';

const fs = require('fs');
const path = require('path');
const immutabilityHelper = require('immutability-helper');
const markdown = require('markdown-it')();
const sanitizeHtml = require('sanitize-html');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');

module.exports = function markdownTool() {
  document.getElementById('v-pills-markdown').innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'ui.html'),
    'utf8'
  );

  const autoLoadBtn = document.getElementById('auto-load-markdown-btn');
  const markdownOutput = document.getElementById('markdown-iframe-output');
  const generateBtn = document.getElementById('generate-markdown-btn');
  const inputFooter = document.getElementById('markdown-editor-footer');

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
    const enrichedHtml = `
      <style>
      pre { border: 1px solid #999; padding: 5px; font-family: monospace; }
      table th, table td { border: 1px solid #999; padding: 5px; margin: 0; }
      </style>
      ${sanitizedHtml}`;
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
      autoLoadBtn.innerHTML = 'Auto Off';
    } else {
      isAutoLoading = true;
      autoLoadBtn.innerHTML = 'Auto On';
    }
    renderMarkdown();
  });

  generateBtn.addEventListener('click', () => {
    if (isAutoLoading) {
      isAutoLoading = false;
      autoLoadBtn.innerHTML = 'Auto Off';
    }
    renderMarkdown();
  });
};
