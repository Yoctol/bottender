import { LINEClient } from 'messaging-api-line';

import LINEConnector from '../LINEConnector';
import LINEEvent from '../../context/LINEEvent';
import LINEContext from '../../context/LINEContext';

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
  const mockLINEAPIClient = {
    getUserProfile: jest.fn(),
    isValidSignature: jest.fn(),
  };
  LINEClient.connect = jest.fn();
  LINEClient.connect.mockReturnValue(mockLINEAPIClient);
  return {
    mockLINEAPIClient,
    connector: new LINEConnector({ ACCESS_TOKEN, CHANNEL_SECRET }),
  };
}

describe('#platform', () => {
  it('should be line', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('line');
  });
});

describe('#clinet', () => {
  it('should be client', () => {
    const { connector, mockLINEAPIClient } = setup();
    expect(connector.client).toBe(mockLINEAPIClient);
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
    const { connector, mockLINEAPIClient } = setup();
    const user = {
      id: 'U206d25c2ea6bd87c17655609a1c37cb8',
      displayName: 'LINE taro',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
    };
    mockLINEAPIClient.getUserProfile.mockReturnValue(Promise.resolve(user));

    const session = {};

    await connector.updateSession(session, request.body);

    expect(mockLINEAPIClient.getUserProfile).toBeCalledWith(
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );

    expect(session).toEqual({
      type: 'user',
      user: {
        platform: 'line',
        ...user,
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to LINEEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(2);
    expect(events[0]).toBeInstanceOf(LINEEvent);
    expect(events[1]).toBeInstanceOf(LINEEvent);
  });
});

describe('#createContext', () => {
  it('should create LINEContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(LINEContext);
  });
});

describe('#verifySignature', () => {
  it('call client verify function with rawbody and signature', () => {
    const { connector, mockLINEAPIClient } = setup();

    connector.verifySignature(
      request.rawBody,
      request.header['x-line-signature']
    );

    expect(mockLINEAPIClient.isValidSignature).toBeCalledWith(
      'fake_raw_body',
      'fake_signature'
    );
  });
});
