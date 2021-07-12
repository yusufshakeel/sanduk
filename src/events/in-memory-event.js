'use strict';

function InMemoryEventProducer({ client }) {
  this.emit = async (topic, message) => {
    const { eventType, eventData } = message;
    return client.emitAsync(topic, { eventType, eventData });
  };

  this.removeAllListeners = topic => {
    client.removeAllListeners(topic);
  };
}

function InMemoryEventConsumer({ client }) {
  this.listenTo = (topic, handler) => {
    client.on(topic, async message => {
      handler(message.eventType, message.eventData);
    });
  };
}

module.exports = { InMemoryEventProducer, InMemoryEventConsumer };