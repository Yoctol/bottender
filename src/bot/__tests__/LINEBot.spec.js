import LINEBot from '../LINEBot';
import LINEConnector from '../LINEConnector';

it('should construct LINEConnector', () => {
  const bot = new LINEBot({
    id: 'fake-id',
    accessToken: 'FAKE_TOKEN',
    channelSecret: 'FAKE_SECRET',
    filePath: 'fake://',
  });
  expect(bot).toBeDefined();
  expect(bot.handle).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(LINEConnector);
});
