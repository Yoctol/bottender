require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');

const { MessengerBot } = require('../../src');
const {
  verifyMessengerWebhook,
  verifyMessengerSignature,
  createMiddleware,
} = require('../../src/express');

const botimizeMiddleware = require('./botimizeMiddleware');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = express();

server.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
server.get(
  '/',
  verifyMessengerWebhook({ verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__' })
);
server.post(
  '/',
  verifyMessengerSignature(bot),
  botimizeMiddleware(bot, {
    apiKey: '__FILL_YOUR_BOTIMIZE_KEY_HERE__',
    platform: 'facebook',
  }),
  createMiddleware(bot)
);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
