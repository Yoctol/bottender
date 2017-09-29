require('babel-register');

const { MessengerBot, MessengerHandlerBuilder } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

const handler = new MessengerHandlerBuilder()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  })
  .build();

bot.onEvent(handler);

const server = createServer(bot);
server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
