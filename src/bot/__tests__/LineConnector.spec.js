import { LineClient } from 'messaging-api-line';

import LineConnector from '../LineConnector';
import LineEvent from '../../context/LineEvent';
import LineContext from '../../context/LineContext';

jest.mock('messaging-api-line');

const ACCESS_TOKEN = 'FAKE_TOKEN';
const CHANNEL_SECRET = 'FAKE_SECRET';

const request = {
  body: {
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

function setup() {
  const mockLineAPIClient = {
    getUserProfile: jest.fn(),
    isValidSignature: jest.fn(),
  };
  LineClient.connect = jest.fn();
  LineClient.connect.mockReturnValue(mockLineAPIClient);
  return {
    mockLineAPIClient,
    connector: new LineConnector({ ACCESS_TOKEN, CHANNEL_SECRET }),
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

describe('#getUniqueSessionIdFromRequest', () => {
  it('extract userId from user source', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(request.body);
    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  it('extract groupId from user source', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest({
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
    const senderId = connector.getUniqueSessionIdFromRequest({
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
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockLineAPIClient } = setup();
    const user = {
      id: 'U206d25c2ea6bd87c17655609a1c37cb8',
      displayName: 'LINE taro',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
    };
    mockLineAPIClient.getUserProfile.mockReturnValue(Promise.resolve(user));

    const session = {};

    await connector.updateSession(session, request.body);

    expect(mockLineAPIClient.getUserProfile).toBeCalledWith(
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );

    expect(session).toEqual({
      type: 'user',
      user,
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
  });
});

describe('#createContext', () => {
  it('should create LineContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(LineContext);
  });
});

describe('#verifySignature', () => {
  it('call client verify function with rawbody and signature', () => {
    const { connector, mockLineAPIClient } = setup();

    connector.verifySignature(
      request.rawBody,
      request.header['x-line-signature']
    );

    expect(mockLineAPIClient.isValidSignature).toBeCalledWith(
      'fake_raw_body',
      'fake_signature'
    );
  });
});
