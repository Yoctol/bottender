import TelegramContext from '../TelegramContext';
import TelegramEvent from '../TelegramEvent';

jest.mock('delay');
jest.mock('messaging-api-messenger');

let sleep;

beforeEach(() => {
  sleep = require('delay'); // eslint-disable-line global-require
});

const createMockTelegramClient = () => ({
  sendMessage: jest.fn(),
  sendPhoto: jest.fn(),
  sendAudio: jest.fn(),
  sendDocument: jest.fn(),
  sendSticker: jest.fn(),
  sendVideo: jest.fn(),
  sendVoice: jest.fn(),
  sendLocation: jest.fn(),
  sendVenue: jest.fn(),
  sendContact: jest.fn(),
  sendChatAction: jest.fn(),
});

const rawEvent = {
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

const setup = () => {
  const client = createMockTelegramClient();
  const session = {
    user: {
      id: 'fakeUserId',
    },
  };
  const args = {
    client,
    event: new TelegramEvent(rawEvent),
    session,
  };
  const context = new TelegramContext(args);
  context.typing = jest.fn();
  return {
    context,
    session,
    client,
  };
};

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('#platform to be `telegram`', () => {
  const { context } = setup();
  expect(context.platform).toBe('telegram');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(TelegramEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

it('#sendMessage to call client.sendMessage', async () => {
  const { context, client, session } = setup();

  await context.sendMessage('xxx.com');

  expect(client.sendMessage).toBeCalledWith(session.user.id, 'xxx.com');
});

it('#sendPhoto to call client.sendPhoto', async () => {
  const { context, client, session } = setup();

  await context.sendPhoto('xxx.png');

  expect(client.sendPhoto).toBeCalledWith(session.user.id, 'xxx.png');
});

it('#sendAudio to call client.sendAudio', async () => {
  const { context, client, session } = setup();

  await context.sendAudio('xxx.mp3');

  expect(client.sendAudio).toBeCalledWith(session.user.id, 'xxx.mp3');
});

it('#sendDocument to call client.sendDocument', async () => {
  const { context, client, session } = setup();

  await context.sendDocument('xxx.gif');

  expect(client.sendDocument).toBeCalledWith(session.user.id, 'xxx.gif');
});

it('#sendSticker to call client.sendSticker', async () => {
  const { context, client, session } = setup();

  await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');

  expect(client.sendSticker).toBeCalledWith(
    session.user.id,
    'CAADAgADQAADyIsGAAE7MpzFPFQX5QI'
  );
});

it('#sendVideo to call client.sendVideo', async () => {
  const { context, client, session } = setup();

  await context.sendVideo('xxx.mp4');

  expect(client.sendVideo).toBeCalledWith(session.user.id, 'xxx.mp4');
});

it('#sendVoice to call client.sendVoice', async () => {
  const { context, client, session } = setup();

  await context.sendVoice('xxx.ogg');

  expect(client.sendVoice).toBeCalledWith(session.user.id, 'xxx.ogg');
});

it('#sendLocation to call client.sendLocation', async () => {
  const { context, client, session } = setup();

  const location = {};

  await context.sendLocation(location);

  expect(client.sendLocation).toBeCalledWith(session.user.id, location);
});

it('#sendVenue to call client.sendVenue', async () => {
  const { context, client, session } = setup();

  const venue = {};

  await context.sendVenue(venue);

  expect(client.sendVenue).toBeCalledWith(session.user.id, venue);
});

it('#sendContact to call client.sendContact', async () => {
  const { context, client, session } = setup();

  const contact = {};

  await context.sendContact(contact);

  expect(client.sendContact).toBeCalledWith(session.user.id, contact);
});

it('#sendChatAction to call client.sendChatAction', async () => {
  const { context, client, session } = setup();

  await context.sendChatAction('typing');

  expect(client.sendChatAction).toBeCalledWith(session.user.id, 'typing');
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });
});
