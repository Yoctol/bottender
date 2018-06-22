import TestEvent from '../TestEvent';

const textMessage = {
  message: {
    text: 'Hello, world',
  },
};

const payload = {
  payload: 'A_PAYLOAD',
};

it('#rawEvent', () => {
  expect(new TestEvent(textMessage).rawEvent).toEqual(textMessage);
  expect(new TestEvent(payload).rawEvent).toEqual(payload);
});

it('#isMessage', () => {
  expect(new TestEvent(textMessage).isMessage).toEqual(true);
  expect(new TestEvent(payload).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new TestEvent(textMessage).message).toEqual({
    text: 'Hello, world',
  });
  expect(new TestEvent(payload).message).toEqual(null);
});

it('#isText', () => {
  expect(new TestEvent(textMessage).isText).toEqual(true);
  expect(new TestEvent(payload).isText).toEqual(false);
});

it('text', () => {
  expect(new TestEvent(textMessage).text).toEqual('Hello, world');
  expect(new TestEvent(payload).text).toEqual(null);
});

it('#isPayload', () => {
  expect(new TestEvent(textMessage).isPayload).toEqual(false);
  expect(new TestEvent(payload).isPayload).toEqual(true);
});

it('payload', () => {
  expect(new TestEvent(textMessage).payload).toEqual(null);
  expect(new TestEvent(payload).payload).toEqual('A_PAYLOAD');
});
