'use strict';

const clearBtnHandler = require('../../../../../../src/renderer-process/editor/handlers/clear-btn-handler');

describe('Testing clear btn handler', () => {
  describe('Testing init clear btn handler', () => {
    test('Should be able to initialise and call handler', () => {
      const getActiveTabId = jest.fn(() => '1');
      const clearBtns = [{ addEventListener: jest.fn((event, handler) => handler()) }];
      const editors = [{ setValue: jest.fn() }];
      clearBtnHandler.initClearBtnHandler(getActiveTabId, clearBtns, editors);
      expect(clearBtns[0].addEventListener).toHaveBeenCalledTimes(1);
      expect(clearBtns[0].addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });
});
