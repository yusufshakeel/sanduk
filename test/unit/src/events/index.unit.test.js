'use strict';
const events = require('../../../../src/events');

test('Should have the required properties', () => {
  expect(events).toHaveProperty('inMemoryEventProducer');
  expect(events).toHaveProperty('inMemoryEventConsumer');
});
