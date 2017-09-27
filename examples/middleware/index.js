require('babel-register');

const {
  TelegramBot,
  TelegramHandlerBuilder,
  middleware,
} = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  url: '__FILL_URL_HERE__',
};

const bot = new TelegramBot({
  accessToken: config.accessToken,
});

const handler = (context, next) =>
  new TelegramHandlerBuilder()
    .onText(async ctx => {
      await ctx.sendMessage('Hi there 1!');
      await next();
      await ctx.sendMessage('Hi there 3!');
    })
    .build()(context);

const nextHandler = new TelegramHandlerBuilder()
  .onText(async context => {
    await context.sendMessage('Hi there 2!');
  })
  .build();

bot.onEvent(middleware([handler, nextHandler]));

const server = createServer(bot);

server.listen(5000, () => {
  bot.connector.client.setWebhook(config.url);
  console.log('server is running on 5000 port...');
});
