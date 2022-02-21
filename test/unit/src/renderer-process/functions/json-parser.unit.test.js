'use strict';

const jsonParser = require('../../../../../src/renderer-process/functions/json-parser');

describe('Testing jsonParser', () => {
  describe('When data is valid', () => {
    test('Should return parsed json', () => {
      expect(jsonParser('{"key":"value"}')).toStrictEqual({
        data: {
          key: 'value'
        },
        isValidJSON: true
      });
    });
  });

  describe('When data is invalid', () => {
    test('Should throw error', () => {
      expect(jsonParser('{data:haha}')).toStrictEqual({
        error: expect.any(Object),
        errorMessage: 'Unexpected token d in JSON at position 1',
        isValidJSON: false
      });
    });
  });
});
