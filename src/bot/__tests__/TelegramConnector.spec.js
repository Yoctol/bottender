import { TelegramClient } from 'messaging-api-telegram';

import TelegramConnector from '../TelegramConnector';
import TelegramContext from '../../context/TelegramContext';

jest.mock('messaging-api-telegram');

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const request = {
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
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(request.body);
    expect(senderId).toBe('313534466'); // FIXME
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector } = setup();
    const user = {
      id: 313534466,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    };

    const session = {};

    await connector.updateSession(session, request.body);

    expect(session).toEqual({ user });
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
    await connector.handleRequest({ body: request.body, session, handler });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(TelegramContext);
  });
});
