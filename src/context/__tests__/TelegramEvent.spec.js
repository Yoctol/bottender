import Telegramevent from '../TelegramEvent';

const textMessage = {
  message: {
    message_id: 666,
    from: {
      id: 313534466,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    },
    chat: {
      id: 427770117,
      first_name: 'first',
      last_name: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'text',
  },
};

it('#rawEvent', () => {
  expect(new Telegramevent(textMessage).rawEvent).toEqual(textMessage);
});

it('#isMessage', () => {
  expect(new Telegramevent(textMessage).isMessage).toEqual(true);
});

it('#message', () => {
  expect(new Telegramevent(textMessage).message).toEqual({
    message_id: 666,
    from: {
      id: 313534466,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    },
    chat: {
      id: 427770117,
      first_name: 'first',
      last_name: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'text',
  });
});

it('#isTextMessage', () => {
  expect(new Telegramevent(textMessage).isTextMessage).toEqual(true);
});
