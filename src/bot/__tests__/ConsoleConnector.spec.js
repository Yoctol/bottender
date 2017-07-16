import ConsoleConnector from '../ConsoleConnector';
import ConsoleContext from '../../context/ConsoleContext';

const request = {
  message: {
    text: 'hello',
  },
};

function setup() {
  return {
    connector: new ConsoleConnector(),
  };
}

describe('#platform', () => {
  it('should be console', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('console');
  });
});

describe('#getSenderIdFromRequest', () => {
  it('always return 1', () => {
    const { connector } = setup();
    const senderId = connector.getSenderIdFromRequest(request.body);
    expect(senderId).toBe('1');
  });
});

describe('#getUserProfile', () => {
  it('always return sample dummy user', async () => {
    const { connector } = setup();
    const user = await connector.getUserProfile('1');
    expect(user).toEqual({
      id: '1',
      name: 'you',
    });
  });
});

describe('#handleRequest', () => {
  it('call handler with context', async () => {
    const { connector } = setup();
    const session = {};
    let context;
    const handler = _context => {
      context = _context;
    };
    await connector.handleRequest({ body: request.body, session, handler });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(ConsoleContext);
  });
});
