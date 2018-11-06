const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const { isError613 } = require('messenger-batch');

const config = require('./bottender.config').messenger;

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  batchConfig: {
    delay: 1000,
    shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
    retryTimes: 2,
  },
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, { verifyToken: config.verifyToken });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
