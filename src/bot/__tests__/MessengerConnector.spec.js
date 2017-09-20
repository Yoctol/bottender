import { MessengerClient } from 'messaging-api-messenger';

import MessengerConnector from '../MessengerConnector';
import MessengerEvent from '../../context/MessengerEvent';
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
              text: '測試1',
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
              text: '測試2',
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
  MessengerClient.connect = jest.fn();
  MessengerClient.connect.mockReturnValue(mockGraphAPIClient);
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

describe('#getUniqueSessionIdFromRequest', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(request.body);
    expect(senderId).toBe('1412611362105802');
  });

  it('return recipient id when request is an echo event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(echoRequest.body);
    expect(senderId).toBe('1244813222196986');
  });

  it('extract sender id from first event', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(batchRequest.body);
    expect(senderId).toBe('1412611362105802');
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockGraphAPIClient } = setup();
    const user = {
      id: '1412611362105802',
      first_name: '薄餡',
      last_name: '茱',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };
    mockGraphAPIClient.getUserProfile.mockReturnValue(Promise.resolve(user));

    const session = {};
    await connector.updateSession(session, request.body);

    expect(mockGraphAPIClient.getUserProfile).toBeCalledWith(
      '1412611362105802'
    );
    expect(session).toEqual({
      user: {
        platform: 'messenger',
        ...user,
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to MessengerEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
  });

  it('should wroks with batch entry', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(batchRequest.body);

    expect(events).toHaveLength(2);
    expect(events[0]).toBeInstanceOf(MessengerEvent);
    expect(events[1]).toBeInstanceOf(MessengerEvent);
  });
});

describe('#createContext', () => {
  it('should create MessengerContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(MessengerContext);
  });
});
