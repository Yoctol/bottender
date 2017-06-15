import restify from 'restify';

import createMiddleware from './createMiddleware';
import verifyMessengerWebhook from './verifyMessengerWebhook';

function createServer(bot, config = {}) {
  const server = restify.createServer();

  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.get(
    '/',
    verifyMessengerWebhook({
      verifyToken: config.verifyToken,
    })
  );
  server.post('/', createMiddleware(bot));

  return server;
}

export default createServer;
