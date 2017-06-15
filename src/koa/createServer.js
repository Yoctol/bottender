import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import shortid from 'shortid';
import ngrok from 'ngrok';

import createMiddleware from './createMiddleware';
import verifyMessengerWebhook from './verifyMessengerWebhook';

function createServer(bot, config = {}) {
  const path = config.path || '/';
  const verifyToken = config.verifyToken || shortid.generate();

  const server = new Koa();
  const router = new Router();

  router.use(bodyParser());
  router.get(path, verifyMessengerWebhook({ verifyToken }));
  router.post(path, createMiddleware(bot));

  server.use(router.routes());

  console.log(`verify token: ${verifyToken}`);
  if (config.ngrok) {
    ngrok.connect((err, url) => {
      console.log(`webhook url: ${url}${path}`);
    });
  }

  return server;
}

export default createServer;
