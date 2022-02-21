'use strict';

const tabsTemplate = require('../../../../../src/renderer-process/templates/tabs-template');

describe('Testing tabs template', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return tabs and tabPanes html', () => {
    const prefix = 'some-prefix';
    const totalNumberOfTabs = 2;
    const tabPaneHtmlTemplate = jest.fn(
      ({ prefix, id, addActiveClass }) => `<div>${prefix} ${id} ${addActiveClass}</div>`
    );
    const tabsHtml = tabsTemplate({ prefix, totalNumberOfTabs, tabPaneHtmlTemplate });

    expect(tabsHtml.tabs).toMatch(/<button class="nav-link some-prefix-tab active"/);
    expect(tabsHtml.tabs).toMatch(/<button class="nav-link some-prefix-tab "/);
    expect(tabsHtml.tabs).toMatch(/id="some-prefix-tab-1"/);
    expect(tabsHtml.tabs).toMatch(/id="some-prefix-tab-2"/);
    expect(tabsHtml.tabs).toMatch(/data-tabid="1"/);
    expect(tabsHtml.tabs).toMatch(/data-tabid="2"/);

    expect(tabPaneHtmlTemplate).toHaveBeenCalledTimes(2);
    expect(tabsHtml.tabPanes).toMatch(/<div>some-prefix 1 true<\/div>/);
    expect(tabsHtml.tabPanes).toMatch(/<div>some-prefix 2 false<\/div>/);
  });
});
