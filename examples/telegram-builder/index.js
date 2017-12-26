const { TelegramBot, TelegramHandler } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').telegram;

const bot = new TelegramBot({
  accessToken: config.accessToken,
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
  console.log('server is running on 5000 port...');
});
