import TestConnector from '../TestConnector';
import TestEvent from '../../context/TestEvent';
import TestContext from '../../context/TestContext';

const request = {
  message: {
    text: 'hello',
  },
};

function setup() {
  return {
    connector: new TestConnector(),
  };
}

describe('#platform', () => {
  it('should be test', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('test');
  });
});

describe('#client', () => {
  it('should be defined', () => {
    const { connector } = setup();
    expect(connector.client).toBeDefined();
  });

  it('support custom client', () => {
    const client = {};
    const connector = new TestConnector({ client });
    expect(connector.client).toBe(client);
  });

  describe('#callMethod', () => {
    it('should push to calls', () => {
      const { connector } = setup();

      connector.client.callMethod('sendText', 'hello');

      expect(connector.client.calls).toEqual([
        { name: 'sendText', args: 'hello' },
      ]);
    });
  });

  describe('#mockReset', () => {
    it('should call stdout', () => {
      const { connector } = setup();

      connector.client.callMethod('sendText', 'hello');

      connector.client.mockReset();

      expect(connector.client.calls).toEqual([]);
    });
  });
});

describe('#getUniqueSessionKey', () => {
  it('always return 1', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionKey(request.body);
    expect(senderId).toBe('1');
  });
});

describe('#updateSession', () => {
  it('always attach sample dummy user', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session);

    expect(session).toEqual({
      user: {
        id: '1',
        name: 'you',
        _updatedAt: expect.any(String),
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to TestEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(TestEvent);
  });
});

describe('#createContext', () => {
  it('should create TestContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(TestContext);
  });
});
