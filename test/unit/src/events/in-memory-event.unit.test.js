'use strict';
const EventEmitter2 = require('eventemitter2');
const eventEmitter2 = new EventEmitter2();

const {
  InMemoryEventProducer,
  InMemoryEventConsumer
} = require('../../../../src/events/in-memory-event');

describe('Testing InMemoryEventProducer', () => {
  test('Should be able to create producer', async () => {
    const fakeClient = {
      emitAsync: jest.fn(async () => {})
    };
    const producer = new InMemoryEventProducer({ client: fakeClient });
    await producer.emit('SOME_TOPIC', {
      eventType: 'SOME_EVENT_TYPE',
      eventData: 'SOME_EVENT_DATA'
    });
    expect(producer).toHaveProperty('emit');
    expect(fakeClient.emitAsync).toHaveBeenCalledTimes(1);
    expect(fakeClient.emitAsync).toHaveBeenCalledWith('SOME_TOPIC', {
      eventType: 'SOME_EVENT_TYPE',
      eventData: 'SOME_EVENT_DATA'
    });
  });
});

describe('Testing InMemoryEventConsumer', () => {
  test('Should be able to create consumer', async () => {
    const handler = jest.fn(() => {});
    const consumer = new InMemoryEventConsumer({ client: eventEmitter2 });
    const producer = new InMemoryEventProducer({ client: eventEmitter2 });
    await consumer.listenTo('SOME_TOPIC', handler);
    await producer.emit('SOME_TOPIC', {
      eventType: 'SOME_EVENT_TYPE',
      eventData: 'SOME_EVENT_DATA'
    });
    expect(consumer).toHaveProperty('listenTo');
    expect(handler).toHaveBeenCalledWith('SOME_EVENT_TYPE', 'SOME_EVENT_DATA');
  });
});
