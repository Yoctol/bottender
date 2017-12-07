const { SlackBot, SlackHandler } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  verificationToken: '__FILL_YOUR_VERIFICATION_TOKEN_HERE__',
});

const handler = new SlackHandler()
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
