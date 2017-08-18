require('babel-register');

const {
  ConsoleBot,
  RedisCacheStore,
  CacheBasedSessionStore,
} = require('../../src');

const cache = new RedisCacheStore();

const bot = new ConsoleBot({
  sessionStore: new CacheBasedSessionStore(cache),
});

bot.onEvent(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
