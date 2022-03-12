'use strict';

const DMP = require('diff-match-patch');

class DiffFinder extends DMP {
  constructor() {
    super();

    this.INSERT_OP = 1;
    this.DELETE_OP = -1;
    this.NO_OP = 0;
  }

  transformContent(content) {
    return content.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;');
  }

  beforeContent(diffs) {
    const lines = [];
    diffs.forEach(([op, content]) => {
      const enrichedContent = this.transformContent(content);
      if (op === this.DELETE_OP) {
        lines.push(`<span class="sanduk-diff-del-op">${enrichedContent}</span>`);
      } else if (op === this.NO_OP) {
        lines.push(enrichedContent);
      } else if (op === this.INSERT_OP) {
        // lines.push(`<span class="sanduk-diff-context-added">${enrichedContent}</span>`);
        lines.push(`<sanduk-content-added>${enrichedContent}</sanduk-content-added>`);
      }
    });
    return lines.join('');
  }

  afterContent(diffs) {
    const lines = [];
    diffs.forEach(([op, content]) => {
      const enrichedContent = this.transformContent(content);
      if (op === this.INSERT_OP) {
        lines.push(`<span class="sanduk-diff-ins-op">${enrichedContent}</span>`);
      } else if (op === this.NO_OP) {
        lines.push(enrichedContent);
      } else if (op === this.DELETE_OP) {
        // lines.push(`<span class="sanduk-diff-context-removed">${enrichedContent}</span>`);
        lines.push(`<sanduk-content-removed>${enrichedContent}</sanduk-content-removed>`);
      }
    });
    return lines.join('');
  }
}

module.exports = DiffFinder;
