const {
  ConsoleBot,
  MessengerBot,
  LineBot,
  TelegramBot,
  SlackBot,
  ViberBot,
} = require('bottender');

const handler = require('./handler');
const config = require('./bottender.config');

if (process.env.USE_CONSOLE === 'true') {
  const bot = new ConsoleBot().onEvent(handler);
  bot.createRuntime();
} else {
  const express = require('express');
  const bodyParser = require('body-parser');

  const { registerRoutes } = require('bottender/express');

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
    viber: new ViberBot(config.viber).onEvent(handler),
  };

  registerRoutes(server, bots.messenger, {
    path: '/messenger',
    verifyToken: config.messenger.verifyToken,
  });
  registerRoutes(server, bots.line, { path: '/line' });
  registerRoutes(server, bots.slack, { path: '/slack' });
  registerRoutes(server, bots.telegram, { path: '/telegram' });
  registerRoutes(server, bots.viber, { path: '/viber' });

  server.listen(5000, () => {
    console.log('server is listening on 5000 port...');
  });
}
