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
          formattedSourceLines: ['Hello', 'World'],
          formattedDestinationLines: ['Hello', 'World']
        });
      });
    });

    describe('When source has more lines than destination', () => {
      test('Should return enriched destination', () => {
        const source = `Hello\nWorld\nHello`;
        const destination = `Hello\nWorld`;
        expect(diffLines({ source, destination })).toStrictEqual({
          formattedSourceLines: ['Hello', 'World', '<span class="sanduk-diff-del-op">Hello</span>'],
          formattedDestinationLines: ['Hello', 'World', '']
        });
      });
    });

    describe('When source has less lines than destination', () => {
      test('Should return enriched source', () => {
        const source = `Hello\nWorld`;
        const destination = `Hello\nWorld\nHello`;
        expect(diffLines({ source, destination })).toStrictEqual({
          formattedSourceLines: ['Hello', 'World', ''],
          formattedDestinationLines: [
            'Hello',
            'World',
            '<span class="sanduk-diff-ins-op">Hello</span>'
          ]
        });
      });
    });
  });
});
