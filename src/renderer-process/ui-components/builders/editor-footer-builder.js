'use strict';

const editorFooterLineColumnPositionComponent = require('../editor-footer-line-column-position-component');

module.exports = function EditorFooterBuilder({ prefix, id }) {
  const self = this;

  this.withRowColumnPosition = () => {
    self.rowColumnPosition = editorFooterLineColumnPositionComponent.getHtml({ prefix, id });
    return self;
  };

  this.build = () => {
    const html = [];
    self.rowColumnPosition.length && html.push(self.rowColumnPosition);

    return `<div class="bg-light p-1 font-monospace ${prefix}-editor-footer-${id}">
      ${html.join('')}
    </div>`;
  };
};
