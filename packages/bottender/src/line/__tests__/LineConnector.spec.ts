import warning from 'warning';
import { LineClient } from 'messaging-api-line';
import { mocked } from 'ts-jest/utils';

import LineConnector, {
  GetSessionKeyPrefixFunction,
  LineRequestBody,
} from '../LineConnector';
import LineContext from '../LineContext';
import LineEvent from '../LineEvent';

jest.mock('messaging-api-line');
jest.mock('warning');

const ACCESS_TOKEN = 'FAKE_TOKEN';
const CHANNEL_SECRET = 'FAKE_SECRET';

const requestBody: LineRequestBody = {
  destination: 'Uea8667adaf43586706170ff25ff47ae6',
  events: [
    {
      replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
      type: 'message',
      mode: 'active',
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
      mode: 'active',
      timestamp: 1462629479859,
      source: {
        type: 'user',
        userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
      },
    },
  ],
};

const webhookVerifyRequestBody: LineRequestBody = {
  destination: 'Uea8667adaf43586706170ff25ff47ae6',
  events: [
    {
      replyToken: '00000000000000000000000000000000',
      type: 'message',
      mode: 'active',
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
      mode: 'active',
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
};

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  mocked(LineClient).mockClear();
});

function setup({
  sendMethod,
  skipLegacyProfile,
  getSessionKeyPrefix,
}: {
  sendMethod?: string;
  skipLegacyProfile?: boolean;
  getSessionKeyPrefix?: GetSessionKeyPrefixFunction;
} = {}) {
  const connector = new LineConnector({
    accessToken: ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET,
    sendMethod,
    skipLegacyProfile,
    getSessionKeyPrefix,
  });

  const client = mocked(LineClient).mock.instances[0];

  return {
    client,
    connector,
  };
}

describe('#platform', () => {
  it('should be line', () => {
    const { connector } = setup();

    expect(connector.platform).toBe('line');
  });
});

describe('#client', () => {
  it('should be the client', () => {
    const { connector, client } = setup();

    expect(connector.client).toBe(client);
  });

  it('support using custom client', () => {
    const client = new LineClient({
      accessToken: ACCESS_TOKEN,
      channelSecret: CHANNEL_SECRET,
    });
    const connector = new LineConnector({
      client,
      channelSecret: CHANNEL_SECRET,
    });

    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract userId from the HTTP body', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(requestBody);

    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('extract userId from user source', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(
      new LineEvent({
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'message',
        mode: 'active',
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
      })
    );

    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('extract groupId from the group source', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(
      new LineEvent({
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'message',
        mode: 'active',
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
      })
    );

    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('extract roomId from the room source', () => {
    const { connector } = setup();

    const senderId = connector.getUniqueSessionKey(
      new LineEvent({
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'message',
        mode: 'active',
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
      })
    );

    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('should add the prefix to the session key when getSessionKeyPrefix exists', () => {
    const getSessionKeyPrefix: GetSessionKeyPrefixFunction = jest.fn(
      (_, requestContext) => {
        if (requestContext) {
          return `${requestContext.params.channelId}:`;
        }
        throw new Error('no request context');
      }
    );
    const { connector } = setup({
      getSessionKeyPrefix,
    });

    const requestContext = {
      method: 'post',
      path: '/webhooks/line/CHANNEL_ID',
      query: {},
      headers: {},
      rawBody: '{}',
      body: {},
      params: {
        channelId: 'CHANNEL_ID',
      },
      url: 'https://www.example.com/webhooks/line/CHANNEL_ID',
    };

    const senderId = connector.getUniqueSessionKey(
      new LineEvent({
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'message',
        mode: 'active',
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
      }),
      requestContext
    );

    expect(senderId).toBe('CHANNEL_ID:U206d25c2ea6bd87c17655609a1c37cb8');
    expect(getSessionKeyPrefix).toBeCalledWith(
      expect.any(LineEvent),
      requestContext
    );
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, client } = setup({
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
    mocked(client).getUserProfile.mockResolvedValue(user);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = {};

    await connector.updateSession(session, requestBody);

    expect(client.getUserProfile).toBeCalledWith(
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
    const { connector, client } = setup({
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

    await connector.updateSession(session, requestBody);

    expect(client.getUserProfile).not.toBeCalled();
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
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const body: LineRequestBody = {
      destination: 'Uea8667adaf43586706170ff25ff47ae6',
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          mode: 'active',
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

    mocked(client).getGroupMemberProfile.mockResolvedValue(user);
    mocked(client).getAllGroupMemberIds.mockResolvedValue(memberIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = {};

    await connector.updateSession(session, body);

    expect(client.getGroupMemberProfile).toBeCalledWith(
      'Ca56f94637cc4347f90a25382909b24b9',
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );
    expect(client.getAllGroupMemberIds).toBeCalledWith(
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
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const body: LineRequestBody = {
      destination: 'Uea8667adaf43586706170ff25ff47ae6',
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'join',
          mode: 'active',
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

    mocked(client).getAllGroupMemberIds.mockResolvedValue(memberIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = {};

    await connector.updateSession(session, body);

    expect(client.getGroupMemberProfile).not.toBeCalled();
    expect(client.getAllGroupMemberIds).toBeCalledWith(
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
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const body: LineRequestBody = {
      destination: 'Uea8667adaf43586706170ff25ff47ae6',
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'message',
          mode: 'active',
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

    mocked(client).getRoomMemberProfile.mockResolvedValue(user);
    mocked(client).getAllRoomMemberIds.mockResolvedValue(memberIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = {};

    await connector.updateSession(session, body);

    expect(client.getRoomMemberProfile).toBeCalledWith(
      'Ra8dbf4673c4c812cd491258042226c99',
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );
    expect(client.getAllRoomMemberIds).toBeCalledWith(
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
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });
    const body: LineRequestBody = {
      destination: 'Uea8667adaf43586706170ff25ff47ae6',
      events: [
        {
          replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
          type: 'join',
          mode: 'active',
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

    mocked(client).getAllRoomMemberIds.mockResolvedValue(memberIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = {};

    await connector.updateSession(session, body);

    expect(client.getRoomMemberProfile).not.toBeCalled();
    expect(client.getAllRoomMemberIds).toBeCalledWith(
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

  it('update userId without calling any api while skipLegacyProfile set to true', async () => {
    const { connector, client } = setup();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = {};

    await connector.updateSession(session, requestBody);

    expect(client.getUserProfile).not.toBeCalled();

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
  it('should map the HTTP body to the LineEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(requestBody);

    expect(events).toHaveLength(2);
    expect(events[0]).toBeInstanceOf(LineEvent);
    expect(events[1]).toBeInstanceOf(LineEvent);
    expect(events[0].destination).toBe('Uea8667adaf43586706170ff25ff47ae6');
    expect(events[1].destination).toBe('Uea8667adaf43586706170ff25ff47ae6');
  });
});

describe('#createContext', () => {
  it('should create a LineContext', async () => {
    const { connector } = setup();

    const event = new LineEvent({
      replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
      type: 'message',
      mode: 'active',
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
    });
    const session = {};

    const context = await connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(LineContext);
  });

  it('should create a LineContext using the config from getConfig', async () => {
    const getConfig = jest.fn();

    getConfig.mockResolvedValue({
      accessToken: ACCESS_TOKEN,
      channelSecret: CHANNEL_SECRET,
    });

    const connector = new LineConnector({
      getConfig,
    });

    const event = new LineEvent({
      replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
      type: 'message',
      mode: 'active',
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
    });
    const session = {};

    await connector.createContext({
      event,
      session,
      requestContext: {
        path: '/webhooks/line/11111111111',
        params: {
          channelId: '11111111111',
        },
        url: `https://www.example.com/webhooks/line/11111111111`,
        method: 'post',
        headers: {
          'x-line-signature': '5+SUnXZ8+G1ErXUewxeZ0T9j4yD6cmwYn5XCO4tBFic',
        },
        query: {},
        rawBody: JSON.stringify(requestBody),
        body: requestBody,
      },
    });

    expect(getConfig).toBeCalledWith({ params: { channelId: '11111111111' } });
    expect(LineClient).toBeCalledWith({
      accessToken: ACCESS_TOKEN,
      channelSecret: CHANNEL_SECRET,
      origin: undefined,
    });
  });
});

describe('#verifySignature', () => {
  it('should return true if signature is equal app secret after crypto', () => {
    const { connector } = setup();

    const result = connector.verifySignature(
      'rawBody',
      'XtFE4w+/e5cw8ys6BSALGj3ZCYgRtBdCBxyEfrkgLPc=',
      { channelSecret: CHANNEL_SECRET }
    );

    expect(result).toBe(true);
  });
});

it('should warning if sendMethod is not one of `reply`, `push`', () => {
  setup({ sendMethod: 'xxx' });

  expect(warning).toBeCalledWith(false, expect.any(String));
});

describe('#isWebhookVerifyRequest', () => {
  it('check if the HTTP body is for webhook verification', async () => {
    const { connector } = setup();

    expect(connector.isWebhookVerifyRequest(webhookVerifyRequestBody)).toEqual(
      true
    );
    expect(
      connector.isWebhookVerifyRequest({
        destination: 'Uea8667adaf43586706170ff25ff47ae6',
        events: [],
      })
    ).toEqual(false);
  });
});

describe('#preprocess', () => {
  it('should return shouldNext: true if the method is get', async () => {
    const { connector } = setup();

    expect(
      await connector.preprocess({
        path: '/webhooks/line',
        params: {},
        url: `https://www.example.com/webhooks/line`,
        method: 'get',
        headers: {
          'x-line-signature': 'abc',
        },
        query: {},
        rawBody: JSON.stringify(requestBody),
        body: requestBody,
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: true if the signature match', async () => {
    const { connector } = setup();

    expect(
      await connector.preprocess({
        path: '/webhooks/line',
        params: {},
        url: `https://www.example.com/webhooks/line`,
        method: 'post',
        headers: {
          'x-line-signature': '5+SUnXZ8+G1ErXUewxeZ0T9j4yD6cmwYn5XCO4tBFic',
        },
        query: {},
        rawBody: JSON.stringify(requestBody),
        body: requestBody,
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: true if the signature match (using getConfig)', async () => {
    const getConfig = jest.fn();

    getConfig.mockResolvedValue({
      accessToken: ACCESS_TOKEN,
      channelSecret: CHANNEL_SECRET,
    });

    const connector = new LineConnector({
      getConfig,
    });

    expect(
      await connector.preprocess({
        path: '/webhooks/line/11111111111',
        params: {
          channelId: '11111111111',
        },
        url: `https://www.example.com/webhooks/line/11111111111`,
        method: 'post',
        headers: {
          'x-line-signature': '5+SUnXZ8+G1ErXUewxeZ0T9j4yD6cmwYn5XCO4tBFic',
        },
        query: {},
        rawBody: JSON.stringify(requestBody),
        body: requestBody,
      })
    ).toEqual({
      shouldNext: true,
    });
    expect(getConfig).toBeCalledWith({ params: { channelId: '11111111111' } });
  });

  it('should return shouldNext: false and 200 OK if the HTTP body is for webhook verification', async () => {
    const { connector } = setup();

    expect(
      await connector.preprocess({
        path: '/webhooks/line',
        params: {},
        url: `https://www.example.com/webhooks/line`,
        method: 'post',
        headers: {
          'x-line-signature': 'VYLhgSyybnkWRb9qqCreJSTQTkbS6KtXVuw55BcAS7o',
        },
        query: {},
        rawBody: JSON.stringify(webhookVerifyRequestBody),
        body: webhookVerifyRequestBody,
      })
    ).toEqual({
      shouldNext: false,
      response: {
        status: 200,
        body: 'OK',
      },
    });
  });

  it('should return shouldNext: false and the error if the signature does not match', async () => {
    const { connector } = setup();

    expect(
      await connector.preprocess({
        path: '/webhooks/line',
        params: {},
        url: `https://www.example.com/webhooks/line`,
        method: 'post',
        headers: {
          'x-line-signature': 'XtFE4w+/e5cw8ys6BSALGj3ZCYgRtBdCBxyEfrkgLPc=',
        },
        query: {},
        rawBody: JSON.stringify(requestBody),
        body: requestBody,
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
              rawBody: JSON.stringify(requestBody),
            },
          },
        },
      },
    });
  });

  it('should return shouldNext: false and the error if the signature does not match (using getConfig)', async () => {
    const getConfig = jest.fn();

    getConfig.mockResolvedValue({
      accessToken: ACCESS_TOKEN,
      channelSecret: CHANNEL_SECRET,
    });

    const connector = new LineConnector({
      getConfig,
    });

    expect(
      await connector.preprocess({
        path: '/webhooks/line/11111111111',
        params: {
          channelId: '11111111111',
        },
        url: `https://www.example.com/webhooks/line/11111111111`,
        method: 'post',
        headers: {
          'x-line-signature': 'XtFE4w+/e5cw8ys6BSALGj3ZCYgRtBdCBxyEfrkgLPc=',
        },
        query: {},
        rawBody: JSON.stringify(requestBody),
        body: requestBody,
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
              rawBody: JSON.stringify(requestBody),
            },
          },
        },
      },
    });
    expect(getConfig).toBeCalledWith({ params: { channelId: '11111111111' } });
  });
});
