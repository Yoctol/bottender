import ConsoleContext from '../ConsoleContext';
import ConsoleEvent from '../ConsoleEvent';

jest.mock('delay');

let sleep;

beforeEach(() => {
  sleep = require('delay'); // eslint-disable-line global-require
});

afterEach(() => {
  jest.useFakeTimers();
});

const rawEvent = {
  message: {
    text: 'Hello, world',
  },
};

const setup = () => {
  const client = {
    sendText: jest.fn(),
  };
  const session = {
    user: {
      id: '1',
      name: 'you',
    },
  };
  const context = new ConsoleContext({
    client,
    event: new ConsoleEvent(rawEvent),
    session,
  });
  context.typing = jest.fn();
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

it('#sendText should write text to stdout', async () => {
  const { context, client } = setup();

  await context.sendText('hello');

  expect(client.sendText).toBeCalledWith('hello');
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });
});
