const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const chatbaseMiddleware = require('bottender-chatbase/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: chatbaseMiddleware(bot, {
    apiKey: '__FILL_YOUR_CHATBASE_KEY_HERE__',
    platform: 'Facebook',
  }),
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
