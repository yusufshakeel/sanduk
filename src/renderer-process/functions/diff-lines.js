'use strict';

const DiffFinder = require('./diff-finder');

function trimSandukTags({ lines }) {
  const EMPTY = '';
  const EMPTY_LINE = '';
  const CLOSING_TAG_CONTENT_ADDED = '</sanduk-content-added>';
  const CLOSING_TAG_CONTENT_REMOVED = '</sanduk-content-removed>';

  let closingTag = '';
  let isInspectingMultipleLines = false;

  // in this we are removing the content-added, content-removed tags
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

function formatter({ lines }) {
  const pipe = [trimSandukTags];
  return pipe.reduce((result, action) => action(result), { lines });
}

function formatLines(context) {
  const lines = context.split('\n');

  const formatLines = formatter({ lines });
  console.log({ formatLines });

  return { formattedLines: formatLines.join('\n') };
}

function diffLines({ source, destination }) {
  const diffFinder = new DiffFinder();

  const diffs = diffFinder.diff_main(source, destination);
  diffFinder.diff_cleanupSemantic(diffs);
  const before = diffFinder.beforeContent(diffs);
  const after = diffFinder.afterContent(diffs);

  console.log({ before });
  console.log({ after });

  // return {
  //   formattedSource: before,
  //   formattedDestination: after
  // };

  return {
    formattedSource: formatLines(before).formattedLines,
    formattedDestination: formatLines(after).formattedLines
  };
}

module.exports = { diffLines, formatLines, formatter, trimSandukTags };
