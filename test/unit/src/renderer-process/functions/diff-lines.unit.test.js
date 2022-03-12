'use strict';

const {
  trimSandukTags,
  fixSandukDelTags,
  fixSandukInsTags,
  diffLines,
  sourceFormatter,
  destinationFormatter
} = require('../../../../../src/renderer-process/functions/diff-lines');

describe('Testing diff lines', () => {
  describe('Testing trimSandukTags', () => {
    test('Should be able to format source lines', () => {
      const source = `{
  "squadName": "Super<sanduk-diff-del-op>12</sanduk-diff-del-op> hero<sanduk-content-added>21</sanduk-content-added> squad",
  "members": [
    {
      "powers": [
<sanduk-diff-del-op>        "Radiation resistance",
        "Turning tiny",
</sanduk-diff-del-op>        "Radiation blast"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Teleportation",
        "I<sanduk-diff-del-op>nterdimensional travel</sanduk-diff-del-op><sanduk-content-added>mmortality",
        "Teleportation",
        "Immortality</sanduk-content-added>"
      ]
    }
  ]
}
`;
      expect(trimSandukTags(source.split('\n'))).toStrictEqual([
        '{',
        '  "squadName": "Super<sanduk-diff-del-op>12</sanduk-diff-del-op> hero squad",',
        '  "members": [',
        '    {',
        '      "powers": [',
        '<sanduk-diff-del-op>        "Radiation resistance",',
        '        "Turning tiny",',
        '</sanduk-diff-del-op>        "Radiation blast"',
        '      ]',
        '    },',
        '    {',
        '      "name": "Eternal Flame",',
        '      "age": 1000000,',
        '      "secretIdentity": "Unknown",',
        '      "powers": [',
        '        "Teleportation",',
        '        "I<sanduk-diff-del-op>nterdimensional travel</sanduk-diff-del-op>',
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
  "squadName": "Super<sanduk-content-removed>12</sanduk-content-removed> hero<sanduk-diff-ins-op>21</sanduk-diff-ins-op> squad",
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
        "I<sanduk-content-removed>nterdimensional travel</sanduk-content-removed><sanduk-diff-ins-op>mmortality",
        "Teleportation",
        "Immortality</sanduk-diff-ins-op>"
      ]
    }
  ]
}
`;
      expect(trimSandukTags(destination.split('\n'))).toStrictEqual([
        '{',
        '  "squadName": "Super hero<sanduk-diff-ins-op>21</sanduk-diff-ins-op> squad",',
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
        '        "I<sanduk-diff-ins-op>mmortality",',
        '        "Teleportation",',
        '        "Immortality</sanduk-diff-ins-op>"',
        '      ]',
        '    }',
        '  ]',
        '}',
        ''
      ]);
    });
  });

  describe('Testing fixSandukDelTags', () => {
    test('Should be able to format source lines', () => {
      const source = [
        '{',
        '  "squadName": "Super<sanduk-diff-del-op>12</sanduk-diff-del-op> hero squad",',
        '  "members": [',
        '    {',
        '      "powers": [',
        '<sanduk-diff-del-op>        "Radiation resistance",',
        '        "Turning tiny",',
        '</sanduk-diff-del-op>        "Radiation blast"',
        '      ]',
        '    },',
        '    {',
        '      "name": "Eternal Flame",',
        '      "age": 1000000,',
        '      "secretIdentity": "Unknown",',
        '      "powers": [',
        '        "Teleportation",',
        '        "I<sanduk-diff-del-op>nterdimensional travel</sanduk-diff-del-op>',
        '',
        '"',
        '      ]',
        '    }',
        '  ]',
        '}',
        ''
      ];
      expect(fixSandukDelTags(source)).toStrictEqual([
        '{',
        '  "squadName": "Super<span class="sanduk-diff-del-op">12</span> hero squad",',
        '  "members": [',
        '    {',
        '      "powers": [',
        '<span class="sanduk-diff-del-op">        "Radiation resistance",</span>',
        '<span class="sanduk-diff-del-op">        "Turning tiny",</span>',
        '        "Radiation blast"',
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
  });

  describe('Testing fixSandukInsTags', () => {
    test('Should be able to format destination lines', () => {
      const destination = [
        '{',
        '  "squadName": "Super hero<sanduk-diff-ins-op>21</sanduk-diff-ins-op> squad",',
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
        '        "I<sanduk-diff-ins-op>mmortality",',
        '        "Teleportation",',
        '        "Immortality</sanduk-diff-ins-op>"',
        '      ]',
        '    }',
        '  ]',
        '}',
        ''
      ];
      expect(fixSandukInsTags(destination)).toStrictEqual([
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
        '        "I<span class="sanduk-diff-ins-op">mmortality",</span>',
        '<span class="sanduk-diff-ins-op">        "Teleportation",</span>',
        '<span class="sanduk-diff-ins-op">        "Immortality</span>"',
        '      ]',
        '    }',
        '  ]',
        '}',
        ''
      ]);
    });
  });

  describe('Testing sourceFormatter', () => {
    test('Should be able to format', () => {
      const source = `{
  "squadName": "Super<sanduk-diff-del-op>12</sanduk-diff-del-op> hero<sanduk-content-added>21</sanduk-content-added> squad",
  "members": [
    {
      "powers": [
<sanduk-diff-del-op>        "Radiation resistance",
        "Turning tiny",
</sanduk-diff-del-op>        "Radiation blast"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Teleportation",
        "I<sanduk-diff-del-op>nterdimensional travel</sanduk-diff-del-op><sanduk-content-added>mmortality",
        "Teleportation",
        "Immortality</sanduk-content-added>"
      ]
    }
  ]
}
`;
      expect(sourceFormatter(source))
        .toStrictEqual(`<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">1</span>{</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">2</span>  "squadName": "Super<span class="sanduk-diff-del-op">12</span> hero squad",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">3</span>  "members": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">4</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">5</span>      "powers": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">6</span><span class="sanduk-diff-del-op">        "Radiation resistance",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">7</span><span class="sanduk-diff-del-op">        "Turning tiny",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">8</span>        "Radiation blast"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">9</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">10</span>    },</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">11</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">12</span>      "name": "Eternal Flame",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">13</span>      "age": 1000000,</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">14</span>      "secretIdentity": "Unknown",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">15</span>      "powers": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">16</span>        "Teleportation",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">17</span>        "I<span class="sanduk-diff-del-op">nterdimensional travel</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">18</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">19</span>"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">20</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">21</span>    }</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">22</span>  ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">23</span>}</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">24</span></div>`);
    });
  });

  describe('Testing destinationFormatter', () => {
    test('Should be able to format', () => {
      const destination = `{
  "squadName": "Super<sanduk-content-removed>12</sanduk-content-removed> hero<sanduk-diff-ins-op>21</sanduk-diff-ins-op> squad",
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
        "I<sanduk-content-removed>nterdimensional travel</sanduk-content-removed><sanduk-diff-ins-op>mmortality",
        "Teleportation",
        "Immortality</sanduk-diff-ins-op>"
      ]
    }
  ]
}
`;
      expect(destinationFormatter(destination))
        .toStrictEqual(`<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">1</span>{</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">2</span>  "squadName": "Super hero<span class="sanduk-diff-ins-op">21</span> squad",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">3</span>  "members": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">4</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">5</span>      "powers": [</div>
<div class="sanduk-compare-tool-line sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-empty-content"> </span></div>
<div class="sanduk-compare-tool-line sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-empty-content"> </span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">6</span>        "Radiation blast"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">7</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">8</span>    },</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">9</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">10</span>      "name": "Eternal Flame",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">11</span>      "age": 1000000,</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">12</span>      "secretIdentity": "Unknown",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">13</span>      "powers": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">14</span>        "Teleportation",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">15</span>        "I<span class="sanduk-diff-ins-op">mmortality",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">16</span><span class="sanduk-diff-ins-op">        "Teleportation",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">17</span><span class="sanduk-diff-ins-op">        "Immortality</span>"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">18</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">19</span>    }</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">20</span>  ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">21</span>}</div>
<div class="sanduk-compare-tool-line sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-empty-content"> </span></div>`);
    });
  });

  describe('Testing diffLines', () => {
    test('Should be able to return difference', () => {
      const source = `{
  "squadName": "Super12 hero squad",
  "members": [
    {
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
`;
      const destination = `{
  "squadName": "Super hero21 squad",
  "members": [
    {
      "powers": [
        "Radiation blast"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Teleportation",
        "Immortality",
        "Teleportation",
        "Immortality"
      ]
    }
  ]
}
`;

      const { formattedSource, formattedDestination } = diffLines({ source, destination });

      expect(formattedSource)
        .toStrictEqual(`<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">1</span>{</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">2</span>  "squadName": "Super<span class="sanduk-diff-del-op">12</span> hero squad",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">3</span>  "members": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">4</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">5</span>      "powers": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">6</span><span class="sanduk-diff-del-op">        "Radiation resistance",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">7</span><span class="sanduk-diff-del-op">        "Turning tiny",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">8</span>        "Radiation blast"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">9</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">10</span>    },</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">11</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">12</span>      "name": "Eternal Flame",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">13</span>      "age": 1000000,</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">14</span>      "secretIdentity": "Unknown",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">15</span>      "powers": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">16</span>        "Teleportation",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">17</span>        "I<span class="sanduk-diff-del-op">nterdimensional travel</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">18</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">19</span>"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">20</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">21</span>    }</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">22</span>  ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">23</span>}</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">24</span></div>`);

      expect(formattedDestination)
        .toStrictEqual(`<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">1</span>{</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">2</span>  "squadName": "Super hero<span class="sanduk-diff-ins-op">21</span> squad",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">3</span>  "members": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">4</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">5</span>      "powers": [</div>
<div class="sanduk-compare-tool-line sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-empty-content"> </span></div>
<div class="sanduk-compare-tool-line sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-empty-content"> </span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">6</span>        "Radiation blast"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">7</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">8</span>    },</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">9</span>    {</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">10</span>      "name": "Eternal Flame",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">11</span>      "age": 1000000,</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">12</span>      "secretIdentity": "Unknown",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">13</span>      "powers": [</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">14</span>        "Teleportation",</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">15</span>        "I<span class="sanduk-diff-ins-op">mmortality",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">16</span><span class="sanduk-diff-ins-op">        "Teleportation",</span></div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">17</span><span class="sanduk-diff-ins-op">        "Immortality</span>"</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">18</span>      ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">19</span>    }</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">20</span>  ]</div>
<div class="sanduk-compare-tool-line"><span class="sanduk-compare-tool-line-number">21</span>}</div>
<div class="sanduk-compare-tool-line sanduk-compare-tool-line-empty"><span class="sanduk-compare-tool-line-empty-content"> </span></div>`);
    });
  });
});
