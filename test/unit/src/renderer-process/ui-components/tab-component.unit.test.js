'use strict';

const tabComponent = require('../../../../../src/renderer-process/ui-components/tab-component');

describe('Testing tab component', () => {
  const prefix = 'some-prefix';
  const id = 1;
  const otherClassNames = ['class1', 'class2'];
  const tabName = 'some tab name';

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = tabComponent.getHtml({ prefix });
      expect(html).toMatch(/id="some-prefix-Tab"/);
      expect(html).toMatch(/id="some-prefix-TabContent"/);
    });
  });

  describe('Testing get html tab nav item', () => {
    test('Should be able to get html tab navItem', () => {
      const html = tabComponent.getHtmlTabNavItem({ id, prefix, otherClassNames, tabName });
      expect(html).toMatch(/class="nav-link some-prefix-tab class1 class2"/);
      expect(html).toMatch(/id="some-prefix-tab-1"/);
      expect(html).toMatch(/data-tabid="1"/);
      expect(html).toMatch(/some tab name/);
    });
  });
});
