'use strict';

const {
  enrichedLines,
  diffLines
} = require('../../../../../src/renderer-process/functions/diff-lines');

describe('Testing diff lines', () => {
  describe('Testing enrichLines', () => {
    describe('When source and destination have equal lines', () => {
      test('Should return as is', () => {
        const source = `Hello\nWorld`;
        const destination = `Hello\nWorld`;
        expect(enrichedLines({ source, destination })).toStrictEqual({
          sourceLines: ['Hello', 'World'],
          destinationLines: ['Hello', 'World']
        });
      });
    });

    describe('When source has more lines than destination', () => {
      test('Should return enriched destination', () => {
        const source = `Hello\nWorld\nHello`;
        const destination = `Hello\nWorld`;
        expect(enrichedLines({ source, destination })).toStrictEqual({
          sourceLines: ['Hello', 'World', 'Hello'],
          destinationLines: ['Hello', 'World', '']
        });
      });
    });

    describe('When source has less lines than destination', () => {
      test('Should return enriched source', () => {
        const source = `Hello\nWorld`;
        const destination = `Hello\nWorld\nHello`;
        expect(enrichedLines({ source, destination })).toStrictEqual({
          sourceLines: ['Hello', 'World', ''],
          destinationLines: ['Hello', 'World', 'Hello']
        });
      });
    });
  });

  describe('Testing diffLines', () => {
    describe('When source and destination have equal lines', () => {
      test('Should return as is', () => {
        const source = `Hello\nWorld`;
        const destination = `Hello\nWorld`;
        expect(diffLines({ source, destination })).toStrictEqual({
          formattedSourceLines: [
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">1</span> Hello</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">2</span> World</span>'
          ],
          formattedDestinationLines: [
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">1</span> Hello</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">2</span> World</span>'
          ]
        });
      });
    });

    describe('When source has more lines than destination', () => {
      test('Should return enriched destination', () => {
        const source = `Hello\nWorld\nHello`;
        const destination = `Hello\nWorld`;
        expect(diffLines({ source, destination })).toStrictEqual({
          formattedDestinationLines: [
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">1</span> Hello</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">2</span> World</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">3</span> <span class="sanduk-diff-context-removed">Hello</span></span>'
          ],
          formattedSourceLines: [
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">1</span> Hello</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">2</span> World</span>',
            '<span class="sanduk-compare-tool-line sanduk-line-changed sanduk-del-op"><span class="sanduk-line-number">3</span> <span class="sanduk-diff-del-op">Hello</span></span>'
          ]
        });
      });
    });

    describe('When source has less lines than destination', () => {
      test('Should return enriched source', () => {
        const source = `Hello\nWorld`;
        const destination = `Hello\nWorld\nHello`;
        expect(diffLines({ source, destination })).toStrictEqual({
          formattedDestinationLines: [
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">1</span> Hello</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">2</span> World</span>',
            '<span class="sanduk-compare-tool-line sanduk-line-changed sanduk-ins-op"><span class="sanduk-line-number">3</span> <span class="sanduk-diff-ins-op">Hello</span></span>'
          ],
          formattedSourceLines: [
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">1</span> Hello</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">2</span> World</span>',
            '<span class="sanduk-compare-tool-line "><span class="sanduk-line-number">3</span> <span class="sanduk-diff-context-added">Hello</span></span>'
          ]
        });
      });
    });
  });
});
