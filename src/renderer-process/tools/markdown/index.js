'use strict';

const fs = require('fs');
const path = require('path');
const immutabilityHelper = require('immutability-helper');
const markdown = require('markdown-it')();
const sanitizeHtml = require('sanitize-html');
const { theme: aceTheme, mode: aceMode } = require('../../constants/ace-editor-constants');
const fontSize = require('../../editor/font-size');
const wrapUnwrapContent = require('../../editor/wrap-unwrap-content');

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
  const viewEditorOnlyBtn = document.getElementById('view-editor-only-markdown-btn');
  const viewEditorAndPreviewBtn = document.getElementById('view-editor-and-preview-markdown-btn');
  const viewPreviewOnlyBtn = document.getElementById('view-preview-only-markdown-btn');
  const toggleWrapInputBtn = document.getElementById('markdown-toggle-wrap-input-btn');
  const markdownEditorColumnElem = document.getElementById('sanduk-markdown-editor-column');
  const markdownOutputColumnElem = document.getElementById('sanduk-markdown-output-column');
  const markdownOutput = document.getElementById('markdown-iframe-output');
  const inputFooter = document.getElementById('markdown-editor-footer');
  const markdownInputElem = document.getElementById('markdown-editor');

  let markdownInputEditor;
  markdownInputEditor = window.ace.edit('markdown-editor');
  markdownInputEditor.setTheme(aceTheme);
  markdownInputEditor.session.setMode(aceMode.markdown);
  markdownInputEditor.setShowPrintMargin(false);
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

  viewEditorOnlyBtn.addEventListener('click', () => {
    markdownEditorColumnElem.className =
      markdownEditorColumnElem.getAttribute('data-viewEditorOnly');
    markdownOutputColumnElem.className =
      markdownOutputColumnElem.getAttribute('data-viewEditorOnly');
  });

  viewEditorAndPreviewBtn.addEventListener('click', () => {
    markdownEditorColumnElem.className = markdownEditorColumnElem.getAttribute(
      'data-viewEditorAndPreview'
    );
    markdownOutputColumnElem.className = markdownOutputColumnElem.getAttribute(
      'data-viewEditorAndPreview'
    );
  });

  viewPreviewOnlyBtn.addEventListener('click', () => {
    markdownEditorColumnElem.className =
      markdownEditorColumnElem.getAttribute('data-viewPreviewOnly');
    markdownOutputColumnElem.className =
      markdownOutputColumnElem.getAttribute('data-viewPreviewOnly');
  });

  toggleWrapInputBtn.addEventListener('click', () => {
    wrapUnwrapContent({
      wrapBtn: toggleWrapInputBtn,
      editor: markdownInputEditor
    });
  });
};
