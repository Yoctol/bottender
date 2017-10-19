const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const comeFrom = require('come-from');
const { MessengerBot, LineBot, TelegramBot, SlackBot } = require('bottender');
const {
  createMiddleware,
  verifyLineSignature,
  verifyMessengerSignature,
  verifyMessengerWebhook,
  verifySlackWebhook,
} = require('bottender/express');

const handler = require('./handler');

const config = {
  messenger: {
    accessToken: '__FILL_YOUR_TOKEN_HERE__',
    appSecret: '__FILL_YOUR_SECRET_HERE__',
  },
  line: {
    channelSecret: '__FILL_YOUR_CHANNEL_SECRET_HERE__',
    accessToken: '__FILL_YOUR_TOKEN_HERE__',
  },
  telegram: {
    accessToken: '__FILL_YOUR_TOKEN_HERE__',
  },
  slack: {
    accessToken: '__FILL_YOUR_TOKEN_HERE__',
  },
};

const messengerBot = new MessengerBot({
  accessToken: config.messenger.accessToken,
  appSecret: config.messenger.appSecret,
});

messengerBot.onEvent(handler);

const lineBot = new LineBot({
  channelSecret: config.line.channelSecret,
  accessToken: config.line.accessToken,
});

lineBot.onEvent(handler);

const telegramBot = new TelegramBot({
  accessToken: config.telegram.accessToken,
});

telegramBot.onEvent(handler);

const slackBot = new SlackBot({
  accessToken: config.slack.accessToken,
});

slackBot.onEvent(handler);

const server = express();

server.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

const path = config.path || '/';
const verifyToken = config.messenger.verifyToken || shortid.generate();

server.get(path, verifyMessengerWebhook({ verifyToken }));

server.post(path, (req, res) => {
  const cf = comeFrom(req.body);
  switch (cf) {
    case 'messenger':
      verifyMessengerSignature(messengerBot)(req, res, () => {
        createMiddleware(messengerBot)(req, res);
      });

      break;
    case 'line':
      verifyLineSignature(lineBot)(req, res, () => {
        createMiddleware(lineBot)(req, res);
      });
      break;
    case 'slack':
      verifySlackWebhook()(req, res, () => {
        createMiddleware(slackBot)(req, res);
      });
      break;
    case 'telegram':
    default:
      createMiddleware(telegramBot)(req, res);
  }
});

server.listen(5000, () => {
  console.log('messenger verify token:', verifyToken);
  console.log('server is listening on 5000 port...');
});
