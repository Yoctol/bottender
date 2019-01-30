const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const { isError613 } = require('messenger-batch');

const config = require('./bottender.config').messenger;

const PAGE_1_PAGE_ID = process.env.PAGE_1_PAGE_ID;
const PAGE_1_ACCESS_TOKEN = process.env.PAGE_1_ACCESS_TOKEN;

const PAGE_2_PAGE_ID = process.env.PAGE_2_PAGE_ID;
const PAGE_2_ACCESS_TOKEN = process.env.PAGE_2_ACCESS_TOKEN;

/**
 * The example show how to map pages to tokens from (id, token) set,
 * but you can dynamically load tokens from SQL database, mongodb, redis, REST API ...
 * or whatever you want.
 */
const mapPageToAccessToken = pageId => {
  switch (pageId) {
    case PAGE_1_PAGE_ID:
      return PAGE_1_ACCESS_TOKEN;
    case PAGE_2_PAGE_ID:
    default:
      return PAGE_2_ACCESS_TOKEN;
  }
};

const bot = new MessengerBot({
  accessToken: PAGE_1_ACCESS_TOKEN, // Top level access token should be specified for batch request.
  appSecret: config.appSecret,
  mapPageToAccessToken,
  batchConfig: {
    delay: 1000,
    shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
    retryTimes: 2,
  },
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, { verifyToken: config.verifyToken });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
