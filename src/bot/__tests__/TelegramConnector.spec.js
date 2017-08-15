import { TelegramClient } from 'messaging-api-telegram';

import TelegramConnector from '../TelegramConnector';
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
  TelegramClient.connect = jest.fn();
  return {
    connector: new TelegramConnector(ACCESS_TOKEN),
  };
}

describe('#platform', () => {
  it('should be telegram', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('telegram');
  });
});

describe('#getUniqueSessionIdFromRequest', () => {
  it('extract correct sender id from messageRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(
      messageRequest.body
    );
    expect(senderId).toBe('313534466');
  });

  it('extract correct sender id from callbackQueryRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(
      callbackQueryRequest.body
    );
    expect(senderId).toBe('313534466');
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
        platform: 'telegram',
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
        platform: 'telegram',
        ...user,
      },
    });
  });
});

describe('#handleRequest', () => {
  it('call handler with context', async () => {
    const { connector } = setup();
    const session = {};
    let context;
    const handler = _context => {
      context = _context;
    };
    await connector.handleRequest({
      body: messageRequest.body,
      session,
      handler,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(TelegramContext);
  });
});
