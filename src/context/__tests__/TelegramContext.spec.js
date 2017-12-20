jest.mock('delay');
jest.mock('messaging-api-telegram');
jest.mock('warning');

let TelegramContext;
let TelegramEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  TelegramContext = require('../TelegramContext').default;
  TelegramEvent = require('../TelegramEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

const createMockTelegramClient = () => ({
  sendMessage: jest.fn(),
  sendPhoto: jest.fn(),
  sendAudio: jest.fn(),
  sendDocument: jest.fn(),
  sendSticker: jest.fn(),
  sendVideo: jest.fn(),
  sendVoice: jest.fn(),
  sendVideoNote: jest.fn(),
  sendMediaGroup: jest.fn(),
  sendLocation: jest.fn(),
  sendVenue: jest.fn(),
  sendContact: jest.fn(),
  sendChatAction: jest.fn(),
  sendInvoice: jest.fn(),
  sendGame: jest.fn(),
  setGameScore: jest.fn(),
  getGameHighScores: jest.fn(),
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

const setup = ({ session } = { session: { user: { id: 'fakeUserId' } } }) => {
  const client = createMockTelegramClient();
  const args = {
    client,
    event: new TelegramEvent(rawEvent),
    session,
  };
  const context = new TelegramContext(args);
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

describe('#sendText', () => {
  it('should call client.sendMessage', async () => {
    const { context, client, session } = setup();

    await context.sendText('xxx.com');

    expect(client.sendMessage).toBeCalledWith(session.user.id, 'xxx.com');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('xxx.com');

    expect(context._isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendText('xxx.com');

    expect(warning).toBeCalled();
    expect(client.sendMessage).not.toBeCalled();
  });
});

describe('#sendMessage', () => {
  it('should call client.sendMessage', async () => {
    const { context, client, session } = setup();

    await context.sendMessage('xxx.com');

    expect(client.sendMessage).toBeCalledWith(session.user.id, 'xxx.com');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendMessage('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { client, event } = setup();
    const args = {
      client,
      event,
      session: undefined,
    };
    const context = new TelegramContext(args);

    await context.sendMessage('xxx.com');

    expect(client.sendMessage).not.toBeCalled();
  });
});

describe('#sendPhoto', () => {
  it('should call client.sendPhoto', async () => {
    const { context, client, session } = setup();

    await context.sendPhoto('xxx.png');

    expect(client.sendPhoto).toBeCalledWith(session.user.id, 'xxx.png');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendPhoto('xxx.png');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendAudio', () => {
  it('should call client.sendAudio', async () => {
    const { context, client, session } = setup();

    await context.sendAudio('xxx.mp3');

    expect(client.sendAudio).toBeCalledWith(session.user.id, 'xxx.mp3');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendAudio('xxx.mp3');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendDocument', () => {
  it('should call client.sendDocument', async () => {
    const { context, client, session } = setup();

    await context.sendDocument('xxx.gif');

    expect(client.sendDocument).toBeCalledWith(session.user.id, 'xxx.gif');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendDocument('xxx.gif');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendSticker', () => {
  it('should call client.sendSticker', async () => {
    const { context, client, session } = setup();

    await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');

    expect(client.sendSticker).toBeCalledWith(
      session.user.id,
      'CAADAgADQAADyIsGAAE7MpzFPFQX5QI'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVideo', () => {
  it('should call client.sendVideo', async () => {
    const { context, client, session } = setup();

    await context.sendVideo('xxx.mp4');

    expect(client.sendVideo).toBeCalledWith(session.user.id, 'xxx.mp4');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideo('xxx.mp4');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVoice', () => {
  it('should call client.sendVoice', async () => {
    const { context, client, session } = setup();

    await context.sendVoice('xxx.ogg');

    expect(client.sendVoice).toBeCalledWith(session.user.id, 'xxx.ogg');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVoice('xxx.ogg');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVideoNote', () => {
  it('should call client.sendVideoNote', async () => {
    const { context, client, session } = setup();

    await context.sendVideoNote('xxx.mp4');

    expect(client.sendVideoNote).toBeCalledWith(session.user.id, 'xxx.mp4');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideoNote('xxx.mp4');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendMediaGroup', () => {
  it('should call client.sendMediaGroup', async () => {
    const { context, client, session } = setup();

    await context.sendMediaGroup([
      { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
    ]);

    expect(client.sendMediaGroup).toBeCalledWith(session.user.id, [
      { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
    ]);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendMediaGroup([
      { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
    ]);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendLocation', () => {
  it('#sendLocation to call client.sendLocation', async () => {
    const { context, client, session } = setup();

    const location = {};

    await context.sendLocation(location);

    expect(client.sendLocation).toBeCalledWith(session.user.id, location);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const location = {};

    await context.sendLocation(location);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVenue', () => {
  it('should call client.sendVenue', async () => {
    const { context, client, session } = setup();

    const venue = {};

    await context.sendVenue(venue);

    expect(client.sendVenue).toBeCalledWith(session.user.id, venue);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const venue = {};

    await context.sendVenue(venue);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendContact', () => {
  it('should to call client.sendContact', async () => {
    const { context, client, session } = setup();

    const contact = {};

    await context.sendContact(contact);

    expect(client.sendContact).toBeCalledWith(session.user.id, contact);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const contact = {};

    await context.sendContact(contact);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendChatAction', () => {
  it('should to call client.sendChatAction', async () => {
    const { context, client, session } = setup();

    await context.sendChatAction('typing');

    expect(client.sendChatAction).toBeCalledWith(session.user.id, 'typing');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendChatAction('typing');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendInvoice', () => {
  const invoice = {
    title: 'product name',
    description: 'product description',
    payload: 'bot-defined invoice payload',
    provider_token: 'PROVIDER_TOKEN',
    start_parameter: 'pay',
    currency: 'USD',
    prices: [
      { label: 'product', amount: 11000 },
      { label: 'tax', amount: 11000 },
    ],
  };
  it('should to call client.Invoice', async () => {
    const { context, client, session } = setup();

    await context.sendInvoice(invoice);

    expect(client.sendInvoice).toBeCalledWith(session.user.id, invoice);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendInvoice(invoice);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendGame', () => {
  it('should to call client.Invoice', async () => {
    const { context, client, session } = setup();

    await context.sendGame('Mario Bros.');

    expect(client.sendGame).toBeCalledWith(session.user.id, 'Mario Bros.');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendGame('Mario Bros.');

    expect(context.isHandled).toBe(true);
  });
});

describe('#setGameScore', () => {
  it('should to call client.Invoice', async () => {
    const { context, client, session } = setup();

    await context.setGameScore(999);

    expect(client.setGameScore).toBeCalledWith(session.user.id, 999);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setGameScore(999);

    expect(context.isHandled).toBe(true);
  });
});

describe('#getGameHighScores', () => {
  it('should to call client.Invoice', async () => {
    const { context, client, session } = setup();

    const response = {
      ok: true,
      result: [
        {
          position: 1,
          user: {
            id: 427770117,
            is_bot: false,
            first_name: 'first',
          },
          score: 999,
        },
      ],
    };

    client.getGameHighScores.mockReturnValue(Promise.resolve(response));

    const result = await context.getGameHighScores();

    expect(client.getGameHighScores).toBeCalledWith(session.user.id);
    expect(result).toEqual(response);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.getGameHighScores();

    expect(context.isHandled).toBe(true);
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });

  it('should call sleep', async () => {
    const { context } = setup();

    await context.typing(10);

    expect(sleep).toBeCalled();
  });
});
