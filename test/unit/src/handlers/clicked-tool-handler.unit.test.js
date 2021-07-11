'use strict';
const { inMemoryEventProducer } = require('../../../../src/events');
const ClickedToolHandler = require('../../../../src/handlers/clicked-tool-handler');

describe('Testing clicked', () => {
  test('Should be able to emit event on click', () => {
    const spy = jest.spyOn(inMemoryEventProducer, 'emit');
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.clicked({ toolName: 'TOOL_NAME', toolMenuItemId: 'TOOL_MENU_ITEM_ID' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('CLICKED_TOOL', {
      eventType: 'EVENT_SHOW_CLICKED_TOOL',
      eventData: { toolName: 'TOOL_NAME', toolMenuItemId: 'TOOL_MENU_ITEM_ID' }
    });
    spy.mockRestore();
  });
});

describe('Testing registerContentWrappers', () => {
  test('Should return null if content wrappers not present', () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerContentWrappers();
    expect(clickedToolHandler.getContentWrappers()).toBeNull();
  });

  test('Should be able to content wrappers', () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerContentWrappers([1, 2]);
    expect(clickedToolHandler.getContentWrappers()).toStrictEqual([1, 2]);
  });
});
