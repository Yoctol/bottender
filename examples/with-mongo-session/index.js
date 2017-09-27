require('babel-register');

const { ConsoleBot, MongoSessionStore } = require('../../src');

const bot = new ConsoleBot({
  sessionStore: new MongoSessionStore('mongodb://localhost:27017/'),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
