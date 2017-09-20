import MessengerBot from '../MessengerBot';
import MessengerConnector from '../MessengerConnector';

it('should construct bot with MessengerConnector', () => {
  const bot = new MessengerBot({
    accessToken: 'FAKE_TOKEN',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(MessengerConnector);
});
