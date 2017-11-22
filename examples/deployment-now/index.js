const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: process.env.ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, { verifyToken: process.env.VERIFY_TOKEN });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
