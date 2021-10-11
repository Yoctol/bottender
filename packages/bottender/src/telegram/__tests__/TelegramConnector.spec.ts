import { TelegramClient } from 'messaging-api-telegram';
import { mocked } from 'ts-jest/utils';

import TelegramConnector from '../TelegramConnector';
import TelegramContext from '../TelegramContext';
import TelegramEvent from '../TelegramEvent';

jest.mock('messaging-api-telegram');

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const messageRequest = {
  updateId: 141921689,
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'text',
  },
};

const groupMessageRequest = {
  updateId: 141921689,
  message: {
    messageId: 238,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      allMembersAreAdministrators: true,
    },
    date: 1515758146,
    text: 'hi',
  },
};

const editedMessageRequest = {
  updateId: 141921687,
  editedMessage: {
    messageId: 229,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    date: 1515736358,
    editDate: 1515758017,
    text: 'hiiiii',
  },
};

const groupEditedMessageRequest = {
  updateId: 141921688,
  editedMessage: {
    messageId: 234,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      allMembersAreAdministrators: true,
    },
    date: 1515736470,
    editDate: 1515758048,
    text: 'hiiiii',
  },
};

const channelPostRequest = {
  updateId: 141921710,
  channelPost: {
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    text: 'post~~~',
  },
};

const editedChannelPostRequest = {
  updateId: 141921711,
  editedChannelPost: {
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    editDate: 1515760478,
    text: 'post~~~edited',
  },
};

const inlineQueryRequest = {
  updateId: 141921700,
  inlineQuery: {
    id: '1837258670654537434',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    query: '123',
    offset: '',
  },
};

const chosenInlineResultRequest = {
  updateId: 141921701,
  chosenInlineResult: {
    resultId: '2837258670654537434',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    inlineMessageId: '1837258670654537434',
    query: '123',
  },
};

const callbackQueryRequest = {
  updateId: 141921689,
  callbackQuery: {
    id: '1068230107531367617',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 3300,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: 427770117,
        firstName: 'user_first',
        lastName: 'user_last',
        type: 'private',
      },
      date: 1502371827,
      text: 'text',
    },
    chatInstance: '-1828607021492040088',
    data: 'data',
  },
};

const groupCallbackQueryRequest = {
  updateId: 141921690,
  callbackQuery: {
    id: '1837258667245133763',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 237,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        allMembersAreAdministrators: true,
      },
      date: 1515736481,
      text: 'Hello World',
    },
    chatInstance: '-582211693826679000',
    data: '123',
  },
};

const shippingQueryRequest = {
  updateId: 141921690,
  shippingQuery: {
    id: '123',
    from: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    invoicePayload: 'bot payload',
    shippingAddress: {
      countryCode: 'US',
      state: 'New York',
      city: 'New York',
      streetLine1: 'xx',
      streetLine2: 'xx',
      postCode: '10001',
    },
  },
};

const preCheckoutQueryRequest = {
  updateId: 141921690,
  preCheckoutQuery: {
    id: '123',
    from: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    currency: 'USD',
    totalAmount: 145,
    invoicePayload: 'bot payload',
  },
};

function setup() {
  const connector = new TelegramConnector({
    accessToken: ACCESS_TOKEN,
    skipLegacyProfile: false,
  });

  const client = mocked(TelegramClient).mock.instances[0];

  return {
    connector,
    client,
  };
}

describe('#platform', () => {
  it('should be telegram', () => {
    const { connector } = setup();

    expect(connector.platform).toBe('telegram');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector, client } = setup();

    expect(connector.client).toBe(client);
  });

  it('support custom client', () => {
    const client = new TelegramClient({
      accessToken: ACCESS_TOKEN,
    });

    const connector = new TelegramConnector({ client });

    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct sender id from messageRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(messageRequest);

    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from groupMessageRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(groupMessageRequest);

    expect(senderId).toBe('-225456171');
  });

  it('extract correct sender id from editedMessageRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(editedMessageRequest);

    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from groupEditedMessageRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(groupEditedMessageRequest);

    expect(senderId).toBe('-225456171');
  });

  it('extract correct sender id from channelPostRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(channelPostRequest);

    expect(senderId).toBe('-1001305240521');
  });

  it('extract correct sender id from editedChannelPostRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(editedChannelPostRequest);

    expect(senderId).toBe('-1001305240521');
  });

  it('extract correct sender id from inlineQueryRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(inlineQueryRequest);

    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from chosenInlineResultRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(chosenInlineResultRequest);

    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from callbackQueryRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(callbackQueryRequest);

    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from groupCallbackQueryRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(groupCallbackQueryRequest);

    expect(senderId).toBe('-225456171');
  });

  it('extract correct sender id from shippingQueryRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(shippingQueryRequest);

    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from preCheckoutQueryRequest', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(preCheckoutQueryRequest);
    expect(senderId).toBe('427770117');
  });

  it('return empty string if type is unknown', () => {
    const { connector } = setup();

    // @ts-expect-error
    const senderId = connector.getUniqueSessionKey({});

    expect(senderId).toBe('');
  });
});

describe('#updateSession', () => {
  it('update session with data needed from messageRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, messageRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from groupMessageRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, groupMessageRequest);

    expect(session).toEqual({
      channel: undefined,
      group: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        allMembersAreAdministrators: true,
        _updatedAt: expect.any(String),
      },
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from editedMessageRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, editedMessageRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from groupEditedMessageRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, groupEditedMessageRequest);

    expect(session).toEqual({
      channel: undefined,
      group: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        allMembersAreAdministrators: true,
        _updatedAt: expect.any(String),
      },
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from channelPostRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, channelPostRequest);

    expect(session).toEqual({
      group: undefined,
      user: undefined,
      channel: {
        id: -1001305240521,
        title: 'channel_12345',
        type: 'channel',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from editedChannelPostRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, editedChannelPostRequest);

    expect(session).toEqual({
      group: undefined,
      user: undefined,
      channel: {
        id: -1001305240521,
        title: 'channel_12345',
        type: 'channel',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from inlineQueryRequest', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session, inlineQueryRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from chosenInlineResultRequest', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session, chosenInlineResultRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from callbackQueryRequest', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session, callbackQueryRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from groupCallbackQueryRequest', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session, groupCallbackQueryRequest);

    expect(session).toEqual({
      channel: undefined,
      group: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        allMembersAreAdministrators: true,
        _updatedAt: expect.any(String),
      },
      user: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from shippingQueryRequest', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session, shippingQueryRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });

  it('update session with data needed from preCheckoutQueryRequest', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session, preCheckoutQueryRequest);

    expect(session).toEqual({
      channel: undefined,
      group: undefined,
      user: {
        id: 427770117,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
        _updatedAt: expect.any(String),
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to TelegramEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(messageRequest);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(TelegramEvent);
  });
});

describe('#createContext', () => {
  it('should create TelegramContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(TelegramContext);
  });
});

describe('#preprocess', () => {
  it('should always return shouldNext: true', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {},
        query: {},
        rawBody: '{}',
        body: {},
      })
    ).toEqual({
      shouldNext: true,
    });
  });
});
