import express from 'express';
import bodyParser from 'body-parser';

import createMiddleware from './createMiddleware';
import verifyMessengerWebhook from './verifyMessengerWebhook';

function createServer(bot, config = {}) {
  const server = express();

  server.use(bodyParser.json());
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
