import ConsoleContext from '../ConsoleContext';
import ConsoleEvent from '../ConsoleEvent';

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

it('#sendText should write text to stdout', () => {
  const { context, client } = setup();

  context.sendText('hello');

  jest.runTimersToTime(0);

  expect(client.sendText).toBeCalledWith('hello');
});

it('has delay with methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
});

it('#sendTextWithDelay write text to stdout after delay', () => {
  const { context, client } = setup();

  context.sendTextWithDelay(3000, 'hello');

  jest.runTimersToTime(3000);

  expect(client.sendText).toBeCalledWith('hello');
});
