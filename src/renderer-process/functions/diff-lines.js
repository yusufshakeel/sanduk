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
    formattedSourceLines.push(diffFinder.beforeContent(diffs));
    formattedDestinationLines.push(diffFinder.afterContent(diffs));
  }

  return { formattedSourceLines, formattedDestinationLines };
}

module.exports = { diffLines, enrichedLines };
