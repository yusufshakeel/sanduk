'use strict';
const { inMemoryEventProducer } = require('../../../../src/events');
const ClickedToolHandler = require('../../../../src/handlers/clicked-tool-handler');

describe('Testing clicked', () => {
  test('Should emit event on click', () => {
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
  test('Should return null if no content wrappers exists', () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerContentWrappers();
    expect(clickedToolHandler.getContentWrappers()).toBeNull();
  });

  test('Should return content wrappers', () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerContentWrappers([1, 2]);
    expect(clickedToolHandler.getContentWrappers()).toStrictEqual([1, 2]);
  });
});

describe('Testing registerMenuItems', () => {
  test('Should return null if no menu items exists', () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerMenuItems();
    expect(clickedToolHandler.getMenuItems()).toBeNull();
  });

  test('Should return menu items', () => {
    const clickedToolHandler = new ClickedToolHandler();
    const menuItemElement = {
      getAttribute: jest.fn(attribute => {
        return { id: 'SOME_ID', 'data-sanduk-tool-name': 'SOME_TOOL_NAME' }[attribute];
      }),
      addEventListener: jest.fn((event, callback) => callback())
    };
    clickedToolHandler.registerMenuItems([menuItemElement]);
    expect(clickedToolHandler.getMenuItems()).toStrictEqual([menuItemElement]);
    expect(menuItemElement.addEventListener).toHaveBeenCalledTimes(1);
    expect(menuItemElement.getAttribute).toHaveBeenCalledTimes(2);
    expect(menuItemElement.getAttribute).nthCalledWith(1, 'data-sanduk-tool-name');
    expect(menuItemElement.getAttribute).nthCalledWith(2, 'id');
  });
});

describe('Testing getContentWrapperByName', () => {
  test('Should return null if no content wrapper exists', () => {
    const clickedToolHandler = new ClickedToolHandler();
    expect(clickedToolHandler.getContentWrapperByName('SOME_NAME')).toBeNull();
  });

  test('Should return content wrapper by name', () => {
    const clickedToolHandler = new ClickedToolHandler();
    const contentWrapperElement = {
      getAttribute: jest.fn(() => 'SOME_NAME')
    };
    clickedToolHandler.registerContentWrappers([contentWrapperElement]);
    expect(clickedToolHandler.getContentWrapperByName('SOME_NAME')).toStrictEqual(
      contentWrapperElement
    );
  });

  test('Should return null if content wrapper is not found', () => {
    const clickedToolHandler = new ClickedToolHandler();
    const contentWrapperElement = {
      getAttribute: jest.fn(() => 'SOME_NAME')
    };
    clickedToolHandler.registerContentWrappers([contentWrapperElement]);
    expect(clickedToolHandler.getContentWrapperByName('SOME_OTHER_NAME')).toBeNull();
  });
});
