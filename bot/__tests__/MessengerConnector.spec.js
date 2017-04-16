import MessengerConnector from '../MessengerConnector';
import FBGraphAPIClient from '../../api/FBGraphAPIClient';
import MessengerContext from '../../session/MessengerContext';

jest.mock('../../api/FBGraphAPIClient');

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

function setup() {
  const mockGraphAPIClient = {
    getUserProfile: jest.fn(),
  };
  FBGraphAPIClient.factory = jest.fn();
  FBGraphAPIClient.factory.mockReturnValue(mockGraphAPIClient);
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
