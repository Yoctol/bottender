import LINEBot from '../LINEBot';
import LINEConnector from '../LINEConnector';

it('should construct bot with LINEConnector', () => {
  const bot = new LINEBot({
    accessToken: 'FAKE_TOKEN',
    channelSecret: 'FAKE_SECRET',
  });
  expect(bot).toBeDefined();
  expect(bot.handle).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(LINEConnector);
});
