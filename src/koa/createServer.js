import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import createMiddleware from './createMiddleware';
import verifyMessengerWebhook from './verifyMessengerWebhook';

function createServer(bot, config = {}) {
  const server = new Koa();
  const router = new Router();

  router.use(bodyParser());
  router.get(
    '/',
    verifyMessengerWebhook({
      verifyToken: config.verifyToken,
    })
  );
  router.post('/', createMiddleware(bot));

  server.use(router.routes());

  return server;
}

export default createServer;
