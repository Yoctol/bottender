require('babel-register');

const { TelegramBot, TelegramHandlerBuilder } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  url: '__FILL_URL_HERE__',
};

const bot = new TelegramBot({
  accessToken: config.accessToken,
});

const handler = new TelegramHandlerBuilder()
  .onText(/yo/i, async context => {
    const options = {
      parse_mode: 'Markdown',
    };
    await context.sendMessage('*Hi* there!', options);
  })
  .onEvent(async context => {
    await context.sendMessage("Sorry, I don't know what you say.");
  })
  .build();

bot.onEvent(handler);

const server = createServer(bot);
server.listen(5000, () => {
  bot.connector.client.setWebhook(config.url);
  console.log('server is running on 5000 port...');
});
