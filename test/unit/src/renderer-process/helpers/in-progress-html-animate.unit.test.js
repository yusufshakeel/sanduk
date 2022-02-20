'use strict';

const awaiting = require('../../../../helpers/awaiting');
const inProgressHtmlAnimate = require('../../../../../src/renderer-process/helpers/in-progress-html-animate');

describe('Testing in progress html animate', () => {
  describe('When using default timeout', () => {
    test('Should be able to change the innerHTML and then revert to older innerHTML', async () => {
      const fakeElement = { innerHTML: 'Hello' };
      inProgressHtmlAnimate(fakeElement, 'Hello', 'Hello World');
      expect(fakeElement.innerHTML).toBe('Hello World');
      await awaiting(1000);
      expect(fakeElement.innerHTML).toBe('Hello');
    });
  });

  describe('When using custom timeout', () => {
    test('Should be able to change the innerHTML and then revert to older innerHTML', async () => {
      const fakeElement = { innerHTML: 'Hello' };
      inProgressHtmlAnimate(fakeElement, 'Hello', 'Hello World', 1000);
      expect(fakeElement.innerHTML).toBe('Hello World');
      await awaiting(2000);
      expect(fakeElement.innerHTML).toBe('Hello');
    });
  });
});
