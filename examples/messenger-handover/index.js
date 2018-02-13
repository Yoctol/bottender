const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

// This bot should be assigned as primary receiver app
bot.onEvent(async context => {
  if (context.event.isText && !context.event.isEcho) {
    if (context.event.isStandby) {
      if (context.event.text === '/back') {
        await context.takeThreadControl();
        await context.sendText('Taking thread control back.');
      }
    } else if (context.event.text === '/help') {
      await context.sendText('Passing thread control to the page inbox.');
      await context.passThreadControlToPageInbox();
    } else {
      await context.sendText('Respond by bot.');
    }
  }
});

const server = createServer(bot, { verifyToken: config.verifyToken });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
