require('babel-register');

const { LINEBot, LINEHandlerBuilder } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  channelSecret: '__FILL_YOUR_SECRET_HERE__',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new LINEBot({
  channelSecret: config.channelSecret,
  accessToken: config.accessToken,
});

const handler = new LINEHandlerBuilder()
  .onText(/yo/i, context => {
    context.sendText('Hi there!');
  })
  .onEvent(context => {
    context.sendText("I don't know what you say.");
  })
  .onError(context => {
    context.sendText('Something wrong happened.');
  })
  .build();

bot.onEvent(handler);

const server = createServer(bot);
server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
