'use strict';

const {
  formatter,
  trimSandukTags,
  formatLines,
  diffLines
} = require('../../../../../src/renderer-process/functions/diff-lines');

describe('Testing diff lines', () => {
  describe('Testing Formatter', () => {
    describe('When content-added and content-removed tags within the line', () => {
      test('Should remove tags and content', () => {
        const lines = [
          'hello <sanduk-content-added>123</sanduk-content-added> world <sanduk-content-removed>456</sanduk-content-removed>'
        ];
        expect(formatter({ lines })).toStrictEqual(['hello  world ']);
      });
    });

    describe('When content-added and content-removed takes whole line', () => {
      test('Should remove tags and content', () => {
        const lines = [
          '<sanduk-content-added>123</sanduk-content-added>',
          '<sanduk-content-removed>123</sanduk-content-removed>'
        ];
        expect(formatter({ lines })).toStrictEqual(['', '']);
      });
    });

    describe('When content-added starts in one line and ends in some other line', () => {
      test('Should remove tags and content', () => {
        const lines = [
          'hello <sanduk-content-added>123',
          'more line',
          'more line',
          '123</sanduk-content-added> world'
        ];
        expect(formatter({ lines })).toStrictEqual(['hello ', '', '', ' world']);
      });
    });

    describe('When content-removed starts in one line and ends in some other line', () => {
      test('Should remove tags and content', () => {
        const lines = [
          'hello <sanduk-content-removed>123',
          'more line',
          'more line',
          'happy 123 world</sanduk-content-removed>'
        ];
        expect(formatter({ lines })).toStrictEqual(['hello ', '', '', '']);
      });
    });
  });

  describe('Testing trimSandukTags', () => {
    test('Should be able to format source lines', () => {
      const source = `{
  "squadName": "Super<span class="sanduk-diff-del-op">12</span> hero<sanduk-content-added>21</sanduk-content-added> squad",
  "members": [
    {
      "powers": [
<span class="sanduk-diff-del-op">        "Radiation resistance",
        "Turning tiny",
</span>        "Radiation blast"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Teleportation",
        "I<span class="sanduk-diff-del-op">nterdimensional travel</span><sanduk-content-added>mmortality",
        "Teleportation",
        "Immortality</sanduk-content-added>"
      ]
    }
  ]
}
`;
      expect(trimSandukTags({ lines: source.split('\n') })).toStrictEqual([
        '{',
        '  "squadName": "Super<span class="sanduk-diff-del-op">12</span> hero squad",',
        '  "members": [',
        '    {',
        '      "powers": [',
        '<span class="sanduk-diff-del-op">        "Radiation resistance",',
        '        "Turning tiny",',
        '</span>        "Radiation blast"',
        '      ]',
        '    },',
        '    {',
        '      "name": "Eternal Flame",',
        '      "age": 1000000,',
        '      "secretIdentity": "Unknown",',
        '      "powers": [',
        '        "Teleportation",',
        '        "I<span class="sanduk-diff-del-op">nterdimensional travel</span>',
        '',
        '"',
        '      ]',
        '    }',
        '  ]',
        '}',
        ''
      ]);
    });

    test('Should be able to format destination lines', () => {
      const destination = `{
  "squadName": "Super<sanduk-content-removed>12</sanduk-content-removed> hero<span class="sanduk-diff-ins-op">21</span> squad",
  "members": [
    {
      "powers": [
<sanduk-content-removed>        "Radiation resistance",
        "Turning tiny",
</sanduk-content-removed>        "Radiation blast"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Teleportation",
        "I<sanduk-content-removed>nterdimensional travel</sanduk-content-removed><span class="sanduk-diff-ins-op">mmortality",
        "Teleportation",
        "Immortality</span>"
      ]
    }
  ]
}
`;
      expect(trimSandukTags({ lines: destination.split('\n') })).toStrictEqual([
        '{',
        '  "squadName": "Super hero<span class="sanduk-diff-ins-op">21</span> squad",',
        '  "members": [',
        '    {',
        '      "powers": [',
        '',
        '',
        '        "Radiation blast"',
        '      ]',
        '    },',
        '    {',
        '      "name": "Eternal Flame",',
        '      "age": 1000000,',
        '      "secretIdentity": "Unknown",',
        '      "powers": [',
        '        "Teleportation",',
        '        "I<span class="sanduk-diff-ins-op">mmortality",',
        '        "Teleportation",',
        '        "Immortality</span>"',
        '      ]',
        '    }',
        '  ]',
        '}',
        ''
      ]);
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
