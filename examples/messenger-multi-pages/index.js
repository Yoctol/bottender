const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const PAGE_1_PAGE_ID = process.env.PAGE_1_PAGE_ID;
const PAGE_1_ACCESS_TOKEN = process.env.PAGE_1_ACCESS_TOKEN;

const PAGE_2_PAGE_ID = process.env.PAGE_2_PAGE_ID;
const PAGE_2_ACCESS_TOKEN = process.env.PAGE_2_ACCESS_TOKEN;

const APP_SECRET = process.env.APP_SECRET;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

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
  appSecret: APP_SECRET,
  mapPageToAccessToken,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, { verifyToken: VERIFY_TOKEN });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
