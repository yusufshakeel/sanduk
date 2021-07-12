'use strict';
const { inMemoryEventProducer } = require('../../../../src/events');
const ClickedToolHandler = require('../../../../src/handlers/clicked-tool-handler');
const {
  TOPIC: { CLICKED_TOOL }
} = require('../../../../src/constants/topic-subscriber-constants');

beforeEach(() => {
  inMemoryEventProducer.removeAllListeners(CLICKED_TOOL);
});

describe('Testing clicked', () => {
  test('Should emit event on click', () => {
    const fakeInMemoryEventProducer = {
      emit: jest.fn()
    };
    const clickedToolHandler = new ClickedToolHandler(fakeInMemoryEventProducer);
    clickedToolHandler.clicked({ toolName: 'TOOL_NAME', toolMenuItemId: 'TOOL_MENU_ITEM_ID' });
    expect(fakeInMemoryEventProducer.emit).toHaveBeenCalledTimes(1);
    expect(fakeInMemoryEventProducer.emit).toHaveBeenCalledWith('CLICKED_TOOL', {
      eventType: 'EVENT_SHOW_CLICKED_TOOL',
      eventData: { toolName: 'TOOL_NAME', toolMenuItemId: 'TOOL_MENU_ITEM_ID' }
    });
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
    const contentWrapperElement = {
      getAttribute: jest.fn(() => 'SOME_NAME')
    };
    clickedToolHandler.registerContentWrappers([contentWrapperElement]);
    expect(clickedToolHandler.getContentWrappers()).toStrictEqual([contentWrapperElement]);
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

describe('Testing getMenuItemById', () => {
  test('Should return null if no menu item exists', () => {
    const clickedToolHandler = new ClickedToolHandler();
    expect(clickedToolHandler.getMenuItemById('SOME_ID')).toBeNull();
  });

  test('Should return menu item by id', () => {
    const clickedToolHandler = new ClickedToolHandler();
    const menuItemElement = {
      getAttribute: jest.fn(() => 'SOME_ID'),
      addEventListener: jest.fn()
    };
    clickedToolHandler.registerMenuItems([menuItemElement]);
    expect(clickedToolHandler.getMenuItemById('SOME_ID')).toStrictEqual(menuItemElement);
  });

  test('Should return null if menu item is not found', () => {
    const clickedToolHandler = new ClickedToolHandler();
    const menuItemElement = {
      getAttribute: jest.fn(attribute => {
        return { id: 'SOME_ID', 'data-sanduk-tool-name': 'SOME_TOOL_NAME' }[attribute];
      }),
      addEventListener: jest.fn((event, callback) => callback())
    };
    clickedToolHandler.registerMenuItems([menuItemElement]);
    expect(clickedToolHandler.getMenuItemById('SOME_OTHER_ID')).toBeNull();
  });
});

describe('Testing showContentWrapper', () => {
  test('Should be able to show content wrapper', () => {
    const { clickedToolHandler, menuItemElements, contentWrapperElements } =
      getMenuItemAndContentWrapperElements();
    clickedToolHandler.registerMenuItems(menuItemElements);
    clickedToolHandler.registerContentWrappers(contentWrapperElements);
    clickedToolHandler.showContentWrapper(contentWrapperElements[0], 'MENU_ITEM_1');

    expect(menuItemElements[0].setAttribute).toHaveBeenCalledWith(
      'data-sanduk-tool-isActive',
      'true'
    );
    expect(menuItemElements[1].setAttribute).toHaveBeenCalledWith(
      'data-sanduk-tool-isActive',
      'false'
    );

    expect(contentWrapperElements[0].setAttribute).toHaveBeenCalledWith(
      'data-sanduk-tool-isActive',
      'true'
    );
    expect(contentWrapperElements[1].setAttribute).toHaveBeenCalledWith(
      'data-sanduk-tool-isActive',
      'false'
    );

    expect(contentWrapperElements[0].classList.remove).toHaveBeenCalledWith('d-none');
    expect(contentWrapperElements[1].classList.add).toHaveBeenCalledWith('d-none');
  });
});

describe('Testing handleShowClickedToolEvent', () => {
  test('Should do nothing if eventType is not EVENT_SHOW_CLICKED_TOOL', () => {
    const clickedToolHandler = new ClickedToolHandler();
    const spy = jest.spyOn(clickedToolHandler, 'handleShowClickedToolEvent');
    inMemoryEventProducer.emit(CLICKED_TOOL, {
      eventType: 'SOME_EVENT_TYPE',
      eventData: { toolName: 'SOME_NAME', toolMenuItemId: 'SOME_ID' }
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('SOME_EVENT_TYPE', {
      toolName: 'SOME_NAME',
      toolMenuItemId: 'SOME_ID'
    });
    spy.mockRestore();
  });

  test('Should do nothing if contentWrapperToShow is not found', () => {
    const { clickedToolHandler, menuItemElements, contentWrapperElements } =
      getMenuItemAndContentWrapperElements();
    clickedToolHandler.registerMenuItems(menuItemElements);
    clickedToolHandler.registerContentWrappers(contentWrapperElements);
    const spyHandleShowClickedToolEvent = jest.spyOn(
      clickedToolHandler,
      'handleShowClickedToolEvent'
    );
    const spyShowContentWrapper = jest.spyOn(clickedToolHandler, 'showContentWrapper');
    inMemoryEventProducer.emit(CLICKED_TOOL, {
      eventType: 'EVENT_SHOW_CLICKED_TOOL',
      eventData: { toolName: 'TOOL_10', toolMenuItemId: 'MENU_ITEM_10' }
    });
    expect(spyHandleShowClickedToolEvent).toHaveBeenCalledTimes(1);
    expect(spyHandleShowClickedToolEvent).toHaveBeenCalledWith('EVENT_SHOW_CLICKED_TOOL', {
      toolName: 'TOOL_10',
      toolMenuItemId: 'MENU_ITEM_10'
    });
    expect(spyShowContentWrapper).toHaveBeenCalledTimes(0);
    spyHandleShowClickedToolEvent.mockRestore();
  });

  test('Should showContentWrapper if contentWrapperToShow is found', () => {
    const { clickedToolHandler, menuItemElements, contentWrapperElements } =
      getMenuItemAndContentWrapperElements();
    clickedToolHandler.registerMenuItems(menuItemElements);
    clickedToolHandler.registerContentWrappers(contentWrapperElements);
    const spyHandleShowClickedToolEvent = jest.spyOn(
      clickedToolHandler,
      'handleShowClickedToolEvent'
    );
    const spyShowContentWrapper = jest.spyOn(clickedToolHandler, 'showContentWrapper');
    inMemoryEventProducer.emit(CLICKED_TOOL, {
      eventType: 'EVENT_SHOW_CLICKED_TOOL',
      eventData: { toolName: 'TOOL_1', toolMenuItemId: 'MENU_ITEM_1' }
    });
    expect(spyHandleShowClickedToolEvent).toHaveBeenCalledTimes(1);
    expect(spyHandleShowClickedToolEvent).toHaveBeenCalledWith('EVENT_SHOW_CLICKED_TOOL', {
      toolName: 'TOOL_1',
      toolMenuItemId: 'MENU_ITEM_1'
    });
    expect(spyShowContentWrapper).toHaveBeenCalledTimes(1);
    spyHandleShowClickedToolEvent.mockRestore();
  });
});

function getMenuItemAndContentWrapperElements() {
  const clickedToolHandler = new ClickedToolHandler();
  const menuItemElements = [
    {
      getAttribute: jest.fn(attribute => {
        return {
          'data-sanduk-tool-isActive': 'false',
          'data-sanduk-tool-name': 'TOOL_1',
          id: 'MENU_ITEM_1'
        }[attribute];
      }),
      addEventListener: jest.fn((event, callback) => callback()),
      setAttribute: jest.fn()
    },
    {
      getAttribute: jest.fn(attribute => {
        return {
          'data-sanduk-tool-isActive': 'false',
          'data-sanduk-tool-name': 'TOOL_2',
          id: 'MENU_ITEM_2'
        }[attribute];
      }),
      addEventListener: jest.fn((event, callback) => callback()),
      setAttribute: jest.fn()
    }
  ];
  const contentWrapperElements = [
    {
      getAttribute: jest.fn(attribute => {
        return {
          'data-sanduk-tool-isActive': 'false',
          'data-sanduk-tool-name': 'TOOL_1',
          id: 'CONTENT_WRAPPER_1'
        }[attribute];
      }),
      setAttribute: jest.fn(),
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    },
    {
      getAttribute: jest.fn(attribute => {
        return {
          'data-sanduk-tool-isActive': 'false',
          'data-sanduk-tool-name': 'TOOL_2',
          id: 'CONTENT_WRAPPER_2'
        }[attribute];
      }),
      setAttribute: jest.fn(),
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    }
  ];
  return { clickedToolHandler, menuItemElements, contentWrapperElements };
}