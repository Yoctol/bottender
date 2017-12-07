import SlackBot from '../SlackBot';
import SlackConnector from '../SlackConnector';

it('should construct bot with SlackConnector', () => {
  const bot = new SlackBot({
    accessToken: 'zzzzzZZZZZ',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(SlackConnector);
});
