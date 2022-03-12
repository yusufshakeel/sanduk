'use strict';

const DiffFinder = require('../../../../../src/renderer-process/functions/diff-finder');

describe('Testing diff finder', () => {
  test('Should return differences', () => {
    const source = 'Hello World Hello';
    const destination = 'World Hello World';

    const diffFinder = new DiffFinder();
    const diffs = diffFinder.diff_main(source, destination);
    diffFinder.diff_cleanupSemantic(diffs);

    const older = diffFinder.beforeContent(diffs);
    const newer = diffFinder.afterContent(diffs);

    expect(older).toStrictEqual(
      '<sanduk-content-added>World </sanduk-content-added>Hello World<sanduk-diff-del-op> Hello</sanduk-diff-del-op>'
    );
    expect(newer).toStrictEqual(
      '<sanduk-diff-ins-op>World </sanduk-diff-ins-op>Hello World<sanduk-content-removed> Hello</sanduk-content-removed>'
    );
  });
});
