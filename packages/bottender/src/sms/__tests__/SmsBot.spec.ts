import SmsBot from '../SmsBot';
import SmsConnector from '../SmsConnector';

it('should construct bot with SmsConnector', () => {
  const bot = new SmsBot({
    accountSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    authToken: '<AUTH_TOKEN>',
    phoneNumber: '+15005550006',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(SmsConnector);
});
