import { LINEClient } from 'messaging-api-line';

import LINEConnector from '../LINEConnector';
import LINEContext from '../../session/LINEContext';

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
};

function setup() {
  const mockLINEAPIClient = {
    getUserProfile: jest.fn(),
  };
  LINEClient.factory = jest.fn();
  LINEClient.factory.mockReturnValue(mockLINEAPIClient);
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

describe('#getSenderIdFromRequest', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getSenderIdFromRequest(request);
    expect(senderId).toBe('U206d25c2ea6bd87c17655609a1c37cb8');
  });
});

describe('#getUserProfile', () => {
  it('call graph api and get result back', async () => {
    const { connector, mockLINEAPIClient } = setup();
    const data = {
      displayName: 'LINE taro',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
      pictureUrl: 'http://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
    };
    const response = { data };
    mockLINEAPIClient.getUserProfile.mockReturnValue(Promise.resolve(response));
    const user = await connector.getUserProfile(
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );
    expect(mockLINEAPIClient.getUserProfile).toBeCalledWith(
      'U206d25c2ea6bd87c17655609a1c37cb8'
    );
    expect(user).toEqual(data);
  });
});

describe('#handleRequest', () => {
  it('call handler with context', async () => {
    const { connector } = setup();
    const sessionData = {};
    const db = {};
    let context;
    connector.setHandler(_context => {
      context = _context;
    });
    await connector.handleRequest({ request, sessionData, db });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(LINEContext);
  });
});
