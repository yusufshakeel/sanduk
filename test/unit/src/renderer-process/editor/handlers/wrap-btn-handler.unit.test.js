'use strict';

const wrapBtnHandler = require('../../../../../../src/renderer-process/editor/handlers/wrap-btn-handler');

describe('Testing clear btn handler', () => {
  describe('Testing init clear btn handler', () => {
    test('Should be able to initialise and call handler', () => {
      const getActiveTabId = jest.fn(() => '1');
      const wrapBtns = [{ addEventListener: jest.fn((event, handler) => handler()) }];
      const editors = [{ getValue: jest.fn(() => '') }];
      wrapBtnHandler.initWrapBtnHandler(getActiveTabId, wrapBtns, editors);
      expect(wrapBtns[0].addEventListener).toHaveBeenCalledTimes(1);
      expect(wrapBtns[0].addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });
});
