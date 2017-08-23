import ConsoleContext from '../ConsoleContext';
import ConsoleEvent from '../ConsoleEvent';

const rawEvent = {
  message: {
    text: 'Hello, world',
  },
};

const setup = () => {
  const session = {
    user: {
      id: '1',
      name: 'you',
    },
  };
  const context = new ConsoleContext({
    event: new ConsoleEvent(rawEvent),
    session,
  });
  return {
    context,
    session,
  };
};

let _write;
beforeEach(() => {
  _write = process.stdout.write;
  process.stdout.write = jest.fn();
});

afterEach(() => {
  process.stdout.write = _write;
});

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

it('#sendText should write text to stdout', () => {
  const { context } = setup();

  context.sendText('hello');

  expect(process.stdout.write).toBeCalledWith('Bot > hello\nYou > ');
});

it('has delay with methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
});

it('#sendTextWithDelay write text to stdout after delay', () => {
  const { context } = setup();

  context.sendTextWithDelay(3000, 'hello');

  jest.runTimersToTime(3000);

  expect(process.stdout.write).toBeCalledWith('Bot > hello\nYou > ');
});
