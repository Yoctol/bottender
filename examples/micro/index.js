require('babel-register');

const { MessengerBot } = require('../../src');
const { createRequestHandler } = require('../../src/micro');

const config = {
  verifyToken: '1qaz2wsx',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.handle(context => {
  context.sendText('Hello World');
});

module.exports = createRequestHandler(bot, config);
