import ConsoleBot from '../ConsoleBot';
import ConsoleConnector from '../ConsoleConnector';

it('should construct bot with ConsoleConnector', () => {
  const bot = new ConsoleBot();
  expect(bot).toBeDefined();
  expect(bot.handle).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(ConsoleConnector);
});

it('should export createRuntime method', () => {
  const bot = new ConsoleBot();
  expect(bot.createRuntime).toBeDefined();
});
