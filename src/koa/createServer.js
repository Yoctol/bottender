import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

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

  const _listen = server.listen.bind(server);
  server.listen = (...args) => {
    _listen(...args);
    if (config.ngrok) {
      connectNgrok(args[0], (err, url) => {
        console.log(`webhook url: ${url}${path}`);
      });
    }
    console.log(`verify token: ${verifyToken}`);
  };

  return server;
}

export default createServer;
