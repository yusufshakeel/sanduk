'use strict';

const toolNavbarComponent = require('../../../../../src/renderer-process/ui-components/tool-navbar-component');

describe('Testing tool navbar component', () => {
  const toolName = 'some tool name';
  const prefix = 'some prefix';
  const navbarCollapseHtml = '<div>some navbarCollapseHtml</div>';

  describe('Testing get html', () => {
    test('Should be able to get html', () => {
      const html = toolNavbarComponent.getHtml({ toolName });
      expect(html).toMatch(/some tool name/);
    });
  });

  describe('Testing getHtmlWithNavbarCollapse', () => {
    test('Should be able to get html', () => {
      const html = toolNavbarComponent.getHtmlWithNavbarCollapse({
        toolName,
        prefix,
        navbarCollapseHtml
      });
      expect(html).toMatch(/some tool name/);
      expect(html).toMatch(/id="some prefix-navbar"/);
      expect(html).toMatch(/<div>some navbarCollapseHtml<\/div>/);
    });
  });
});
