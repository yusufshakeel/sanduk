'use strict';

const sortObject = require('../../../../../src/renderer-process/functions/sort-object');

describe('Testing sort object', () => {
  test('Should be able to sort in ascending order', () => {
    const data = { d: 1, e: true, a: 'hello', c: 123, b: [1, 4, 3, {}] };
    const result = sortObject({ data });
    expect(result).toStrictEqual({
      a: 'hello',
      b: [1, 4, 3, {}],
      c: 123,
      d: 1,
      e: true
    });
    expect(Object.keys(result)).toStrictEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('Should be able to sort in descending order', () => {
    const data = { d: 1, e: true, a: 'hello', c: 123, b: [1, 4, 3, {}] };
    const result = sortObject({ data, descendingSort: true });
    expect(result).toStrictEqual({
      a: 'hello',
      b: [1, 4, 3, {}],
      c: 123,
      d: 1,
      e: true
    });
    expect(Object.keys(result)).toStrictEqual(['e', 'd', 'c', 'b', 'a']);
  });
});
