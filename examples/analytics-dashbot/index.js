const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const dashbotMiddleware = require('./dashbotMiddleware');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: dashbotMiddleware(bot, {
    apiKey: '__FILL_YOUR_DASHBOT_KEY_HERE__',
    platform: 'facebook',
  }),
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
