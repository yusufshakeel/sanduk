'use strict';

const fontSize = require('../../../../../src/renderer-process/editor/font-size');

describe('Testing editor fontSize', () => {
  const fakeHtmlElement = jest.fn(size => ({
    style: { fontSize: size }
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing increase font size', () => {
    describe('When font size is less than max size', () => {
      test('Should be able to increase font size', () => {
        const htmlElem = fakeHtmlElement('16px');
        fontSize.increaseFontSize(htmlElem);
        expect(htmlElem.style.fontSize).toBe('17px');
      });
    });

    describe('When font size is equal to max size', () => {
      test('Should not increase font size', () => {
        const htmlElem = fakeHtmlElement('64px');
        fontSize.increaseFontSize(htmlElem);
        expect(htmlElem.style.fontSize).toBe('64px');
      });
    });
  });

  describe('Testing decrease font size', () => {
    describe('When font size is greater than min size', () => {
      test('Should be able to decrease font size', () => {
        const htmlElem = fakeHtmlElement('16px');
        fontSize.decreaseFontSize(htmlElem);
        expect(htmlElem.style.fontSize).toBe('15px');
      });
    });

    describe('When font size is equal to min size', () => {
      test('Should not decrease font size', () => {
        const htmlElem = fakeHtmlElement('12px');
        fontSize.decreaseFontSize(htmlElem);
        expect(htmlElem.style.fontSize).toBe('12px');
      });
    });
  });

  describe('Testing reset font size', () => {
    test('Should be able to reset font size', () => {
      const htmlElem = fakeHtmlElement('48px');
      fontSize.resetFontSize(htmlElem);
      expect(htmlElem.style.fontSize).toBe('16px');
    });
  });
});
