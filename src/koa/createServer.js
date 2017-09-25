import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

import createMiddleware from './createMiddleware';
import verifyLineSignature from './verifyLineSignature';
import verifyMessengerWebhook from './verifyMessengerWebhook';
import verifyMessengerSignature from './verifyMessengerSignature';
import verifySlackWebhook from './verifySlackWebhook';

function createServer(bot, config = {}) {
  const path = config.path || '/';
  let verifyToken;

  const server = new Koa();
  const router = new Router();

  router.use(bodyParser());
  if (bot.connector.platform === 'messenger') {
    verifyToken = config.verifyToken || shortid.generate();
    router.get(path, verifyMessengerWebhook({ verifyToken }));
    router.post(path, verifyMessengerSignature(bot), createMiddleware(bot));
  } else if (bot.connector.platform === 'slack') {
    router.post(path, verifySlackWebhook(), createMiddleware(bot));
  } else if (bot.connector.platform === 'line') {
    router.post(path, verifyLineSignature(bot), createMiddleware(bot));
  } else {
    router.post(path, createMiddleware(bot));
  }

  server.use(router.routes());

  const _listen = server.listen.bind(server);
  server.listen = (...args) => {
    _listen(...args);
    if (config.ngrok) {
      connectNgrok(args[0], (err, url) => {
        console.log(`webhook url: ${url}${path}`);
      });
    }
    if (bot.connector.platform === 'messenger') {
      console.log(`verify token: ${verifyToken}`);
    }
  };

  return server;
}

export default createServer;
