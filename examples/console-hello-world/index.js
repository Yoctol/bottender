require('babel-register');

const { ConsoleBot } = require('../../src');

const bot = new ConsoleBot();

bot.onEvent(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
