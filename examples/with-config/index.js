require('babel-register');

const { MessengerBot } = require('../../src');
const { createServer } = require('../../src/express');

const { messenger: config } = require('./bot.sample.json');

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.onEvent(context => {
  context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
