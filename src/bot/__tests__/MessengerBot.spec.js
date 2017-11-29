import MessengerBot from '../MessengerBot';
import MessengerConnector from '../MessengerConnector';

const _consoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = _consoleError;
});

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

it('should construct bot with mapPageToAccessToken when passed in', () => {
  const mapPageToAccessToken = jest.fn();
  const bot = new MessengerBot({
    accessToken: 'FAKE_TOKEN',
    mapPageToAccessToken,
  });
  expect(bot).toBeDefined();
  expect(bot.mapPageToAccessToken).toBeDefined();
});
