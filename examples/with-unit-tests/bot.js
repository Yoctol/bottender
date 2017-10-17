const { ConsoleBot } = require('toolbot-core-experiment');

const handler = require('./handler');

const bot = new ConsoleBot();

bot.onEvent(handler);

module.exports = bot;
