'use strict';
const EventEmitter2 = require('eventemitter2');
const eventEmitter2 = new EventEmitter2();
const { InMemoryEventProducer, InMemoryEventConsumer } = require('./in-memory-event');

module.exports = {
  inMemoryEventProducer: new InMemoryEventProducer({ client: eventEmitter2 }),
  inMemoryEventConsumer: new InMemoryEventConsumer({ client: eventEmitter2 })
};
