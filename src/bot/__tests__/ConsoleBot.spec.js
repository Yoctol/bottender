import readline from 'readline';

import once from 'once';

import ConsoleBot from '../ConsoleBot';
import ConsoleConnector from '../ConsoleConnector';

jest.mock('readline');

it('should construct bot with ConsoleConnector', () => {
  const bot = new ConsoleBot();
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(ConsoleConnector);
});

it('should export createRuntime method', () => {
  const bot = new ConsoleBot();
  expect(bot.createRuntime).toBeDefined();
});

describe('createRuntime', () => {
  beforeEach(() => {
    process.stdout.write = jest.fn();
    process.exit = jest.fn();
  });

  it('should work', () => {
    const bot = new ConsoleBot();
    const handler = jest.fn();

    bot.onEvent(handler);

    readline.createInterface.mockReturnValue({
      once: once((string, fn) => fn()),
      close: jest.fn(),
    });

    bot.createRuntime();

    expect(readline.createInterface).toBeCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
    expect(process.stdout.write).toBeCalledWith('You > ');
  });

  it('should exit when entering /quit', () => {
    const bot = new ConsoleBot();
    const handler = jest.fn();

    bot.onEvent(handler);

    readline.createInterface.mockReturnValue({
      once: once((string, fn) => fn('/quit')),
      close: jest.fn(),
    });

    bot.createRuntime();

    expect(process.exit).toBeCalled();
  });

  it('should exit when entering /exit', () => {
    const bot = new ConsoleBot();
    const handler = jest.fn();

    bot.onEvent(handler);

    readline.createInterface.mockReturnValue({
      once: once((string, fn) => fn('/exit')),
      close: jest.fn(),
    });

    bot.createRuntime();

    expect(process.exit).toBeCalled();
  });

  it('should call handler with text event when receive random text', async () => {
    const bot = new ConsoleBot();

    let context;
    bot.onEvent(ctx => {
      context = ctx;
    });

    readline.createInterface.mockReturnValue({
      once: once((string, fn) => fn('random text')),
      close: jest.fn(),
    });

    bot.createRuntime();

    await new Promise(process.nextTick);

    expect(context.event.isText).toBe(true);
    expect(context.event.text).toBe('random text');
  });

  it('should call handler with payload event when receive /payload <payload>', async () => {
    const bot = new ConsoleBot();

    let context;
    bot.onEvent(ctx => {
      context = ctx;
    });

    readline.createInterface.mockReturnValue({
      once: once((string, fn) => fn('/payload A_PAYLOAD')),
      close: jest.fn(),
    });

    bot.createRuntime();

    await new Promise(process.nextTick);

    expect(context.event.isPayload).toBe(true);
    expect(context.event.payload).toBe('A_PAYLOAD');
  });
});
