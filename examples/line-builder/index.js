require('babel-register');

const { LineBot, LineHandlerBuilder } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  channelSecret: '__FILL_YOUR_SECRET_HERE__',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new LineBot({
  channelSecret: config.channelSecret,
  accessToken: config.accessToken,
});

const handler = new LineHandlerBuilder()
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
