require('babel-register');

const {
  TelegramBot,
  TelegramHandlerBuilder,
  MiddlewareHandlerBuilder,
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
    .onText(/[\s\S]+/i, async ctx => {
      ctx.sendMessage('Hi there 1!');
      await next();
      ctx.sendMessage('Hi there 3!');
    })
    .build()(context);

const nextHandler = new TelegramHandlerBuilder()
  .onText(/[\s\S]+/i, context => {
    context.sendMessage('Hi there 2!');
  })
  .build();

const middlewareHandlerBuilder = new MiddlewareHandlerBuilder()
  .use(handler)
  .use(nextHandler);

bot.onEvent(middlewareHandlerBuilder.build());

const server = createServer(bot);

server.listen(5000, () => {
  bot.connector._client.setWebhook(config.url);
  console.log('server is running on 5000 port...');
});
