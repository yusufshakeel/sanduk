'use strict';

describe('Testing', () => {
  test('Source', () => {
    const before = `{
  "squadName": "Super<span class="sanduk-diff-del-op">12</span> hero<span class="sanduk-diff-context-added">21</span> squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
<span class="sanduk-diff-del-op">        "Radiation resistance",
        "Turning tiny",
</span>        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
<span class="sanduk-diff-context-added">        "Immortality",
        "Heat Immunity",
        "Inferno",
</span>        "Interdimensional travel"
      ]
    }
  ]
}
`;
    const lines = before.split('\n');

    // console.log(lines);
    const addSpan = '<span class="sanduk-diff-context-added">';
    let isChecking = false;
    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];
      const lengthOfCurrentLine = currentLine.length;
      const updatedLine = currentLine.replace(
        /<span class="sanduk-diff-context-added">.*<\/<span>/gi,
        ''
      );
    }
  });

  test('Destination', () => {
    const after = `{
  "squadName": "Super<span class="sanduk-diff-context-removed">12</span> hero<span class="sanduk-diff-ins-op">21</span> squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
<span class="sanduk-diff-context-removed">        "Radiation resistance",
        "Turning tiny",
</span>        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
<span class="sanduk-diff-ins-op">        "Immortality",
        "Heat Immunity",
        "Inferno",
</span>        "Interdimensional travel"
      ]
    }
  ]
}
`;
    const lines = after.split('\n');

    console.log(lines);
  });

  describe('string replace add content', () => {
    test('when within the line', () => {
      const line =
        'Super<span class="sanduk-diff-del-op">12</span> hero<span class="sanduk-diff-context-added">21</span> squad';
      expect(
        line.replace(/<span class="sanduk-diff-context-(added|removed)">.*<\/span>/gi, '')
      ).toBe('Super<span class="sanduk-diff-del-op">12</span> hero squad');
    });

    test('when the whole line', () => {
      const line = '<span class="sanduk-diff-context-added">21</span>';
      expect(
        line.replace(/^<span class="sanduk-diff-context-(added|removed)">.*<\/span>$/gi, '')
      ).toBe('');
    });

    test('when it is non ending span', () => {
      const line = 'Hello world <span class="sanduk-diff-context-added">21';
      expect(line.replace(/<span class="sanduk-diff-context-(added|removed)">.*$/gi, '')).toBe(
        'Hello world '
      );
    });

    test('when line includes only open span', () => {
      const line = 'Hello world <span class="sanduk-diff-context-added">21';
      expect(/<span class="sanduk-diff-context-(added|removed)">.*$/gi.test(line)).toBeTruthy();

      const line2 = 'Hello world <span class="sanduk-diff-context-added">21</span> hello';
      expect(
        /<span class="sanduk-diff-context-(added|removed)">.*(!<\/span>)$/gi.test(line2)
      ).toBeFalsy();
    });

    test('replace closing span tag', () => {
      const line = '</span> hello';
      const closingTag = '</span>';
      const indexOfClosingSpanTag = line.indexOf(closingTag);
      expect(line.substring(indexOfClosingSpanTag + closingTag.length)).toBe(' hello');
    });
  });
});
