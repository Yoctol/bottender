import WechatBot from '../WechatBot';
import WechatConnector from '../WechatConnector';

it('should construct bot with WechatConnector', () => {
  const bot = new WechatBot();
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(WechatConnector);
});
