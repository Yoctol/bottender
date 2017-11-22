const { ConsoleBot, MongoSessionStore } = require('bottender');

const bot = new ConsoleBot({
  sessionStore: new MongoSessionStore('mongodb://localhost:27017/'),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
