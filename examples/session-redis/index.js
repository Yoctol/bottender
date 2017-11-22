const {
  ConsoleBot,
  RedisCacheStore,
  CacheBasedSessionStore,
} = require('bottender');

const cache = new RedisCacheStore();

const bot = new ConsoleBot({
  sessionStore: new CacheBasedSessionStore(cache),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
