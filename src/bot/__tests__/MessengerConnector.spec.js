import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import MessengerConnector from '../MessengerConnector';
import MessengerContext from '../../context/MessengerContext';
import MessengerEvent from '../../context/MessengerEvent';

jest.mock('messaging-api-messenger');
jest.mock('warning');

const ACCESS_TOKEN = 'FAKE_TOKEN';
const APP_SECRET = 'FAKE_SECRET';

const request = {
  body: {
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
              seq: 339979,
              text: 'text',
            },
          },
        ],
      },
    ],
  },
};

const echoRequest = {
  body: {
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
              is_echo: true,
              app_id: 1821152484774199,
              mid: 'mid.$cAARS90328R5hrBz-Vlbete17ftIb',
              seq: 661428,
              text: 'text',
            },
          },
        ],
      },
    ],
  },
};

const batchRequest = {
  body: {
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
              seq: 339979,
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
              seq: 339979,
              text: 'test 2',
            },
          },
        ],
      },
    ],
  },
};

const standbyRequest = {
  body: {
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
  },
};

const webhookTestRequest = {
  body: {
    entry: [
      {
        changes: [
          {
            field: 'messages',
            value: {
              page_id: '<PAGE_ID>',
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

function setup(
  { accessToken, appSecret, mapPageToAccessToken, verifyToken } = {
    accessToken: ACCESS_TOKEN,
    appSecret: APP_SECRET,
    mapPageToAccessToken: jest.fn(),
    verifyToken: undefined,
  }
) {
  const mockGraphAPIClient = {
    getUserProfile: jest.fn(),
  };
  MessengerClient.connect = jest.fn();
  MessengerClient.connect.mockReturnValue(mockGraphAPIClient);
  return {
    mockGraphAPIClient,
    connector: new MessengerConnector({
      accessToken,
      appSecret,
      mapPageToAccessToken,
      verifyToken,
    }),
  };
}

const _consoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = _consoleError;
});

it('should use accessToken and appSecret (for appsecret_proof) to create default client', () => {
  setup({
    accessToken: ACCESS_TOKEN,
    appSecret: APP_SECRET,
  });

  expect(MessengerClient.connect).toBeCalledWith({
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
  it('should be undefined when not be provided', () => {
    const { connector } = setup();
    expect(connector.verifyToken).toBe(undefined);
  });

  it('should equal when be provided', () => {
    const { connector } = setup({ verifyToken: '1234' });
    expect(connector.verifyToken).toBe('1234');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector, mockGraphAPIClient } = setup();
    expect(connector.client).toBe(mockGraphAPIClient);
  });

  it('support custom client', () => {
    const client = {};
    const connector = new MessengerConnector({ client });
    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(request.body);
    expect(senderId).toBe('1412611362105802');
  });

  it('return recipient id when request is an echo event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(echoRequest.body);
    expect(senderId).toBe('1244813222196986');
  });

  it('extract sender id from first event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(batchRequest.body);
    expect(senderId).toBe('1412611362105802');
  });

  it('return null if is not first event or echo event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey({});
    expect(senderId).toBe(null);
  });

  it('return null if is webhook test event or other null rawEvent requests', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(webhookTestRequest.body);
    expect(senderId).toBe(null);
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const user = {
      id: '1412611362105802',
      first_name: 'firstName',
      last_name: 'lastName',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mockGraphAPIClient.getUserProfile.mockResolvedValue(user);

    const session = {};
    await connector.updateSession(session, request.body);

    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802',
      { access_token: undefined }
    );
    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when profile_pic expired', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const user = {
      id: '1412611362105802',
      first_name: 'firstName',
      last_name: 'lastName',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mockGraphAPIClient.getUserProfile.mockResolvedValue(user);

    const session = {
      user: {
        profile_pic: 'https://example.com/pic.png?oe=386D4380', // expired at 2000-01-01T00:00:00.000Z
      },
    };
    await connector.updateSession(session, request.body);

    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802',
      { access_token: undefined }
    );
    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when expired date is invalid', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const user = {
      id: '1412611362105802',
      first_name: 'firstName',
      last_name: 'lastName',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mockGraphAPIClient.getUserProfile.mockResolvedValue(user);

    const session = {
      user: {
        profile_pic: 'https://example.com/pic.png?oe=abc666666666', // wrong timestamp
      },
    };
    await connector.updateSession(session, request.body);

    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802',
      { access_token: undefined }
    );
    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when something wrong', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const user = {
      id: '1412611362105802',
      first_name: 'firstName',
      last_name: 'lastName',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mockGraphAPIClient.getUserProfile.mockResolvedValue(user);

    const session = {
      user: {
        profile_pic123: 'https://example.com/pic.png?oe=386D4380', // wrong name
      },
    };
    await connector.updateSession(session, request.body);

    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802',
      { access_token: undefined }
    );
    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session when getUserProfile() failed', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const error = new Error('fail');

    mockGraphAPIClient.getUserProfile.mockRejectedValue(error);

    const session = {};
    await connector.updateSession(session, request.body);

    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802',
      { access_token: undefined }
    );
    expect(session).toEqual({
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
});

describe('#mapRequestToEvents', () => {
  it('should map request to MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].pageId).toBe('1895382890692545');
  });

  it('should work with batch entry', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(batchRequest.body);

    expect(events).toHaveLength(2);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].pageId).toBe('1895382890692545');

    expect(events[1]).toBeInstanceOf(MessengerEvent);
    expect(events[1].pageId).toBe('1895382890692545');
  });

  it('should map request to standby MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(standbyRequest.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].isStandby).toBe(true);
    expect(events[0].pageId).toBe('<PAGE_ID>');
  });

  it('should map request to echo MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(echoRequest.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[0].pageId).toBe('1134713619900975');
  });

  it('should be filtered if body is not messaging or standby', () => {
    const otherRequest = {
      body: {
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
      },
    };
    const { connector } = setup();
    const events = connector.mapRequestToEvents(otherRequest.body);

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
  it('should return true and show warning if app secret not set', () => {
    const { connector } = setup({
      accessToken: ACCESS_TOKEN,
      appSecret: undefined,
    });

    const result = connector.verifySignature('rawBody', 'signature');

    expect(result).toBe(true);
    expect(warning).toBeCalledWith(
      false,
      '`appSecret` is not set. Will bypass Messenger signature validation.\nPass in `appSecret` to perform Messenger signature validation.'
    );
  });

  it('should return true if signature is equal app sercret after crypto', () => {
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
