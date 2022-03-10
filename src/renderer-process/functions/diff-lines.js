'use strict';

const DiffFinder = require('./diff-finder');

function enrichedLines({ source, destination }) {
  const sourceLines = source.split('\n');
  const destinationLines = destination.split('\n');

  if (sourceLines.length > destinationLines.length) {
    const emptyLines = new Array(sourceLines.length - destinationLines.length).fill('');
    return { sourceLines, destinationLines: [...destinationLines, ...emptyLines] };
  } else if (sourceLines.length < destinationLines.length) {
    const emptyLines = new Array(destinationLines.length - sourceLines.length).fill('');
    return { sourceLines: [...sourceLines, ...emptyLines], destinationLines };
  }

  return { sourceLines, destinationLines };
}

function diffLines({ source, destination }) {
  const diffFinder = new DiffFinder();

  const { sourceLines, destinationLines } = enrichedLines({ source, destination });

  const formattedSourceLines = [];
  const formattedDestinationLines = [];

  for (let i = 0; i < sourceLines.length; i++) {
    const diffs = diffFinder.diff_main(sourceLines[i], destinationLines[i]);
    diffFinder.diff_cleanupSemantic(diffs);

    const before = diffFinder.beforeContent(diffs);
    const after = diffFinder.afterContent(diffs);

    const sourceLineChanged = before.includes('sanduk-diff-del-op')
      ? 'sanduk-line-changed sanduk-del-op'
      : '';
    const destinationLineChanged = after.includes('sanduk-diff-ins-op')
      ? 'sanduk-line-changed sanduk-ins-op'
      : '';
    formattedSourceLines.push(
      `<span class="sanduk-compare-tool-line ${sourceLineChanged}"><span class="sanduk-line-number">${
        i + 1
      }</span> ${before}</span>`
    );
    formattedDestinationLines.push(
      `<span class="sanduk-compare-tool-line ${destinationLineChanged}"><span class="sanduk-line-number">${
        i + 1
      }</span> ${after}</span>`
    );
  }

  return { formattedSourceLines, formattedDestinationLines };
}

module.exports = { diffLines, enrichedLines };
