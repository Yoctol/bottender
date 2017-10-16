const {
  ConsoleBot,
  RedisCacheStore,
  CacheBasedSessionStore,
} = require('toolbot-core-experiment');

const cache = new RedisCacheStore();

const bot = new ConsoleBot({
  sessionStore: new CacheBasedSessionStore(cache),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
