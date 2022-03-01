'use strict';

module.exports = function EditorContextMenuBuilder({ prefix }) {
  const self = this;
  const html = [];

  this.withCutMenuItem = () => {
    html.push(
      `<span class="list-group-item list-group-item-action text-sm-start" id="${prefix}-editor-context-menu-cut-btn">Cut</span>`
    );
    return self;
  };

  this.withCopyMenuItem = () => {
    html.push(
      `<span class="list-group-item list-group-item-action text-sm-start" id="${prefix}-editor-context-menu-copy-btn">Copy</span>`
    );
    return self;
  };

  this.withPasteMenuItem = () => {
    html.push(
      `<span class="list-group-item list-group-item-action text-sm-start" id="${prefix}-editor-context-menu-paste-btn">Paste</span>`
    );
    return self;
  };

  this.withSelectAllMenuItem = () => {
    html.push(
      `<span class="list-group-item list-group-item-action text-sm-start" id="${prefix}-editor-context-menu-select-all-btn">Select All</span>`
    );
    return self;
  };

  this.build = () => {
    return `<div class="position-fixed shadow-sm d-none sanduk-context-menu" 
      style="z-index: 10"
      data-eventData="{}" 
      id="${prefix}-editor-context-menu-container">
      <div class="list-group">${html.join('')}</div>
    </div>`;
  };
};
