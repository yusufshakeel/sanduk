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
      '<span class="sanduk-diff-context-added">World </span>Hello World<span class="sanduk-diff-del-op"> Hello</span>'
    );
    expect(newer).toStrictEqual(
      '<span class="sanduk-diff-ins-op">World </span>Hello World<span class="sanduk-diff-context-removed"> Hello</span>'
    );
  });
});
