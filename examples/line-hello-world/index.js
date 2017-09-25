require('babel-register');

const { LineBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  channelSecret: '__FILL_YOUR_SECRET_HERE__',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new LineBot({
  channelSecret: config.channelSecret,
  accessToken: config.accessToken,
});

bot.onEvent(context => {
  context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
