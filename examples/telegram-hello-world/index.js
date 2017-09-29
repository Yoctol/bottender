require('babel-register');

const { TelegramBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  url: '__FILL_URL_HERE__',
};

const bot = new TelegramBot({
  accessToken: config.accessToken,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  bot.connector.client.setWebhook(config.url);
  console.log('server is running on 5000 port...');
});
