require('babel-register');

const { MessengerBot } = require('../../src');
const { createRequestHandler } = require('../../src/micro');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

module.exports = createRequestHandler(bot, config);
