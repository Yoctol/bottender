const { MessengerBot } = require('toolbot-core-experiment');
const { createServer } = require('toolbot-core-experiment/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  if (context.event.isTextMessage) {
    await context.sendText('I know you sent text message.');
  } else {
    await context.sendText("I know you didn't send text message.");
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
