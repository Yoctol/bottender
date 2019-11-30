import { TelegramClient } from 'messaging-api-telegram';

import TelegramConnector from '../TelegramConnector';
import TelegramContext from '../../context/TelegramContext';
import TelegramEvent from '../../context/TelegramEvent';

jest.mock('messaging-api-telegram');

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const messageRequest = {
  body: {
    update_id: 141921689,
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
  },
};

const groupMessageRequest = {
  body: {
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
  },
};

const editedMessageRequest = {
  body: {
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
  },
};

const groupEditedMessageRequest = {
  body: {
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
  },
};

const channelPostRequest = {
  body: {
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
  },
};

const editedChannelPostRequest = {
  body: {
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
  },
};

const inlineQueryRequest = {
  body: {
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
  },
};

const chosenInlineResultRequest = {
  body: {
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
  },
};

const callbackQueryRequest = {
  body: {
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
  },
};

const groupCallbackQueryRequest = {
  body: {
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
  },
};

const shippingQueryRequest = {
  body: {
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
  },
};

const preCheckoutQueryRequest = {
  body: {
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
  },
};

function setup() {
  const mockTelegramClient = {};
  TelegramClient.connect = jest.fn();
  TelegramClient.connect.mockReturnValue(mockTelegramClient);
  return {
    mockTelegramClient,
    connector: new TelegramConnector({ accessToken: ACCESS_TOKEN }),
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
    const { connector, mockTelegramClient } = setup();
    expect(connector.client).toBe(mockTelegramClient);
  });

  it('support custom client', () => {
    const client = {};
    const connector = new TelegramConnector({ client });
    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct sender id from messageRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(messageRequest.body);
    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from groupMessageRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(groupMessageRequest.body);
    expect(senderId).toBe('-225456171');
  });

  it('extract correct sender id from editedMessageRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(editedMessageRequest.body);
    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from groupEditedMessageRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      groupEditedMessageRequest.body
    );
    expect(senderId).toBe('-225456171');
  });

  it('extract correct sender id from channelPostRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(channelPostRequest.body);
    expect(senderId).toBe('-1001305240521');
  });

  it('extract correct sender id from editedChannelPostRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      editedChannelPostRequest.body
    );
    expect(senderId).toBe('-1001305240521');
  });

  it('extract correct sender id from inlineQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(inlineQueryRequest.body);
    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from chosenInlineResultRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      chosenInlineResultRequest.body
    );
    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from callbackQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(callbackQueryRequest.body);
    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from groupCallbackQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      groupCallbackQueryRequest.body
    );
    expect(senderId).toBe('-225456171');
  });

  it('extract correct sender id from shippingQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(shippingQueryRequest.body);
    expect(senderId).toBe('427770117');
  });

  it('extract correct sender id from preCheckoutQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      preCheckoutQueryRequest.body
    );
    expect(senderId).toBe('427770117');
  });

  it('return empty string if type is unknown', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey({});
    expect(senderId).toBe('');
  });
});

describe('#updateSession', () => {
  it('update session with data needed from messageRequest', async () => {
    const { connector } = setup();

    const session = {};

    await connector.updateSession(session, messageRequest.body);

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

    await connector.updateSession(session, groupMessageRequest.body);

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

    await connector.updateSession(session, editedMessageRequest.body);

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

    await connector.updateSession(session, groupEditedMessageRequest.body);

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

    await connector.updateSession(session, channelPostRequest.body);

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

    await connector.updateSession(session, editedChannelPostRequest.body);

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

    await connector.updateSession(session, inlineQueryRequest.body);

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

    await connector.updateSession(session, chosenInlineResultRequest.body);

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

    await connector.updateSession(session, callbackQueryRequest.body);

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

    await connector.updateSession(session, groupCallbackQueryRequest.body);

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

    await connector.updateSession(session, shippingQueryRequest.body);

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

    await connector.updateSession(session, preCheckoutQueryRequest.body);

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
    const events = connector.mapRequestToEvents(messageRequest.body);

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
