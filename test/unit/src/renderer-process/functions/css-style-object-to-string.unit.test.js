'use strict';

const cssStyleObjectToString = require('../../../../../src/renderer-process/functions/css-style-object-to-string');

describe('Testing css style object to string', () => {
  describe('When style object is empty object', () => {
    test('Should return empty string', () => {
      expect(cssStyleObjectToString({})).toBe('');
    });
  });

  describe('When style object is exists', () => {
    test('Should return css string', () => {
      expect(
        cssStyleObjectToString({
          border: '1px solid #ced4da',
          overflow: 'scroll',
          padding: '5px',
          width: '100%',
          height: 'calc(100vh - 250px)'
        })
      ).toBe(
        'border:1px solid #ced4da;overflow:scroll;padding:5px;width:100%;height:calc(100vh - 250px);'
      );
    });
  });
});
