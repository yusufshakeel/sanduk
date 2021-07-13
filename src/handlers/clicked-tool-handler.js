'use strict';
const { inMemoryEventProducer: Producer, inMemoryEventConsumer: Consumer } = require('../events');
const {
  TOPIC: { CLICKED_TOOL }
} = require('../constants/topic-subscriber-constants');
const { EVENT_SHOW_CLICKED_TOOL } = require('../constants/event-constants');

function ClickedToolHandler(inMemoryEventProducer = Producer, inMemoryEventConsumer = Consumer) {
  const self = this;

  let allMenuItems = null;
  let allContentWrappers = null;

  inMemoryEventConsumer.listenTo(CLICKED_TOOL, (eventType, eventData) => {
    self.handleShowClickedToolEvent(eventType, eventData);
  });

  this.handleShowClickedToolEvent = (eventType, eventData) => {
    if (eventType === EVENT_SHOW_CLICKED_TOOL) {
      const { toolName, toolMenuItemId } = eventData;
      const contentWrapperToShow = self.getContentWrapperByName(toolName);
      if (contentWrapperToShow) {
        self.showContentWrapper(contentWrapperToShow, toolMenuItemId);
      }
    }
  };

  this.getMenuItems = () => allMenuItems;
  this.getContentWrappers = () => allContentWrappers;

  this.showContentWrapper = (contentWrapperToShow, toolMenuItemId) => {
    for (let menuItem of allMenuItems) {
      if (menuItem.getAttribute('id') === toolMenuItemId) {
        menuItem.setAttribute('data-sanduk-tool-isActive', 'true');
      } else {
        menuItem.setAttribute('data-sanduk-tool-isActive', 'false');
      }
    }

    for (let contentWrapper of allContentWrappers) {
      if (contentWrapper.getAttribute('id') === contentWrapperToShow.getAttribute('id')) {
        contentWrapper.setAttribute('data-sanduk-tool-isActive', 'true');
        contentWrapper.classList.remove('d-none');
      } else {
        contentWrapper.setAttribute('data-sanduk-tool-isActive', 'false');
        contentWrapper.classList.add('d-none');
      }
    }
  };

  this.getMenuItemById = id => {
    if (!allMenuItems) {
      return null;
    }

    for (let menuItem of allMenuItems) {
      const toolId = menuItem.getAttribute('id');
      if (toolId === id) {
        return menuItem;
      }
    }

    return null;
  };

  this.getContentWrapperByName = name => {
    if (!allContentWrappers) {
      return null;
    }

    for (let contentWrapper of allContentWrappers) {
      const toolName = contentWrapper.getAttribute('data-sanduk-tool-name');
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

    allMenuItems = menuItems;

    for (let menuItem of menuItems) {
      menuItem.addEventListener('click', async () => {
        const toolName = menuItem.getAttribute('data-sanduk-tool-name');
        const toolMenuItemId = menuItem.getAttribute('id');
        await self.clicked({ toolName, toolMenuItemId });
      });
    }
  };

  this.registerContentWrappers = contentWrappers => {
    if (!contentWrappers) {
      return;
    }
    allContentWrappers = contentWrappers;
  };

  this.clicked = async ({ toolName, toolMenuItemId }) => {
    await inMemoryEventProducer.emit(CLICKED_TOOL, {
      eventType: EVENT_SHOW_CLICKED_TOOL,
      eventData: { toolName, toolMenuItemId }
    });
  };
}

module.exports = ClickedToolHandler;
