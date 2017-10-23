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
const setup = ({ session } = { session: userSession }) => {
  const client = {
    sendText: jest.fn(),
  };
  const context = new ConsoleContext({
    client,
    event: new ConsoleEvent(rawEvent),
    session,
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
