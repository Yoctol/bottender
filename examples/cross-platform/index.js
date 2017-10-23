const express = require('express');
const bodyParser = require('body-parser');
const { MessengerBot, LineBot, TelegramBot, SlackBot } = require('bottender');
const { registerRoutes } = require('bottender/express');

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

const server = express();

server.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

const bots = {
  messenger: new MessengerBot(config.messenger).onEvent(handler),
  line: new LineBot(config.line).onEvent(handler),
  slack: new SlackBot(config.slack).onEvent(handler),
  telegram: new TelegramBot(config.telegram).onEvent(handler),
};

registerRoutes(server, bots.messenger, { path: '/messenger' });
registerRoutes(server, bots.line, { path: '/line' });
registerRoutes(server, bots.slack, { path: '/slack' });
registerRoutes(server, bots.telegram, { path: '/telegram' });

server.listen(5000, () => {
  console.log('server is listening on 5000 port...');
});
