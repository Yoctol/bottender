const { WechatBot } = require('../../lib');
const { createServer } = require('../../lib/express');

const config = require('./bottender.config').wechat;

const bot = new WechatBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  verifyToken: config.verifyToken,
});

bot.onEvent(async context => {
  await context.replyText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
