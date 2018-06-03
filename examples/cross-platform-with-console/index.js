const express = require('express');
const bodyParser = require('body-parser');
const {
  ConsoleBot,
  MessengerBot,
  LineBot,
  TelegramBot,
  SlackBot,
  ViberBot,
} = require('bottender');
const { registerRoutes } = require('bottender/express');

const handler = require('./handler');
const config = require('./bottender.config');

const server = express();

server.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

const bots = {
  console: new ConsoleBot().onEvent(handler),
  messenger: new MessengerBot(config.messenger).onEvent(handler),
  line: new LineBot(config.line).onEvent(handler),
  slack: new SlackBot(config.slack).onEvent(handler),
  telegram: new TelegramBot(config.telegram).onEvent(handler),
  viber: new ViberBot(config.viber).onEvent(handler),
};

if (process.argv[2] === 'console') {
  bots.console.createRuntime();
}

registerRoutes(server, bots.messenger, { path: '/messenger' });
registerRoutes(server, bots.line, { path: '/line' });
registerRoutes(server, bots.slack, { path: '/slack' });
registerRoutes(server, bots.telegram, { path: '/telegram' });
registerRoutes(server, bots.viber, { path: '/viber' });

server.listen(5000, () => {
  console.log('server is listening on 5000 port...');
});
