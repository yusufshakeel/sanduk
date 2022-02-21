'use strict';

const tabPaneNavItemComponent = require('../../../../../src/renderer-process/ui-components/tab-pane-nav-item-component');

describe('Testing tab pane navItem component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prefix = 'some-prefix';
  const dataId = 1;

  describe('Testing get html elements', () => {
    const fakeDocument = {
      getElementsByClassName: jest.fn(() => [{ id: 1 }])
    };

    describe('When not specifying the navItem to pick', () => {
      test('Should return all navItem', () => {
        const result = tabPaneNavItemComponent.getHtmlElements({
          prefix,
          documentDOM: fakeDocument
        });
        expect(result).toStrictEqual({
          validateNavItemElements: [{ id: 1 }],
          prettyNavItemElements: [{ id: 1 }],
          compactNavItemElements: [{ id: 1 }],
          foldNavItemElements: [{ id: 1 }],
          wrapNavItemElements: [{ id: 1 }],
          copyNavItemElements: [{ id: 1 }],
          clearNavItemElements: [{ id: 1 }],
          sortAscendingNavItemElements: [{ id: 1 }],
          sortDescendingNavItemElements: [{ id: 1 }]
        });
      });
    });

    describe('When specifying the navItem to pick', () => {
      test('Should return specific navItem', () => {
        const result = tabPaneNavItemComponent.getHtmlElements({
          prefix,
          specificNavItemsToPick: ['VALIDATE'],
          documentDOM: fakeDocument
        });
        expect(result).toStrictEqual({
          validateNavItemElements: [{ id: 1 }],
          prettyNavItemElements: undefined,
          compactNavItemElements: undefined,
          foldNavItemElements: undefined,
          wrapNavItemElements: undefined,
          copyNavItemElements: undefined,
          clearNavItemElements: undefined,
          sortAscendingNavItemElements: undefined,
          sortDescendingNavItemElements: undefined
        });
      });
    });
  });

  describe('Testing getHtmlValidateNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlValidateNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-validate-btn"/);
      expect(html).toMatch(/title="Validate"/);
    });
  });

  describe('Testing getHtmlPrettyNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlPrettyNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-pretty-btn"/);
      expect(html).toMatch(/title="Pretty"/);
    });
  });

  describe('Testing getHtmlCompactNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlCompactNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-compact-btn"/);
      expect(html).toMatch(/title="Compact"/);
    });
  });

  describe('Testing getHtmlFoldNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlFoldNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-fold-btn"/);
      expect(html).toMatch(/title="Fold"/);
    });
  });

  describe('Testing getHtmlWrapNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlWrapNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-wrap-btn"/);
      expect(html).toMatch(/title="Wrap"/);
    });
  });

  describe('Testing getHtmlCopyNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlCopyNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-copy-btn"/);
      expect(html).toMatch(/title="Copy"/);
    });
  });

  describe('Testing getHtmlClearNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlClearNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-clear-btn"/);
      expect(html).toMatch(/title="Erase"/);
    });
  });

  describe('Testing getHtmlSortDescendingNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlSortDescendingNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-sort-descending-btn"/);
      expect(html).toMatch(/title="Descending sort"/);
    });
  });

  describe('Testing getHtmlSortAscendingNavItem', () => {
    test('Should be able to get html', () => {
      const html = tabPaneNavItemComponent.getHtmlSortAscendingNavItem({ prefix, dataId });
      expect(html).toMatch(/class="nav-link py-0 some-prefix-sort-ascending-btn"/);
      expect(html).toMatch(/title="Ascending sort"/);
    });
  });
});
