'use strict';

const awaiting = require('../../../../helpers/awaiting');
const popInfo = require('../../../../../src/renderer-process/helpers/pop-info');

jest.setTimeout(10000);

describe('Testing pop info', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When using default timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const add = jest.fn();
      const remove = jest.fn();
      const titleElement = { innerHTML: '' };
      const bodyElement = { innerHTML: '' };
      const fakeDocument = {
        getElementById: jest.fn(id => {
          if (id === 'sanduk-pop-message-container') {
            return { classList: { add, remove } };
          } else if (id === 'sanduk-pop-message-header-title') {
            return titleElement;
          } else if (id === 'sanduk-pop-message-body') {
            return bodyElement;
          }
        })
      };
      popInfo({ message: 'Some success', documentDOM: fakeDocument });
      expect(add).toHaveBeenCalledWith('show');
      expect(remove).toHaveBeenCalledWith('d-none');
      expect(titleElement.innerHTML).toBe(
        '<i class="bi-exclamation-circle-fill text-info"></i> Info'
      );
      expect(bodyElement.innerHTML).toBe('Some success');
      await awaiting(6000);
      expect(add).toHaveBeenCalledWith('d-none');
      expect(remove).toHaveBeenCalledWith('show');
    });
  });

  describe('When using custom timeout', () => {
    test('Should show message inside the html element and then remove it', async () => {
      const add = jest.fn();
      const remove = jest.fn();
      const titleElement = { innerHTML: '' };
      const bodyElement = { innerHTML: '' };
      const fakeDocument = {
        getElementById: jest.fn(id => {
          if (id === 'sanduk-pop-message-container') {
            return { classList: { add, remove } };
          } else if (id === 'sanduk-pop-message-header-title') {
            return titleElement;
          } else if (id === 'sanduk-pop-message-body') {
            return bodyElement;
          }
        })
      };
      popInfo({ message: 'Some success', timeout: 1000, documentDOM: fakeDocument });
      expect(add).toHaveBeenCalledWith('show');
      expect(remove).toHaveBeenCalledWith('d-none');
      expect(titleElement.innerHTML).toBe(
        '<i class="bi-exclamation-circle-fill text-info"></i> Info'
      );
      expect(bodyElement.innerHTML).toBe('Some success');
      await awaiting(2000);
      expect(add).toHaveBeenCalledWith('d-none');
      expect(remove).toHaveBeenCalledWith('show');
    });
  });
});
