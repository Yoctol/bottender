import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';
import { mocked } from 'ts-jest/utils';

import MessengerConnector from '../MessengerConnector';
import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';
import { MessengerRequestBody } from '../MessengerTypes';

jest.mock('messaging-api-messenger');
jest.mock('warning');

const ACCESS_TOKEN = 'FAKE_TOKEN';
const APP_SECRET = 'FAKE_SECRET';
const APP_ID = 'FAKE_ID';

const request: MessengerRequestBody = {
  object: 'page',
  entry: [
    {
      id: '1895382890692545',
      time: 1486464322257,
      messaging: [
        {
          sender: {
            id: '1412611362105802',
          },
          recipient: {
            id: '1895382890692545',
          },
          timestamp: 1486464322190,
          message: {
            mid: 'mid.1486464322190:cb04e5a654',
            text: 'text',
          },
        },
      ],
    },
  ],
};

const echoRequest: MessengerRequestBody = {
  object: 'page',
  entry: [
    {
      id: '1134713619900975', // page id
      time: 1492414608999.0,
      messaging: [
        {
          sender: {
            id: '1134713619900975',
          },
          recipient: {
            id: '1244813222196986', // user id
          },
          timestamp: 1492414608982.0,
          message: {
            isEcho: true,
            appId: 1821152484774199,
            mid: 'mid.$cAARS90328R5hrBz-Vlbete17ftIb',
            text: 'text',
          },
        },
      ],
    },
  ],
};

const batchRequest: MessengerRequestBody = {
  object: 'page',
  entry: [
    {
      id: '1895382890692545',
      time: 1486464322257,
      messaging: [
        {
          sender: {
            id: '1412611362105802',
          },
          recipient: {
            id: '1895382890692545',
          },
          timestamp: 1486464322190,
          message: {
            mid: 'mid.1486464322190:cb04e5a654',
            text: 'test 1',
          },
        },
      ],
    },
    {
      id: '189538289069256',
      time: 1486464322257,
      messaging: [
        {
          sender: {
            id: '1412611362105802',
          },
          recipient: {
            id: '1895382890692545',
          },
          timestamp: 1486464322190,
          message: {
            mid: 'mid.1486464322190:cb04e5a656',
            text: 'test 2',
          },
        },
      ],
    },
  ],
};

const standbyRequest: MessengerRequestBody = {
  object: 'page',
  entry: [
    {
      id: '<PAGE_ID>',
      time: 1458692752478,
      standby: [
        {
          sender: {
            id: '<USER_ID>',
          },
          recipient: {
            id: '<PAGE_ID>',
          },

          // FIXME: standby is still beta
          // https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/standby
          /* ... */
        },
      ],
    },
  ],
};

const webhookTestRequest: MessengerRequestBody = {
  body: {
    entry: [
      {
        changes: [
          {
            field: 'messages',
            value: {
              pageId: '<PAGE_ID>',
            },
          },
        ],
        id: '0',
        time: 1514862760,
      },
    ],
    object: 'page',
  },
};

function setup({
  accessToken = ACCESS_TOKEN,
  appSecret = APP_SECRET,
  mapPageToAccessToken = jest.fn(),
  verifyToken = '1qaz2wsx',
  skipLegacyProfile = true,
} = {}) {
  const connector = new MessengerConnector({
    accessToken,
    appSecret,
    mapPageToAccessToken,
    verifyToken,
    skipLegacyProfile,
  });

  const client = mocked(MessengerClient).mock.instances[0];

  return {
    client,
    connector,
  };
}

beforeEach(() => {
  console.error = jest.fn();
});

it('should use accessToken and appSecret (for appsecret_proof) to create default client', () => {
  setup({
    accessToken: ACCESS_TOKEN,
    appSecret: APP_SECRET,
  });

  expect(MessengerClient).toBeCalledWith({
    accessToken: ACCESS_TOKEN,
    appSecret: APP_SECRET,
  });
});

describe('#platform', () => {
  it('should be messenger', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('messenger');
  });
});

describe('#verifyToken', () => {
  it('should equal when be provided', () => {
    const { connector } = setup({ verifyToken: '1234' });
    expect(connector.verifyToken).toBe('1234');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector, client } = setup();
    expect(connector.client).toBe(client);
  });

  it('support custom client', () => {
    const client = new MessengerClient({
      accessToken: ACCESS_TOKEN,
      appSecret: APP_SECRET,
    });

    const connector = new MessengerConnector({
      appId: APP_ID,
      appSecret: APP_SECRET,
      client,
    });

    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(request);
    expect(senderId).toBe('1412611362105802');
  });

  it('return recipient id when request is an echo event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(echoRequest);
    expect(senderId).toBe('1244813222196986');
  });

  it('extract sender id from first event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(batchRequest);
    expect(senderId).toBe('1412611362105802');
  });

  it('return null if is not first event or echo event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey({});
    expect(senderId).toBe(null);
  });

  it('return null if is webhook test event or other null rawEvent requests', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(webhookTestRequest);
    expect(senderId).toBe(null);
  });

  it('extract from messenger event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      new MessengerEvent({
        sender: {
          id: '1412611362105802',
        },
        recipient: {
          id: '1895382890692545',
        },
        timestamp: 1486464322190,
        message: {
          mid: 'mid.1486464322190:cb04e5a654',
          text: 'text',
        },
      })
    );
    expect(senderId).toBe('1412611362105802');
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const user = {
      id: '1412611362105802',
      firstName: 'firstName',
      lastName: 'lastName',
      profilePic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mocked(client.getUserProfile).mockResolvedValue(user);

    const session = {};
    await connector.updateSession(session, request);

    expect(client.getUserProfile).toBeCalledWith('1412611362105802', {
      accessToken: undefined,
    });
    expect(session).toEqual({
      page: {
        _updatedAt: expect.any(String),
        id: '1895382890692545',
      },
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when profilePic expired', async () => {
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const user = {
      id: '1412611362105802',
      firstName: 'firstName',
      lastName: 'lastName',
      profilePic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mocked(client.getUserProfile).mockResolvedValue(user);

    const session = {
      user: {
        profilePic: 'https://example.com/pic.png?oe=386D4380', // expired at 2000-01-01T00:00:00.000Z
      },
    };
    await connector.updateSession(session, request);

    expect(client.getUserProfile).toBeCalledWith('1412611362105802', {
      accessToken: undefined,
    });
    expect(session).toEqual({
      page: {
        _updatedAt: expect.any(String),
        id: '1895382890692545',
      },
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when expired date is invalid', async () => {
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const user = {
      id: '1412611362105802',
      firstName: 'firstName',
      lastName: 'lastName',
      profilePic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mocked(client.getUserProfile).mockResolvedValue(user);

    const session = {
      user: {
        profilePic: 'https://example.com/pic.png?oe=abc666666666', // wrong timestamp
      },
    };
    await connector.updateSession(session, request);

    expect(client.getUserProfile).toBeCalledWith('1412611362105802', {
      accessToken: undefined,
    });
    expect(session).toEqual({
      page: {
        _updatedAt: expect.any(String),
        id: '1895382890692545',
      },
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when something wrong', async () => {
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const user = {
      id: '1412611362105802',
      firstName: 'firstName',
      lastName: 'lastName',
      profilePic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mocked(client.getUserProfile).mockResolvedValue(user);

    const session = {
      user: {
        profilePic123: 'https://example.com/pic.png?oe=386D4380', // wrong name
      },
    };
    await connector.updateSession(session, request);

    expect(client.getUserProfile).toBeCalledWith('1412611362105802', {
      accessToken: undefined,
    });
    expect(session).toEqual({
      page: {
        _updatedAt: expect.any(String),
        id: '1895382890692545',
      },
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when getUserProfile() failed', async () => {
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const error = new Error('fail');

    mocked(client.getUserProfile).mockRejectedValue(error);

    const session = {};
    await connector.updateSession(session, request);

    expect(client.getUserProfile).toBeCalledWith('1412611362105802', {
      accessToken: undefined,
    });
    expect(session).toEqual({
      page: {
        _updatedAt: expect.any(String),
        id: '1895382890692545',
      },
      user: {
        _updatedAt: expect.any(String),
        id: '1412611362105802',
      },
    });
    expect(warning).toBeCalledWith(
      false,
      'getUserProfile() failed, `session.user` will only have `id`'
    );
    expect(console.error).toBeCalledWith(error);
  });

  it(`update session without getting user's profile when skipLegacyProfile set to true`, async () => {
    const { connector, client } = setup({
      skipLegacyProfile: true,
    });

    const session = {};
    await connector.updateSession(session, request);

    expect(client.getUserProfile).not.toBeCalled();
    expect(session).toEqual({
      page: {
        _updatedAt: expect.any(String),
        id: '1895382890692545',
      },
      user: {
        _updatedAt: expect.any(String),
        id: '1412611362105802',
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].pageId).toBe('1895382890692545');
  });

  it('should work with batch entry', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(batchRequest);

    expect(events).toHaveLength(2);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].pageId).toBe('1895382890692545');

    expect(events[1]).toBeInstanceOf(MessengerEvent);
    expect(events[1].pageId).toBe('1895382890692545');
  });

  it('should map request to standby MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(standbyRequest);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].isStandby).toBe(true);
    expect(events[0].pageId).toBe('<PAGE_ID>');
  });

  it('should map request to echo MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(echoRequest);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].pageId).toBe('1134713619900975');
  });

  it('should be filtered if body is not messaging or standby', () => {
    const otherRequest: MessengerRequestBody = {
      object: 'page',
      entry: [
        {
          id: '<PAGE_ID>',
          time: 1458692752478,
          other: [
            {
              sender: {
                id: '<USER_ID>',
              },
              recipient: {
                id: '<PAGE_ID>',
              },
            },
          ],
        },
      ],
    };
    const { connector } = setup();
    const events = connector.mapRequestToEvents(otherRequest);

    expect(events).toHaveLength(0);
  });
});

describe('#createContext', () => {
  it('should create MessengerContext', async () => {
    const { connector } = setup();
    const event = {
      rawEvent: {
        recipient: {
          id: 'anyPageId',
        },
      },
    };
    const session = {};

    const context = await connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(MessengerContext);
  });

  it('should create MessengerContext and has customAccessToken', async () => {
    const mapPageToAccessToken = jest.fn().mockResolvedValue('anyToken');
    const { connector } = setup({ mapPageToAccessToken });
    const event = {
      rawEvent: {
        recipient: {
          id: 'anyPageId',
        },
      },
    };
    const session = {};

    const context = await connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context.accessToken).toBe('anyToken');
  });

  it('should call warning if it could not find pageId', async () => {
    const mapPageToAccessToken = jest.fn().mockResolvedValue('anyToken');
    const { connector } = setup({ mapPageToAccessToken });
    const event = {
      rawEvent: {},
    };
    const session = {};

    await connector.createContext({
      event,
      session,
    });

    expect(warning).toBeCalledWith(
      false,
      'Could not find pageId from request body.'
    );
  });
});

describe('#verifySignature', () => {
  it('should return true if signature is equal app secret after crypto', () => {
    const { connector } = setup();

    const result = connector.verifySignature(
      'rawBody',
      'sha1=0d814d436b45c33ef664a317ff4b8dc2d3d8fe2a'
    );

    expect(result).toBe(true);
  });

  it('should return false if signature is undefined', () => {
    const { connector } = setup();

    const result = connector.verifySignature('rawBody', undefined);

    expect(result).toBe(false);
  });

  it('should return false if signature dont have a sha1= prefix', () => {
    const { connector } = setup();

    const result = connector.verifySignature('rawBody', 'sha256!!!');

    expect(result).toBe(false);
  });
});

describe('#preprocess', () => {
  it('should return correct challenge if request method is get and verify_token match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'get',
        headers: {},
        query: {
          'hub.mode': 'subscribe',
          'hub.verify_token': '1qaz2wsx',
          'hub.challenge': 'abc',
        },
        rawBody: '',
        body: {},
      })
    ).toEqual({
      shouldNext: false,
      response: {
        status: 200,
        body: 'abc',
      },
    });
  });

  it('should return 403 Forbidden if request method is get and verify_token does not match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'get',
        headers: {},
        query: {
          'hub.mode': 'subscribe',
          'hub.verify_token': '3edc4rfv',
          'hub.challenge': 'abc',
        },
        rawBody: '',
        body: {},
      })
    ).toEqual({
      shouldNext: false,
      response: {
        status: 403,
        body: 'Forbidden',
      },
    });
  });

  it('should return shouldNext: true if signature match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-hub-signature': 'sha1=1c99183cb7c44ea27fb834746086b65b89800db8',
        },
        query: {},
        rawBody: '{}',
        body: {},
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: false and error if signature does not match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-hub-signature': 'sha1=0d814d436b45c33ef664a317ff4b8dc2d3d8fe2a',
        },
        query: {},
        rawBody: '{}',
        body: {},
      })
    ).toEqual({
      shouldNext: false,
      response: {
        status: 400,
        body: {
          error: {
            message: 'Facebook Signature Validation Failed!',
            request: {
              headers: {
                'x-hub-signature':
                  'sha1=0d814d436b45c33ef664a317ff4b8dc2d3d8fe2a',
              },
              rawBody: '{}',
            },
          },
        },
      },
    });
  });
});
