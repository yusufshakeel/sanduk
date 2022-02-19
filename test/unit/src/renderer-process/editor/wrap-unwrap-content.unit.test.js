'use strict';

const wrapUnwrapContent = require('../../../../../src/renderer-process/editor/wrap-unwrap-content');

describe('Testing editor wrap unwrap content', () => {
  const fakeWrapBtn = jest.fn(() => ({
    dataset: { wrap: 'no' },
    innerText: 'Wrap'
  }));

  const fakeEditor = jest.fn(value => ({
    getValue: () => value,
    session: { setUseWrapMode: jest.fn() }
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When content is not wrapped', () => {
    test('Should be able to wrap', () => {
      const wrapBtn = fakeWrapBtn();
      const editor = fakeEditor('Hello');
      wrapUnwrapContent({ wrapBtn, editor });
      expect(wrapBtn.dataset.wrap).toBe('yes');
      expect(wrapBtn.innerText).toBe('Unwrap');
      expect(editor.session.setUseWrapMode).toHaveBeenCalledTimes(1);
      expect(editor.session.setUseWrapMode).toHaveBeenCalledWith(true);
    });
  });

  describe('When content is wrapped', () => {
    test('Should be able to unwrap', () => {
      const wrapBtn = fakeWrapBtn();
      const editor = fakeEditor('Hello');
      // first we wrap
      wrapUnwrapContent({ wrapBtn, editor });
      expect(wrapBtn.dataset.wrap).toBe('yes');
      expect(wrapBtn.innerText).toBe('Unwrap');
      expect(editor.session.setUseWrapMode).toHaveBeenCalledWith(true);

      // next we unwrap
      wrapUnwrapContent({ wrapBtn, editor });
      expect(wrapBtn.dataset.wrap).toBe('no');
      expect(wrapBtn.innerText).toBe('Wrap');
      expect(editor.session.setUseWrapMode).toHaveBeenCalledWith(false);
    });
  });

  describe('When there is no content', () => {
    test('Should do nothing', () => {
      const wrapBtn = fakeWrapBtn();
      const editor = fakeEditor('');
      wrapUnwrapContent({ wrapBtn, editor });
      expect(wrapBtn.dataset.wrap).toBe('no');
      expect(wrapBtn.innerText).toBe('Wrap');
      expect(editor.session.setUseWrapMode).toHaveBeenCalledTimes(0);
    });
  });
});
