import warning from 'warning';
import { LineClient } from 'messaging-api-line';

import LineConnector from '../LineConnector';
import LineContext from '../LineContext';
import LineEvent from '../LineEvent';

jest.mock('messaging-api-line');
jest.mock('warning');

const ACCESS_TOKEN = 'FAKE_TOKEN';
const CHANNEL_SECRET = 'FAKE_SECRET';

const request = {
  body: {
    destination: 'Uea8667adaf43586706170ff25ff47ae6',
    events: [
      {
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'message',
        timestamp: 1462629479859,
        source: {
          type: 'user',
          userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
        },
        message: {
          id: '325708',
          type: 'text',
          text: 'Hello, world',
        },
      },
      {
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'follow',
        timestamp: 1462629479859,
        source: {
          type: 'user',
          userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
        },
      },
    ],
  },
  rawBody: 'fake_raw_body',
  header: {
    'x-line-signature': 'fake_signature',
  },
};

const webhookVerifyRequest = {
  body: {
    events: [
      {
        replyToken: '00000000000000000000000000000000',
        type: 'message',
        timestamp: 1513065174862,
        source: {
          type: 'user',
          userId: 'Udeadbeefdeadbeefdeadbeefdeadbeef',
        },
        message: {
          id: '100001',
          type: 'text',
          text: 'Hello, world',
        },
      },
      {
        replyToken: 'ffffffffffffffffffffffffffffffff',
        type: 'message',
        timestamp: 1513065174862,
        source: {
          type: 'user',
          userId: 'Udeadbeefdeadbeefdeadbeefdeadbeef',
        },
        message: {
          id: '100002',
          type: 'sticker',
          packageId: '1',
          stickerId: '1',
        },
      },
    ],
  },
};

function setup({ sendMethod, skipLegacyProfile } = {}) {
  const mockLineAPIClient = {
    getUserProfile: jest.fn(),
    isValidSignature: jest.fn(),
    getGroupMemberProfile: jest.fn(),
    getAllGroupMemberIds: jest.fn(),
    getRoomMemberProfile: jest.fn(),
    getAllRoomMemberIds: jest.fn(),
  };
  LineClient.connect = jest.fn();
  LineClient.connect.mockReturnValue(mockLineAPIClient);
  return {
    mockLineAPIClient,
    connector: new LineConnector({
      accessToken: ACCESS_TOKEN,
      channelSecret: CHANNEL_SECRET,
      sendMethod,
      skipLegacyProfile,
    }),
  };
}

describe('#platform', () => {
  it('should be line', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('line');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector, mockLineAPIClient } = setup();
    expect(connector.client).toBe(mockLineAPIClient);
  });

  it('support custom client', () => {
    const client = {};
    const connector = new LineConnector({ client });
    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract userId from user source', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(request.body);
    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('extract groupId from user source', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey({
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          timestamp: 1462629479859,
          source: {
            type: 'group',
            groupId: 'U206d25c2ea6bd87c17655609a1c37cb8',
          },
          message: {
            id: '325708',
            type: 'text',
            text: 'Hello, world',
          },
        },
      ],
    });
    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('extract roomId from user source', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey({
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          timestamp: 1462629479859,
          source: {
            type: 'room',
            roomId: 'U206d25c2ea6bd87c17655609a1c37cb8',
          },
          message: {
            id: '325708',
            type: 'text',
            text: 'Hello, world',
          },
        },
      ],
    });
    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('should throw error if source.type is not user, group or room', () => {
    const { connector } = setup();
    let error;
    try {
      connector.getUniqueSessionKey({
        events: [
          {
            replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
            type: 'message',
            timestamp: 1462629479859,
            source: {
              type: 'other', // other type
              roomId: 'U206d25c2ea6bd87c17655609a1c37cb8',
            },
            message: {
              id: '325708',
              type: 'text',
              text: 'Hello, world',
            },
          },
        ],
      });
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(expect.any(TypeError));
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockLineAPIClient } = setup({
      skipLegacyProfile: false,
    });
    const user = {
      id: 'U206d25c2ea6bd87c17655609a1c37cb8',
      displayName: 'LINE taro',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
      _updatedAt: expect.any(String),
    };
    mockLineAPIClient.getUserProfile.mockResolvedValue(user);

    const session = {};

    await connector.updateSession(session, request.body);

    expect(mockLineAPIClient.getUserProfile).toBeCalledWith(
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );

    expect(session).toEqual({
      type: 'user',
      user,
    });
    expect(Object.isFrozen(session.user)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'user')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  });

  it('update session if session.user exists', async () => {
    const { connector, mockLineAPIClient } = setup({
      skipLegacyProfile: false,
    });
    const user = {
      id: 'U206d25c2ea6bd87c17655609a1c37cb8',
      displayName: 'LINE taro',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
      _updatedAt: expect.any(String),
    };

    const session = { type: 'user', user };

    await connector.updateSession(session, request.body);

    expect(mockLineAPIClient.getUserProfile).not.toBeCalled();
    expect(session).toEqual({
      type: 'user',
      user,
    });
    expect(Object.isFrozen(session.user)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'user')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  });

  it('update session with group type message', async () => {
    const { connector, mockLineAPIClient } = setup({
      skipLegacyProfile: false,
    });
    const body = {
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          timestamp: 1462629479859,
          source: {
            type: 'group',
            groupId: 'Ca56f94637cc4347f90a25382909b24b9',
            userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
          },
          message: {
            id: '325708',
            type: 'text',
            text: 'Hello, world',
          },
        },
      ],
    };
    const user = {
      id: body.events[0].source.userId,
      displayName: 'LINE taro',
      userId: body.events[0].source.userId,
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
      _updatedAt: expect.any(String),
    };
    const memberIds = [
      'Uxxxxxxxxxxxxxx...1',
      'Uxxxxxxxxxxxxxx...2',
      'Uxxxxxxxxxxxxxx...3',
    ];

    mockLineAPIClient.getGroupMemberProfile.mockResolvedValue(user);
    mockLineAPIClient.getAllGroupMemberIds.mockResolvedValue(memberIds);

    const session = {};

    await connector.updateSession(session, body);

    expect(mockLineAPIClient.getGroupMemberProfile).toBeCalledWith(
      'Ca56f94637cc4347f90a25382909b24b9',
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );
    expect(mockLineAPIClient.getAllGroupMemberIds).toBeCalledWith(
      'Ca56f94637cc4347f90a25382909b24b9'
    );

    expect(session).toEqual({
      type: 'group',
      group: {
        id: 'Ca56f94637cc4347f90a25382909b24b9',
        members: [
          { id: 'Uxxxxxxxxxxxxxx...1' },
          { id: 'Uxxxxxxxxxxxxxx...2' },
          { id: 'Uxxxxxxxxxxxxxx...3' },
        ],
        _updatedAt: expect.any(String),
      },
      user,
    });
    expect(Object.isFrozen(session.group)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'group')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.group,
    });
  });

  it('update session with group type event without userId', async () => {
    const { connector, mockLineAPIClient } = setup({
      skipLegacyProfile: false,
    });
    const body = {
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'join',
          timestamp: 1462629479859,
          source: {
            type: 'group',
            groupId: 'Ca56f94637cc4347f90a25382909b24b9',
          },
        },
      ],
    };
    const user = null;
    const memberIds = [
      'Uxxxxxxxxxxxxxx...1',
      'Uxxxxxxxxxxxxxx...2',
      'Uxxxxxxxxxxxxxx...3',
    ];

    mockLineAPIClient.getAllGroupMemberIds.mockResolvedValue(memberIds);

    const session = {};

    await connector.updateSession(session, body);

    expect(mockLineAPIClient.getGroupMemberProfile).not.toBeCalled();
    expect(mockLineAPIClient.getAllGroupMemberIds).toBeCalledWith(
      'Ca56f94637cc4347f90a25382909b24b9'
    );

    expect(session).toEqual({
      type: 'group',
      group: {
        id: 'Ca56f94637cc4347f90a25382909b24b9',
        members: [
          { id: 'Uxxxxxxxxxxxxxx...1' },
          { id: 'Uxxxxxxxxxxxxxx...2' },
          { id: 'Uxxxxxxxxxxxxxx...3' },
        ],
        _updatedAt: expect.any(String),
      },
      user,
    });
    expect(Object.isFrozen(session.group)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'group')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.group,
    });
  });

  it('update session with room type message', async () => {
    const { connector, mockLineAPIClient } = setup({
      skipLegacyProfile: false,
    });
    const body = {
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          timestamp: 1462629479859,
          source: {
            type: 'room',
            roomId: 'Ra8dbf4673c4c812cd491258042226c99',
            userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
          },
          message: {
            id: '325708',
            type: 'text',
            text: 'Hello, world',
          },
        },
      ],
    };
    const user = {
      id: body.events[0].source.userId,
      displayName: 'LINE taro',
      userId: body.events[0].source.userId,
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
      _updatedAt: expect.any(String),
    };
    const memberIds = [
      'Uxxxxxxxxxxxxxx...1',
      'Uxxxxxxxxxxxxxx...2',
      'Uxxxxxxxxxxxxxx...3',
    ];

    mockLineAPIClient.getRoomMemberProfile.mockResolvedValue(user);
    mockLineAPIClient.getAllRoomMemberIds.mockResolvedValue(memberIds);

    const session = {};

    await connector.updateSession(session, body);

    expect(mockLineAPIClient.getRoomMemberProfile).toBeCalledWith(
      'Ra8dbf4673c4c812cd491258042226c99',
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );
    expect(mockLineAPIClient.getAllRoomMemberIds).toBeCalledWith(
      'Ra8dbf4673c4c812cd491258042226c99'
    );

    expect(session).toEqual({
      type: 'room',
      room: {
        id: 'Ra8dbf4673c4c812cd491258042226c99',
        members: [
          { id: 'Uxxxxxxxxxxxxxx...1' },
          { id: 'Uxxxxxxxxxxxxxx...2' },
          { id: 'Uxxxxxxxxxxxxxx...3' },
        ],
        _updatedAt: expect.any(String),
      },
      user,
    });
    expect(Object.isFrozen(session.room)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'room')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.room,
    });
  });

  it('update session with room type event without userId', async () => {
    const { connector, mockLineAPIClient } = setup({
      skipLegacyProfile: false,
    });
    const body = {
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'join',
          timestamp: 1462629479859,
          source: {
            type: 'room',
            roomId: 'Ra8dbf4673c4c812cd491258042226c99',
          },
        },
      ],
    };
    const user = null;
    const memberIds = [
      'Uxxxxxxxxxxxxxx...1',
      'Uxxxxxxxxxxxxxx...2',
      'Uxxxxxxxxxxxxxx...3',
    ];

    mockLineAPIClient.getAllRoomMemberIds.mockResolvedValue(memberIds);

    const session = {};

    await connector.updateSession(session, body);

    expect(mockLineAPIClient.getRoomMemberProfile).not.toBeCalled();
    expect(mockLineAPIClient.getAllRoomMemberIds).toBeCalledWith(
      'Ra8dbf4673c4c812cd491258042226c99'
    );

    expect(session).toEqual({
      type: 'room',
      room: {
        id: 'Ra8dbf4673c4c812cd491258042226c99',
        members: [
          { id: 'Uxxxxxxxxxxxxxx...1' },
          { id: 'Uxxxxxxxxxxxxxx...2' },
          { id: 'Uxxxxxxxxxxxxxx...3' },
        ],
        _updatedAt: expect.any(String),
      },
      user,
    });
    expect(Object.isFrozen(session.room)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'room')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.room,
    });
  });

  it('update session with other type message', async () => {
    const { connector } = setup({
      skipLegacyProfile: false,
    });
    const body = {
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          timestamp: 1462629479859,
          source: {
            type: 'other',
          },
          message: {
            id: '325708',
            type: 'text',
            text: 'Hello, world',
          },
        },
      ],
    };

    const session = {};

    await connector.updateSession(session, body);

    expect(session).toEqual({
      type: 'other',
    });
    expect(Object.getOwnPropertyDescriptor(session, 'user')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: undefined,
    });
  });

  it('update userId without calling any api while skipLegacyProfile set to true', async () => {
    const { connector, mockLineAPIClient } = setup();
    const session = {};

    await connector.updateSession(session, request.body);

    expect(mockLineAPIClient.getUserProfile).not.toBeCalled();

    expect(session).toEqual({
      type: 'user',
      user: {
        id: 'U206d25c2ea6bd87c17655609a1c37cb8',
        _updatedAt: expect.any(String),
      },
    });
    expect(Object.isFrozen(session.user)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(session, 'user')).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to LineEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(2);
    expect(events[0]).toBeInstanceOf(LineEvent);
    expect(events[1]).toBeInstanceOf(LineEvent);
    expect(events[0].destination).toBe('Uea8667adaf43586706170ff25ff47ae6');
    expect(events[1].destination).toBe('Uea8667adaf43586706170ff25ff47ae6');
  });
});

describe('#createContext', () => {
  it('should create LineContext', async () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = await connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(LineContext);
  });
});

describe('#verifySignature', () => {
  it('should return true if signature is equal app sercret after crypto', () => {
    const { connector } = setup();

    const result = connector.verifySignature(
      'rawBody',
      'XtFE4w+/e5cw8ys6BSALGj3ZCYgRtBdCBxyEfrkgLPc='
    );

    expect(result).toBe(true);
  });
});

it('should warning if sendMethod is not one of `reply`, `push`', () => {
  setup({ sendMethod: 'xxx' });

  expect(warning).toBeCalledWith(false, expect.any(String));
});

describe('#isWebhookVerifyRequest', () => {
  it('check if request is for webhook verification', async () => {
    const { connector } = setup();

    await connector.isWebhookVerifyRequest(webhookVerifyRequest.body);

    expect(connector.isWebhookVerifyRequest(webhookVerifyRequest.body)).toEqual(
      true
    );
    expect(connector.isWebhookVerifyRequest({ events: [] })).toEqual(false);
  });
});

describe('#preprocess', () => {
  it('should return shouldNext: true if request method is get', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'get',
        headers: {
          'x-line-signature': 'abc',
        },
        query: {},
        rawBody: '',
        body: {},
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: true if signature match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-line-signature': 'RI34eF3TZ0LkP6PK2d4uyozrY5HnnHQuM+UsZjfzLaw=',
        },
        query: {},
        rawBody: '{}',
        body: {},
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: false and 200 OK if is webhook verify request', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-line-signature': '8nCfywRHp6BCJRiIALL7L3s/qaUK4TDDQ1h52j4hVLk=',
        },
        query: {},
        rawBody:
          '{"events":[{"replyToken":"00000000000000000000000000000000"},{"replyToken":"ffffffffffffffffffffffffffffffff"}]}',
        body: {
          events: [
            { replyToken: '00000000000000000000000000000000' },
            { replyToken: 'ffffffffffffffffffffffffffffffff' },
          ],
        },
      })
    ).toEqual({
      shouldNext: false,
      response: {
        status: 200,
        body: 'OK',
      },
    });
  });

  it('should return shouldNext: false and error if signature does not match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-line-signature': 'XtFE4w+/e5cw8ys6BSALGj3ZCYgRtBdCBxyEfrkgLPc=',
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
            message: 'LINE Signature Validation Failed!',
            request: {
              headers: {
                'x-line-signature':
                  'XtFE4w+/e5cw8ys6BSALGj3ZCYgRtBdCBxyEfrkgLPc=',
              },
              rawBody: '{}',
            },
          },
        },
      },
    });
  });
});
