'use strict';

const copyBtnHandler = require('../../../../../../src/renderer-process/editor/handlers/copy-btn-handler');

describe('Testing clear btn handler', () => {
  describe('Testing init clear btn handler', () => {
    test('Should be able to initialise and call handler', () => {
      const fakeClipboard = { writeText: jest.fn() };
      const getActiveTabId = jest.fn(() => '1');
      const copyBtns = [{ addEventListener: jest.fn((event, handler) => handler()) }];
      const editors = [{ getValue: jest.fn(() => 'Hello') }];
      copyBtnHandler.initCopyBtnHandler(getActiveTabId, copyBtns, editors, fakeClipboard);
      expect(copyBtns[0].addEventListener).toHaveBeenCalledTimes(1);
      expect(copyBtns[0].addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });
});
