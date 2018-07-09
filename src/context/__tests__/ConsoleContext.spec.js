jest.mock('delay');

let ConsoleContext;
let ConsoleEvent;
let sleep;

beforeEach(() => {
  /* eslint-disable global-require */
  ConsoleContext = require('../ConsoleContext').default;
  ConsoleEvent = require('../ConsoleEvent').default;
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
    sendText: jest.fn(),
  };
  const context = new ConsoleContext({
    client,
    event: new ConsoleEvent(rawEvent),
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

it('#platform to be `console`', () => {
  const { context } = setup();
  expect(context.platform).toBe('console');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(ConsoleEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#sendText', () => {
  it('should write text to stdout', async () => {
    const { context, client } = setup();

    await context.sendText('hello');

    expect(client.sendText).toBeCalledWith('hello');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('hello');

    expect(context.isHandled).toBe(true);
  });

  it('should support fallbackMethods with other args', async () => {
    const { context, client } = setup({ fallbackMethods: true });

    await context.sendText('hello', { other: 1 });

    expect(client.sendText).toBeCalledWith(
      `hello\nwith other args:\n${JSON.stringify([{ other: 1 }], null, 2)}`
    );
  });
});

describe('method missing', () => {
  it('should write text to stdout', async () => {
    const { context, client } = setup({ fallbackMethods: true });

    await context.sendABC('hello', { json: true });

    expect(client.sendText).toBeCalledWith(
      `sendABC with args:\n${JSON.stringify(
        ['hello', { json: true }],
        null,
        2
      )}`
    );
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
