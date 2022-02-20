'use strict';

const clearContent = require('../../../../../src/renderer-process/helpers/clear-content');

describe('Testing clear content', () => {
  test('Should be able to clear innerHTML', () => {
    const fakeElement = { innerHTML: 'Hello' };
    clearContent(fakeElement);
    expect(fakeElement.innerHTML).toBe('');
  });
});
