import readline from 'readline';

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
      on: (string, fn) => fn(),
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
      on: (string, fn) => fn('/quit'),
      close: jest.fn(),
    });

    bot.createRuntime();

    expect(process.exit).toBeCalled();
  });
});
