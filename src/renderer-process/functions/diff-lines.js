'use strict';

const DiffFinder = require('./diff-finder');

function trimSandukTags(lines) {
  const EMPTY = '';
  const EMPTY_LINE = '';
  const CLOSING_TAG_CONTENT_ADDED = '</sanduk-content-added>';
  const CLOSING_TAG_CONTENT_REMOVED = '</sanduk-content-removed>';

  let closingTag = '';
  let isInspectingMultipleLines = false;

  return lines.reduce((result, line) => {
    let updatedLine = line;
    if (isInspectingMultipleLines) {
      const indexOfFirstClosingTag = line.indexOf(closingTag);
      if (indexOfFirstClosingTag > -1) {
        updatedLine = updatedLine.substring(indexOfFirstClosingTag + closingTag.length);
        isInspectingMultipleLines = false;
        if (updatedLine.length === 0) {
          updatedLine = EMPTY_LINE;
          return [...result, updatedLine];
        }
      } else {
        updatedLine = EMPTY_LINE;
        return [...result, updatedLine];
      }
    }

    updatedLine = updatedLine
      // remove tags and its content that takes the whole line
      .replace(/^<sanduk-content-added">.*<\/sanduk-content-added>$/gi, EMPTY_LINE)
      .replace(/^<sanduk-content-removed">.*<\/sanduk-content-removed>$/gi, EMPTY_LINE)
      // remove tags and its content that are within the line
      .replace(/<sanduk-content-added>.*<\/sanduk-content-added>/gi, EMPTY)
      .replace(/<sanduk-content-removed>.*<\/sanduk-content-removed>/gi, EMPTY);

    // current line open span tag that ends in some other line
    if (!isInspectingMultipleLines && /<sanduk-content-added>.*$/gi.test(updatedLine)) {
      isInspectingMultipleLines = true;
      closingTag = CLOSING_TAG_CONTENT_ADDED;
      updatedLine = updatedLine.replace(/<sanduk-content-added>.*$/gi, EMPTY);
    } else if (!isInspectingMultipleLines && /<sanduk-content-removed>.*$/gi.test(updatedLine)) {
      isInspectingMultipleLines = true;
      closingTag = CLOSING_TAG_CONTENT_REMOVED;
      updatedLine = updatedLine.replace(/<sanduk-content-removed>.*$/gi, EMPTY);
    }

    return [...result, updatedLine];
  }, []);
}

function lineWithClosingTags({ lines, OPENING_TAG, CLOSING_TAG, CLOSING_SANDUK_TAG }) {
  let isInspectingMultipleLines = false;
  return lines.reduce((result, line) => {
    let updatedLine = line;
    if (isInspectingMultipleLines) {
      const indexOfDelClosingTag = updatedLine.indexOf(CLOSING_SANDUK_TAG);
      if (indexOfDelClosingTag === -1) {
        updatedLine = `${OPENING_TAG}${updatedLine}${CLOSING_TAG}`;
        return [...result, updatedLine];
      } else {
        isInspectingMultipleLines = false;
        updatedLine = OPENING_TAG + updatedLine;
      }
    }

    const lastIndexOfOpeningTag = updatedLine.lastIndexOf(OPENING_TAG);
    const indexOfClosingTagForLastOpeningTag =
      lastIndexOfOpeningTag > -1
        ? updatedLine.indexOf(CLOSING_SANDUK_TAG, lastIndexOfOpeningTag + OPENING_TAG.length)
        : undefined;

    if (!isInspectingMultipleLines && indexOfClosingTagForLastOpeningTag === -1) {
      isInspectingMultipleLines = true;
      updatedLine = updatedLine + CLOSING_SANDUK_TAG;
    }
    return [...result, updatedLine];
  });
}

function fixSandukDelTags(lines) {
  const OPENING_TAG = '<span class="sanduk-diff-del-op">';
  const CLOSING_TAG = '</span>';
  const CLOSING_DEL_TAG = '</sanduk-diff-del-op>';
  const EMPTY = '';

  const enrichedLines = lines.reduce((result, line) => {
    let updatedLine = line.replace(/<sanduk-diff-del-op>/gi, OPENING_TAG);
    return [...result, updatedLine];
  }, []);

  const linesWithClosingDelTags = lineWithClosingTags({
    lines: enrichedLines,
    OPENING_TAG,
    CLOSING_TAG,
    CLOSING_SANDUK_TAG: CLOSING_DEL_TAG
  });

  return linesWithClosingDelTags.reduce((result, line) => {
    let updatedLine = line
      .replace(/<\/sanduk-diff-del-op>/gi, CLOSING_TAG)
      .replace(/<span class="sanduk-diff-del-op"><\/span>/gi, EMPTY);
    return [...result, updatedLine];
  });
}

function fixSandukInsTags(lines) {
  const OPENING_TAG = '<span class="sanduk-diff-ins-op">';
  const CLOSING_TAG = '</span>';
  const CLOSING_INS_TAG = '</sanduk-diff-ins-op>';
  const EMPTY = '';

  const enrichedLines = lines.reduce((result, line) => {
    let updatedLine = line.replace(/<sanduk-diff-ins-op>/gi, OPENING_TAG);
    return [...result, updatedLine];
  }, []);

  const linesWithClosingInsTags = lineWithClosingTags({
    lines: enrichedLines,
    OPENING_TAG,
    CLOSING_TAG,
    CLOSING_SANDUK_TAG: CLOSING_INS_TAG
  });

  return linesWithClosingInsTags.reduce((result, line) => {
    let updatedLine = line
      .replace(/<\/sanduk-diff-ins-op>/gi, CLOSING_TAG)
      .replace(/<span class="sanduk-diff-ins-op"><\/span>/gi, EMPTY);
    return [...result, updatedLine];
  });
}

function setupSourceLineTags(lines) {
  return lines.reduce((result, line, index) => {
    const delClass = line.includes('<span class="sanduk-diff-del-op">') ? 'sanduk-del-op' : '';
    const emptyLine = line.length === 0 ? 'sanduk-compare-tool-line-empty' : '';
    return [
      ...result,
      `<div class="sanduk-compare-tool-line ${delClass} ${emptyLine}"><span class="sanduk-compare-tool-line-number">${
        index + 1
      }</span>${line}</div>`
    ];
  }, []);
}

function setupDestinationLineTags(lines) {
  let lineNumber = 1;
  return lines.reduce((result, line) => {
    const insClass = line.includes('<span class="sanduk-diff-ins-op">') ? 'sanduk-ins-op' : '';
    if (line.length === 0) {
      return [
        ...result,
        `<div class="sanduk-compare-tool-line ${insClass} sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-number"> </span><span class="sanduk-compare-tool-line-empty-content"> </span></div>`
      ];
    }
    const enrichedResult = [
      ...result,
      `<div class="sanduk-compare-tool-line ${insClass}"><span class="sanduk-compare-tool-line-number">${lineNumber}</span>${line}</div>`
    ];
    lineNumber++;
    return enrichedResult;
  }, []);
}

function joinLines(lines) {
  return lines.join('');
}

function splitInput(input) {
  return input.split('\n');
}

function sourceFormatter(context) {
  const actions = [splitInput, trimSandukTags, fixSandukDelTags, setupSourceLineTags, joinLines];
  return actions.reduce((result, action) => action(result), context);
}

function destinationFormatter(context) {
  const actions = [
    splitInput,
    trimSandukTags,
    fixSandukInsTags,
    setupDestinationLineTags,
    joinLines
  ];
  return actions.reduce((result, action) => action(result), context);
}

function diffLines({ source, destination }) {
  const diffFinder = new DiffFinder();

  const diffs = diffFinder.diff_main(source, destination);
  diffFinder.diff_cleanupSemantic(diffs);
  const before = diffFinder.beforeContent(diffs);
  const after = diffFinder.afterContent(diffs);

  const formattedSource = sourceFormatter(before);
  const formattedDestination = destinationFormatter(after);

  return { formattedSource, formattedDestination };
}

module.exports = {
  diffLines,
  trimSandukTags,
  fixSandukDelTags,
  fixSandukInsTags,
  sourceFormatter,
  destinationFormatter
};
