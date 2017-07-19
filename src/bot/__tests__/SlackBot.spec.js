import SlackBot from '../SlackBot';
import SlackConnector from '../SlackConnector';

it('should construct bot with SlackConnector', () => {
  const bot = new SlackBot({
    webhookURL: 'https://hooks.slack.com/services/XXXXXXXX/YYYYYYYY/zzzzzZZZZZ',
  });
  expect(bot).toBeDefined();
  expect(bot.handle).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(SlackConnector);
});
