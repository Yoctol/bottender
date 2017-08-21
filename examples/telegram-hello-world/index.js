require('babel-register');

const { TelegramBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new TelegramBot({
  accessToken: config.accessToken,
});

bot.onEvent(context => {
  context.sendMessage('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
