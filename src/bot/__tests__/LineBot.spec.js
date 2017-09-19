import LineBot from '../LineBot';
import LineConnector from '../LineConnector';

it('should construct bot with LineConnector', () => {
  const bot = new LineBot({
    accessToken: 'FAKE_TOKEN',
    channelSecret: 'FAKE_SECRET',
  });
  expect(bot).toBeDefined();
  expect(bot.handle).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(LineConnector);
});
