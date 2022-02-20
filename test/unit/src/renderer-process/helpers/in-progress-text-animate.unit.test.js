'use strict';

const awaiting = require('../../../../helpers/awaiting');
const inProgressTextAnimate = require('../../../../../src/renderer-process/helpers/in-progress-text-animate');

describe('Testing in progress text animate', () => {
  describe('When using default timeout', () => {
    test('Should be able to change the innerText and then revert to older innerText', async () => {
      const fakeElement = { innerText: 'Hello' };
      inProgressTextAnimate(fakeElement, 'Hello', 'Hello World');
      expect(fakeElement.innerText).toBe('Hello World');
      await awaiting(1000);
      expect(fakeElement.innerText).toBe('Hello');
    });
  });

  describe('When using custom timeout', () => {
    test('Should be able to change the innerText and then revert to older innerText', async () => {
      const fakeElement = { innerText: 'Hello' };
      inProgressTextAnimate(fakeElement, 'Hello', 'Hello World', 1000);
      expect(fakeElement.innerText).toBe('Hello World');
      await awaiting(2000);
      expect(fakeElement.innerText).toBe('Hello');
    });
  });
});
