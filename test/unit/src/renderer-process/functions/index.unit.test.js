'use strict';

const fn = require('../../../../../src/renderer-process/functions');

describe('Testing fn', () => {
  test('Should return object', () => {
    expect(Object.keys(fn)).toStrictEqual(['jsonParser', 'sortObject', 'readCsv']);
  });
});
