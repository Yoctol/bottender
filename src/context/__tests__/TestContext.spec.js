jest.mock('delay');

let TestContext;
let TestEvent;
let sleep;

beforeEach(() => {
  /* eslint-disable global-require */
  TestContext = require('../TestContext').default;
  TestEvent = require('../TestEvent').default;
  sleep = require('delay');
  /* eslint-enable global-require */
});

afterEach(() => {
  jest.useFakeTimers();
});

const rawEvent = {
  message: {
    text: 'Hello, world',
  },
};

const userSession = {
  user: {
    id: '1',
    name: 'you',
  },
};

const setup = ({ session, fallbackMethods } = { session: userSession }) => {
  const client = {
    callMethod: jest.fn(),
  };
  const context = new TestContext({
    client,
    event: new TestEvent(rawEvent),
    session,
    fallbackMethods: fallbackMethods || false,
  });
  return {
    client,
    context,
    session,
  };
};

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('#platform to be `test`', () => {
  const { context } = setup();
  expect(context.platform).toBe('test');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(TestEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#sendText', () => {
  it('should call client.callMethod with sendText and text', async () => {
    const { context, client } = setup();

    await context.sendText('hello');

    expect(client.callMethod).toBeCalledWith('sendText', ['hello']);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('hello');

    expect(context.isHandled).toBe(true);
  });
});

describe('method missing', () => {
  it('should call callMethod', async () => {
    const { context, client } = setup({ fallbackMethods: true });

    await context.sendABC('hello', { json: true });

    expect(client.callMethod).toBeCalledWith('sendABC', [
      'hello',
      { json: true },
    ]);
  });

  it('should mark context as handled', async () => {
    const { context } = setup({ fallbackMethods: true });

    await context.sendABC('hello');

    expect(context.isHandled).toBe(true);
  });

  it('should not proxy blacklisted methods', async () => {
    const { context } = setup({ fallbackMethods: true });

    expect(context.handlerDidEnd).toBeUndefined();
    expect(context.then).toBeUndefined();
  });

  it('should not proxy falsy getters', async () => {
    const { context } = setup({ fallbackMethods: true });

    expect(context.isSessionWritten).toBe(false);
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });

  it('should call sleep', async () => {
    const { context } = setup();

    await context.typing(10);

    expect(sleep).toBeCalled();
  });
});
