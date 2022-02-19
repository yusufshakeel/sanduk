'use strict';

const awaiting = require('../../../../helpers/awaiting');
const popError = require('../../../../../src/renderer-process/helpers/pop-error');

jest.setTimeout(10000);

describe('Testing pop error', () => {
  describe('When using default timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const fakeElement = { innerHTML: '' };
      popError(fakeElement, 'Some error');
      expect(fakeElement.innerHTML).toBe(
        '<div class="alert alert-danger" role="alert">Some error</div>'
      );
      await awaiting(6000);
      expect(fakeElement.innerHTML).toBe('');
    });
  });

  describe('When using custom timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const fakeElement = { innerHTML: '' };
      popError(fakeElement, 'Some error', 1000);
      expect(fakeElement.innerHTML).toBe(
        '<div class="alert alert-danger" role="alert">Some error</div>'
      );
      await awaiting(2000);
      expect(fakeElement.innerHTML).toBe('');
    });
  });
});
