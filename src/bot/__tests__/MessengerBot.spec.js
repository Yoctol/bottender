import MessengerBot from '../MessengerBot';
import MessengerConnector from '../MessengerConnector';

it('should construct MessengerConnector', () => {
  const bot = new MessengerBot({
    id: 'fake-id',
    accessToken: 'FAKE_TOKEN',
    filePath: 'fake://',
  });
  expect(bot).toBeDefined();
  expect(bot.handle).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(MessengerConnector);
});
