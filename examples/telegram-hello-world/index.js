const { TelegramBot } = require('bottender');
const { createServer } = require('bottender/express');

const url = '__FILL_URL_HERE__';

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  bot.connector.client.setWebhook(url);
  console.log('server is running on 5000 port...');
});
