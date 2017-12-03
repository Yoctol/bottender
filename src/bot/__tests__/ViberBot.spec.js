import ViberBot from '../ViberBot';
import ViberConnector from '../ViberConnector';

it('should construct bot with ViberConnector', () => {
  const bot = new ViberBot({
    accessToken: 'FAKE_TOKEN',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(ViberConnector);
});
