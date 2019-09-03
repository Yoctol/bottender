import TestBot from '../TestBot';
import TestConnector from '../TestConnector';

it('should construct bot with TestConnector', () => {
  const bot = new TestBot();
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(TestConnector);
});

it('should export runTests method', () => {
  const bot = new TestBot();
  expect(bot.runTests).toBeDefined();
});

describe('runTests', () => {
  it('should work', async () => {
    const bot = new TestBot();
    const handler = async context => {
      if (context.event.text === 'hello') {
        await context.sendText('hello +1');
      } else if (context.event.text === 'world') {
        await context.sendText('world +1');
      }
    };

    bot.onEvent(handler);

    const result = await bot.runTests(['hello', 'world']);

    expect(result).toEqual([
      {
        input: 'hello',
        output: {
          calls: [{ args: ['hello +1'], name: 'sendText' }],
          error: null,
        },
      },
      {
        input: 'world',
        output: {
          calls: [{ args: ['world +1'], name: 'sendText' }],
          error: null,
        },
      },
    ]);
  });

  xit('should handle error', async () => {
    const bot = new TestBot();
    const handler = async () => {
      throw new Error('xxx');
    };

    bot.onEvent(handler);

    const result = await bot.runTests(['hello', 'world']);

    expect(result).toEqual([
      {
        input: 'hello',
        output: {
          calls: [],
          error: {},
        },
      },
      {
        input: 'world',
        output: {
          calls: [],
          error: {},
        },
      },
    ]);
  });
});
