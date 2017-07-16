import ConsoleEvent from '../ConsoleEvent';

const textMessage = {
  message: {
    text: 'Hello, world',
  },
};

it('#rawEvent', () => {
  expect(new ConsoleEvent(textMessage).rawEvent).toEqual(textMessage);
});

it('#isMessage', () => {
  expect(new ConsoleEvent(textMessage).isMessage).toEqual(true);
});

it('#message', () => {
  expect(new ConsoleEvent(textMessage).message).toEqual({
    text: 'Hello, world',
  });
});

it('#isTextMessage', () => {
  expect(new ConsoleEvent(textMessage).isTextMessage).toEqual(true);
});
