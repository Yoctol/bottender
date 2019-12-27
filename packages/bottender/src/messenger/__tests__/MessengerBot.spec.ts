import MessengerBot from '../MessengerBot';
import MessengerConnector from '../MessengerConnector';

beforeEach(() => {
  console.error = jest.fn();
});

const ACCESS_TOKEN = 'FAKE_TOKEN';
const APP_SECRET = 'FAKE_SECRET';

it('should construct bot with MessengerConnector', () => {
  const bot = new MessengerBot({
    accessToken: ACCESS_TOKEN,
    appSecret: APP_SECRET,
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(MessengerConnector);
});
