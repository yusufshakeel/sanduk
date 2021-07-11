"use strict";
const { inMemoryEventProducer, inMemoryEventConsumer } = require("../events");
const { TOPIC: { CLICKED_TOOL } } = require("../constants/topic-subscriber-constants");
const { EVENT_SHOW_CLICKED_TOOL } = require("../constants/event-constants");

function ClickedToolHandler() {
  const self = this;

  self.menuItems = null;
  self.contentWrappers = null;

  inMemoryEventConsumer.listenTo(CLICKED_TOOL, (eventType, eventData) => {
    if (eventType === EVENT_SHOW_CLICKED_TOOL) {
      const { toolName, toolMenuItemId } = eventData;
      const contentWrapperToShow = self.getContentWrapperByName(toolName);
      if (!contentWrapperToShow) {
        return;
      }
      self.showContentWrapper(contentWrapperToShow, toolMenuItemId);
    }
  });

  this.showContentWrapper = (contentWrapperToShow, toolMenuItemId) => {
    for (let menuItem of self.menuItems) {
      if (menuItem.getAttribute("id") === toolMenuItemId) {
        menuItem.setAttribute("data-sanduk-tool-isActive", "true");
      } else {
        menuItem.setAttribute("data-sanduk-tool-isActive", "false");
      }
    }

    for (let contentWrapper of self.contentWrappers) {
      if (contentWrapper.getAttribute("id") === contentWrapperToShow.getAttribute('id')) {
        contentWrapper.setAttribute("data-sanduk-tool-isActive", "true");
        contentWrapper.classList.remove("d-none");
      } else {
        contentWrapper.setAttribute("data-sanduk-tool-isActive", "false");
        contentWrapper.classList.add("d-none");
      }
    }
  };

  this.getMenuItemById = id => {
    if (!self.menuItems) {
      return null;
    }

    for (let menuItem of self.menuItems) {
      const toolId = menuItem.getAttribute("id");
      if (toolId === id) {
        return menuItem;
      }
    }

    return null;
  };

  this.getContentWrapperByName = name => {
    if (!self.contentWrappers) {
      return null;
    }

    for (let contentWrapper of self.contentWrappers) {
      const toolName = contentWrapper.getAttribute("data-sanduk-tool-name");
      if (toolName === name) {
        return contentWrapper;
      }
    }

    return null;
  };

  this.registerMenuItems = menuItems => {
    if (!menuItems) {
      return;
    }

    self.menuItems = menuItems;

    for (let tool of menuItems) {
      tool.addEventListener("click", async () => {
        const toolName = tool.getAttribute("data-sanduk-tool-name");
        const toolMenuItemId = tool.getAttribute("id");
        await self.clicked({ toolName, toolMenuItemId });
      });
    }
  };

  this.registerContentWrappers = contentWrappers => {
    if (!contentWrappers) {
      return;
    }
    self.contentWrappers = contentWrappers;
  };

  this.clicked = async ({ toolName, toolMenuItemId }) => {
    await inMemoryEventProducer.emit(CLICKED_TOOL, {
      eventType: EVENT_SHOW_CLICKED_TOOL,
      eventData: { toolName, toolMenuItemId }
    });
  };
}

module.exports = ClickedToolHandler;
