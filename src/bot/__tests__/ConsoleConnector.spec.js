import ConsoleConnector from '../ConsoleConnector';
import ConsoleContext from '../../context/ConsoleContext';
import ConsoleEvent from '../../context/ConsoleEvent';

const request = {
  message: {
    text: 'hello',
  },
};

function setup(option) {
  return {
    connector: new ConsoleConnector(option),
  };
}

describe('#platform', () => {
  it('should be console, when no extra option set', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('console');
  });

  it('should be overide by mockPlatform setting', () => {
    const { connector } = setup({
      mockPlatform: 'messenger',
    });
    expect(connector.platform).toBe('messenger');
  });
});

describe('#client', () => {
  it('should be defined', () => {
    const { connector } = setup();
    expect(connector.client).toBeDefined();
  });

  it('support custom client', () => {
    const client = {};
    const connector = new ConsoleConnector({ client });
    expect(connector.client).toBe(client);
  });

  describe('#sendText', () => {
    beforeEach(() => {
      process.stdout.write = jest.fn();
    });

    it('should call stdout', () => {
      const { connector } = setup();

      connector.client.sendText('hello');

      jest.runTimersToTime(0);

      expect(process.stdout.write).toHaveBeenCalledWith('Bot > hello\n');
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
  it('should map request to ConsoleEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ConsoleEvent);
  });
});

describe('#createContext', () => {
  it('should create ConsoleContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(ConsoleContext);
  });
});
