const { TelegramBot, TelegramHandler } = require('bottender');
const { createServer } = require('bottender/express');

const url = '__FILL_URL_HERE__';

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

const handler = new TelegramHandler()
  .onText(/yo/i, async context => {
    const options = {
      parse_mode: 'Markdown',
    };
    await context.sendMessage('*Hi* there!', options);
  })
  .onEvent(async context => {
    await context.sendMessage("Sorry, I don't know what you say.");
  });

bot.onEvent(handler);

const server = createServer(bot);
server.listen(5000, () => {
  bot.connector.client.setWebhook(url);
  console.log('server is running on 5000 port...');
});
