require('babel-register');

const { ConsoleBot, middleware } = require('../../src');

const bot = new ConsoleBot();

const handler1 = async (context, next) => {
  await context.sendText('Hi there 1!');
  await next();
  await context.sendText('Hi there 3!');
};

const handler2 = async context => {
  await context.sendText('Hi there 2!');
};

bot.onEvent(middleware([handler1, handler2]));

bot.createRuntime();
