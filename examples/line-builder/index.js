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

const builder = new LINEHandlerBuilder();

builder
  .onText(/Hi/i, 'Nice to see you!')
  .onText(/yo/i, context => {
    context.sendText('Hi there!');
  })
  .onText(/Good morning/i, 'Good morning!');

bot.handle(builder.build());

const server = createServer(bot, config);
server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
