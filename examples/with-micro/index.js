require('babel-register');

const { MessengerBot } = require('../../src');
const { createRequestHandler } = require('../../src/micro');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

module.exports = createRequestHandler(bot);
