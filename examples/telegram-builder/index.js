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
  .onText(/Hi/i, 'Nice to see you!')
  .onText(/yo/i, context => {
    const options = {
      parse_mode: 'Markdown',
    };
    context.sendMessage('*Hi* there!', options);
  })
  .onEvent(context => {
    context.sendMessage("Sorry, I don't know what you say.");
  })
  .build();

bot.onEvent(handler);

const server = createServer(bot);
server.listen(5000, () => {
  bot.connector._client.setWebhook(config.url);
  console.log('server is running on 5000 port...');
});
