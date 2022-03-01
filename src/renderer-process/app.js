'use strict';
const EventEmitter2 = require('eventemitter2');
const eventEmitter = new EventEmitter2();

const tools = require('../renderer-process/tools');
const contextMenu = require('../renderer-process/context-menu');

window.onload = () => {
  contextMenu({ eventEmitter, documentDOM: document });
  tools({ eventEmitter });
};
