import { ViberClient } from 'messaging-api-viber';

import ViberConnector from '../ViberConnector';
import ViberContext from '../../context/ViberContext';
import ViberEvent from '../../context/ViberEvent';

jest.mock('messaging-api-viber');

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const subscribedRequest = {
  body: {
    event: 'subscribed',
    timestamp: 1457764197627,
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    message_token: 4912661846655238145,
  },
};

const unsubscribedRequest = {
  body: {
    event: 'unsubscribed',
    timestamp: 1457764197627,
    user_id: '01234567890A=',
    message_token: 4912661846655238145,
  },
};

const conversationStartedRequest = {
  body: {
    event: 'conversation_started',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    type: 'open',
    context: 'context information',
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    subscribed: false,
  },
};

const deliveredRequest = {
  body: {
    event: 'delivered',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
  },
};

const seenRequest = {
  body: {
    event: 'seen',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
  },
};

const failedRequest = {
  body: {
    event: 'failed',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
    desc: 'failure description',
  },
};

const messageRequest = {
  body: {
    event: 'message',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    sender: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    message: {
      type: 'text',
      text: 'a message to the service',
      tracking_data: 'tracking data',
    },
  },
};

function setup() {
  const mockViberClient = {};
  ViberClient.connect = jest.fn();
  ViberClient.connect.mockReturnValue(mockViberClient);
  return {
    mockViberClient,
    connector: new ViberConnector({ accessToken: ACCESS_TOKEN }),
  };
}

describe('#platform', () => {
  it('should be viber', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('viber');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector, mockViberClient } = setup();
    expect(connector.client).toBe(mockViberClient);
  });

  it('support custom client', () => {
    const client = {};
    const connector = new ViberConnector({ client });
    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct user id from subscribedRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(subscribedRequest.body);
    expect(senderId).toBe('01234567890A=');
  });

  it('extract correct user id from unsubscribedRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(unsubscribedRequest.body);
    expect(senderId).toBe('01234567890A=');
  });

  it('extract correct user id from conversationStartedRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(
      conversationStartedRequest.body
    );
    expect(senderId).toBe('01234567890A=');
  });

  it('extract correct user id from deliveredRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(deliveredRequest.body);
    expect(senderId).toBe('01234567890A=');
  });

  it('extract correct user id from seenRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(seenRequest.body);
    expect(senderId).toBe('01234567890A=');
  });

  it('extract correct user id from failedRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(failedRequest.body);
    expect(senderId).toBe('01234567890A=');
  });

  it('extract correct user id from messageRequest', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(messageRequest.body);
    expect(senderId).toBe('01234567890A=');
  });
});

describe('#updateSession', () => {
  it('update session with data needed from subscribedRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    };

    const session = {};

    await connector.updateSession(session, subscribedRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from unsubscribedRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
    };

    const session = {};

    await connector.updateSession(session, unsubscribedRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from conversationStartedRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    };

    const session = {};

    await connector.updateSession(session, conversationStartedRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from deliveredRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
    };

    const session = {};

    await connector.updateSession(session, deliveredRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from seenRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
    };

    const session = {};

    await connector.updateSession(session, seenRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from failedRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
    };

    const session = {};

    await connector.updateSession(session, failedRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session with data needed from messageRequest', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    };

    const session = {};

    await connector.updateSession(session, messageRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });

  it('update session from id-only user', async () => {
    const { connector } = setup();
    const user = {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    };

    const session = {
      user: {
        id: '01234567890A=',
        _updatedAt: new Date().toISOString(),
      },
    };

    await connector.updateSession(session, messageRequest.body);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to ViberEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(messageRequest.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ViberEvent);
  });
});

describe('#createContext', () => {
  it('should create ViberContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(ViberContext);
  });
});

describe('#verifySignature', () => {
  it('should return true if signature is equal app sercret after crypto', () => {
    const { connector } = setup();

    const result = connector.verifySignature(
      'rawBody',
      '250a5136d2f241195d4cb981a7293958434ec3ba9e50ed20788e9b030a1dd878='
    );

    expect(result).toBe(true);
  });
});
