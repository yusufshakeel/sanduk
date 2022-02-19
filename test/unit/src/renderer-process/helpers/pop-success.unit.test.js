'use strict';

const awaiting = require('../../../../helpers/awaiting');
const popSuccess = require('../../../../../src/renderer-process/helpers/pop-success');

jest.setTimeout(10000);

describe('Testing pop success', () => {
  describe('When using default timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const fakeElement = { innerHTML: '' };
      popSuccess(fakeElement, 'Some success');
      expect(fakeElement.innerHTML).toBe(
        '<div class="alert alert-success" role="alert">Some success</div>'
      );
      await awaiting(6000);
      expect(fakeElement.innerHTML).toBe('');
    });
  });

  describe('When using custom timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const fakeElement = { innerHTML: '' };
      popSuccess(fakeElement, 'Some success', 1000);
      expect(fakeElement.innerHTML).toBe(
        '<div class="alert alert-success" role="alert">Some success</div>'
      );
      await awaiting(2000);
      expect(fakeElement.innerHTML).toBe('');
    });
  });
});
