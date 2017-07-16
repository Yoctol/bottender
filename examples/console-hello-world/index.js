require('babel-register');

const { ConsoleBot } = require('../../src');

const bot = new ConsoleBot();

bot.handle(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
