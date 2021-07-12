"use strict";
const { inMemoryEventProducer } = require("../../../../src/events");
const ClickedToolHandler = require("../../../../src/handlers/clicked-tool-handler");

describe("Testing clicked", () => {
  test("Should be able to emit event on click", () => {
    const spy = jest.spyOn(inMemoryEventProducer, "emit");
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.clicked({ toolName: "TOOL_NAME", toolMenuItemId: "TOOL_MENU_ITEM_ID" });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("CLICKED_TOOL", {
      eventType: "EVENT_SHOW_CLICKED_TOOL",
      eventData: { toolName: "TOOL_NAME", toolMenuItemId: "TOOL_MENU_ITEM_ID" }
    });
    spy.mockRestore();
  });
});

describe("Testing registerContentWrappers", () => {
  test("Should return null if content wrappers not present", () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerContentWrappers();
    expect(clickedToolHandler.getContentWrappers()).toBeNull();
  });

  test("Should be able to return content wrappers", () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerContentWrappers([1, 2]);
    expect(clickedToolHandler.getContentWrappers()).toStrictEqual([1, 2]);
  });
});

describe("Testing registerMenuItems", () => {
  test("Should return null if menu items not present", () => {
    const clickedToolHandler = new ClickedToolHandler();
    clickedToolHandler.registerMenuItems();
    expect(clickedToolHandler.getMenuItems()).toBeNull();
  });

  test("Should be able to return menu items", () => {
    const clickedToolHandler = new ClickedToolHandler();
    const menuItemElement = {
      getAttribute: jest.fn((attribute) => {
        return { id: 'SOME_ID', 'data-sanduk-tool-name': 'SOME_TOOL_NAME'}[attribute];
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
