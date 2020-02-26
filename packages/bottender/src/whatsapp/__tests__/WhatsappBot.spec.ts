import WhatsappBot from '../WhatsappBot';
import WhatsappConnector from '../WhatsappConnector';

it('should construct bot with WhatsappConnector', () => {
  const bot = new WhatsappBot({
    accountSid: 'ACCOUNT_SID',
    authToken: 'AUTH_TOKEN',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(WhatsappConnector);
});
