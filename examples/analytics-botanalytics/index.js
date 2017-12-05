const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const botanalyticsMiddleware = require('bottender-botanalytics/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: botanalyticsMiddleware(bot, {
    apiToken: '__FILL_YOUR_BOTANALYTICS_TOKEN_HERE__',
  }),
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
