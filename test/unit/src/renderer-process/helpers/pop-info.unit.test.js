'use strict';

const awaiting = require('../../../../helpers/awaiting');
const popInfo = require('../../../../../src/renderer-process/helpers/pop-info');

jest.setTimeout(10000);

describe('Testing pop info', () => {
  describe('When using default timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const fakeElement = { innerHTML: '' };
      popInfo(fakeElement, 'Some info');
      expect(fakeElement.innerHTML).toBe(
        '<div class="alert alert-info" role="alert">Some info</div>'
      );
      await awaiting(6000);
      expect(fakeElement.innerHTML).toBe('');
    });
  });

  describe('When using custom timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const fakeElement = { innerHTML: '' };
      popInfo(fakeElement, 'Some info', 1000);
      expect(fakeElement.innerHTML).toBe(
        '<div class="alert alert-info" role="alert">Some info</div>'
      );
      await awaiting(2000);
      expect(fakeElement.innerHTML).toBe('');
    });
  });
});
