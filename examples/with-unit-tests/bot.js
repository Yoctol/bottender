const { ConsoleBot } = require('bottender');

const handler = require('./handler');

const bot = new ConsoleBot();

bot.onEvent(handler);

module.exports = bot;
