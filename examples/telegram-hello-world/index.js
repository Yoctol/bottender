require('babel-register');

const { TelegramBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new TelegramBot({
  accessToken: config.accessToken,
});

bot.handle(context => {
  context.sendMessage('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
