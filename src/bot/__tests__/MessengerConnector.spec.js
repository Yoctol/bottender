import { MessengerClient } from 'messaging-api-messenger';

import MessengerConnector from '../MessengerConnector';
import MessengerContext from '../../context/MessengerContext';

jest.mock('messaging-api-messenger');

const ACCESS_TOKEN = 'FAKE_TOKEN';

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
              text: '測試了',
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
        id: '1134713619900975', // 粉絲團 id
        time: 1492414608999.0,
        messaging: [
          {
            sender: {
              id: '1134713619900975',
            },
            recipient: {
              id: '1244813222196986', // 使用者 id
            },
            timestamp: 1492414608982.0,
            message: {
              is_echo: true,
              app_id: 1821152484774199,
              mid: 'mid.$cAARS90328R5hrBz-Vlbete17ftIb',
              seq: 661428,
              text: '未來就是現在，引領未來商務的關鍵字，你壓寶哪一個？',
            },
          },
        ],
      },
    ],
  },
};

function setup() {
  const mockGraphAPIClient = {
    getUserProfile: jest.fn(),
  };
  MessengerClient.factory = jest.fn();
  MessengerClient.factory.mockReturnValue(mockGraphAPIClient);
  return {
    mockGraphAPIClient,
    connector: new MessengerConnector(ACCESS_TOKEN),
  };
}

describe('#platform', () => {
  it('should be messenger', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('messenger');
  });
});

describe('#getSenderIdFromRequest', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getSenderIdFromRequest(request);
    expect(senderId).toBe('1412611362105802');
  });

  it('return recipient id when request is an echo event', () => {
    const { connector } = setup();
    const senderId = connector.getSenderIdFromRequest(echoRequest);
    expect(senderId).toBe('1244813222196986');
  });
});

describe('#getUserProfile', () => {
  it('call graph api and get result back', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const data = {
      first_name: '薄餡',
      last_name: '茱',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    const response = { data };
    mockGraphAPIClient.getUserProfile.mockReturnValue(
      Promise.resolve(response)
    );
    const user = await connector.getUserProfile('1412611362105802');
    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802'
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
    expect(context).toBeInstanceOf(MessengerContext);
  });
});
