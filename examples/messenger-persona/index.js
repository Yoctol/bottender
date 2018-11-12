const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

bot.onEvent(async context => {
  if (context.event.text === '/help') {
    context.usePersona(process.env.PERSONA_1);
    await context.sendText('Hello');
    await context.sendText('World');
  } else {
    await context.sendText('Hello', {
      persona_id: process.env.PERSONA_2,
    });
    await context.sendText('World', {
      persona_id: process.env.PERSONA_2,
    });
  }
});

const server = createServer(bot, { verifyToken: config.verifyToken });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
