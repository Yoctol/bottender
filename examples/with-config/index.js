const { MessengerBot } = require('toolbot-core-experiment');
const { createServer } = require('toolbot-core-experiment/express');

const config = require('./bottender.config');

const bot = new MessengerBot(config.messenger);

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
