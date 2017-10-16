const { LineBot, LineHandler } = require('toolbot-core-experiment');
const { createServer } = require('toolbot-core-experiment/express');

const bot = new LineBot({
  channelSecret: '__FILL_YOUR_SECRET_HERE__',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

const handler = new LineHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);
server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
