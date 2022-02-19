'use strict';

const {
  getActiveTabIdByClassName
} = require('../../../../../src/renderer-process/helpers/active-tab-element');

describe('Testing active tab element', () => {
  describe('Testing get active tab id by class name', () => {
    const fakeDocumentDOM = {
      getElementsByClassName: jest.fn(() => [
        { dataset: { tabid: '1' } },
        { dataset: { tabid: '2' } }
      ])
    };

    describe('When matching element exists', () => {
      test('Should return the first match', () => {
        expect(getActiveTabIdByClassName('some class name', 'tabid', fakeDocumentDOM)).toBe('1');
      });
    });

    describe('When matching element does not exists', () => {
      test('Should return undefine', () => {
        expect(
          getActiveTabIdByClassName('some class name', 'unknownAttribute', fakeDocumentDOM)
        ).toBeUndefined();
      });
    });
  });
});
