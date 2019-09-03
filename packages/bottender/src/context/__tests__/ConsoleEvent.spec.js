import ConsoleEvent from '../ConsoleEvent';

const textMessage = {
  message: {
    text: 'Hello, world',
  },
};

const payload = {
  payload: 'A_PAYLOAD',
};

it('#rawEvent', () => {
  expect(new ConsoleEvent(textMessage).rawEvent).toEqual(textMessage);
  expect(new ConsoleEvent(payload).rawEvent).toEqual(payload);
});

it('#isMessage', () => {
  expect(new ConsoleEvent(textMessage).isMessage).toEqual(true);
  expect(new ConsoleEvent(payload).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new ConsoleEvent(textMessage).message).toEqual({
    text: 'Hello, world',
  });
  expect(new ConsoleEvent(payload).message).toEqual(null);
});

it('#isText', () => {
  expect(new ConsoleEvent(textMessage).isText).toEqual(true);
  expect(new ConsoleEvent(payload).isText).toEqual(false);
});

it('text', () => {
  expect(new ConsoleEvent(textMessage).text).toEqual('Hello, world');
  expect(new ConsoleEvent(payload).text).toEqual(null);
});

it('#isPayload', () => {
  expect(new ConsoleEvent(textMessage).isPayload).toEqual(false);
  expect(new ConsoleEvent(payload).isPayload).toEqual(true);
});

it('payload', () => {
  expect(new ConsoleEvent(textMessage).payload).toEqual(null);
  expect(new ConsoleEvent(payload).payload).toEqual('A_PAYLOAD');
});
