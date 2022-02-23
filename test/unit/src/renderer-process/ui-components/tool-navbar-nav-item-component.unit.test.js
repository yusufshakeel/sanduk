'use strict';

const toolNavbarNavItemComponent = require('../../../../../src/renderer-process/ui-components/tool-navbar-nav-item-component');

describe('Testing tool navbar nav item component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';

  describe('Testing get html elements', () => {
    const fakeDocument = {
      getElementById: jest.fn(() => ({ id: 1 }))
    };

    describe('When not specifying the navItem to pick', () => {
      test('Should return all navItem', () => {
        const result = toolNavbarNavItemComponent.getHtmlElements({
          prefix,
          documentDOM: fakeDocument
        });
        expect(result).toStrictEqual({
          editNavbarNavItemElements: { id: 1 },
          previewNavbarNavItemElements: { id: 1 },
          splitViewNavbarNavItemElements: { id: 1 }
        });
      });
    });

    describe('When specifying the navItem to pick', () => {
      test('Should return specific navItem', () => {
        const result = toolNavbarNavItemComponent.getHtmlElements({
          prefix,
          specificNavItemsToPick: ['EDIT'],
          documentDOM: fakeDocument
        });
        expect(result).toStrictEqual({
          editNavbarNavItemElements: { id: 1 }
        });
      });
    });
  });

  describe('Testing getHtmlEditNavbarNavItem', () => {
    describe('When using default title', () => {
      test('Should be able to get html', () => {
        const html = toolNavbarNavItemComponent.getHtmlEditNavbarNavItem({ prefix });
        expect(html).toMatch(/class="nav-link"/);
        expect(html).toMatch(/title="Edit"/);
        expect(html).toMatch(/id="some-prefix-navbar-nav-item-edit-btn"/);
      });
    });

    describe('When using custom title', () => {
      test('Should be able to get html', () => {
        const html = toolNavbarNavItemComponent.getHtmlEditNavbarNavItem({
          prefix,
          title: 'Some title'
        });
        expect(html).toMatch(/class="nav-link"/);
        expect(html).toMatch(/title="Some title"/);
        expect(html).toMatch(/id="some-prefix-navbar-nav-item-edit-btn"/);
      });
    });
  });

  describe('Testing getHtmlPreviewNavbarNavItem', () => {
    describe('When using default title', () => {
      test('Should be able to get html', () => {
        const html = toolNavbarNavItemComponent.getHtmlPreviewNavbarNavItem({ prefix });
        expect(html).toMatch(/class="nav-link"/);
        expect(html).toMatch(/title="Preview"/);
        expect(html).toMatch(/id="some-prefix-navbar-nav-item-preview-btn"/);
      });
    });

    describe('When using custom title', () => {
      test('Should be able to get html', () => {
        const html = toolNavbarNavItemComponent.getHtmlPreviewNavbarNavItem({
          prefix,
          title: 'Some title'
        });
        expect(html).toMatch(/class="nav-link"/);
        expect(html).toMatch(/title="Some title"/);
        expect(html).toMatch(/id="some-prefix-navbar-nav-item-preview-btn"/);
      });
    });
  });

  describe('Testing getHtmlSplitViewNavbarNavItem', () => {
    describe('When using default title', () => {
      test('Should be able to get html', () => {
        const html = toolNavbarNavItemComponent.getHtmlSplitViewNavbarNavItem({ prefix });
        expect(html).toMatch(/class="nav-link"/);
        expect(html).toMatch(/title="Split View"/);
        expect(html).toMatch(/id="some-prefix-navbar-nav-item-splitView-btn"/);
      });
    });

    describe('When using custom title', () => {
      test('Should be able to get html', () => {
        const html = toolNavbarNavItemComponent.getHtmlSplitViewNavbarNavItem({
          prefix,
          title: 'Some title'
        });
        expect(html).toMatch(/class="nav-link"/);
        expect(html).toMatch(/title="Some title"/);
        expect(html).toMatch(/id="some-prefix-navbar-nav-item-splitView-btn"/);
      });
    });
  });
});
