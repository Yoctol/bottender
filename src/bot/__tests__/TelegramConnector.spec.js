import { TelegramClient } from 'messaging-api-telegram';

import TelegramConnector from '../TelegramConnector';
import TelegramEvent from '../../context/TelegramEvent';
import TelegramContext from '../../context/TelegramContext';

jest.mock('messaging-api-telegram');

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const messageRequest = {
  body: {
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
  },
};

const callbackQueryRequest = {
  body: {
    callback_query: {
      id: '1068230107531367617',
      from: {
        id: 313534466,
        first_name: 'first',
        last_name: 'last',
        username: 'username',
        language_code: 'en',
      },
      message: {
        message_id: 3300,
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
        date: 1502371827,
        text: 'text',
      },
      chat_instance: '-1828607021492040088',
      data: 'data',
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
    expect(senderId).toBe('313534466');
  });

  it('extract correct sender id from callbackQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(callbackQueryRequest.body);
    expect(senderId).toBe('313534466');
  });

  it('return empty string if body is not messageRequest or callbackQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey({});
    expect(senderId).toBe('');
  });
});

describe('#updateSession', () => {
  it('update session with data needed from messageRequest', async () => {
    const { connector } = setup();
    const user = {
      id: 313534466,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    };

    const session = {};

    await connector.updateSession(session, messageRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from callbackQueryRequest', async () => {
    const { connector } = setup();
    const user = {
      id: 313534466,

      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    };

    const session = {};

    await connector.updateSession(session, callbackQueryRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
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
