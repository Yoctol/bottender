import TelegramBot from '../TelegramBot';
import TelegramConnector from '../TelegramConnector';

it('should construct bot with TelegramConnector', () => {
  const bot = new TelegramBot({
    accessToken: 'FAKE_TOKEN',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(TelegramConnector);
});
