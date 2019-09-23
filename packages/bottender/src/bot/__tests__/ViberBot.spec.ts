import ViberBot from '../ViberBot';
import ViberConnector from '../ViberConnector';

// FIXME: improve mock or remove mock
jest.unmock('messaging-api-viber');

it('should construct bot with ViberConnector', () => {
  const bot = new ViberBot({
    accessToken: 'FAKE_TOKEN',
    sender: { name: 'sender' },
  });

  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(ViberConnector);
});
