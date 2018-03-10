import Router from 'koa-router';
import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

import createMiddleware from './createMiddleware';
import verifyLineSignature from './verifyLineSignature';
import verifyMessengerWebhook from './verifyMessengerWebhook';
import verifyMessengerSignature from './verifyMessengerSignature';
import verifySlackWebhook from './verifySlackWebhook';
import verifySlackSignature from './verifySlackSignature';
import verifyViberSignature from './verifyViberSignature';

function registerRoutes(server, bot, config = {}) {
  const path = config.path || '/';
  let verifyToken;

  const router = new Router();

  const middleware = config.webhookMiddleware ? [config.webhookMiddleware] : [];

  if (bot.connector.platform === 'messenger') {
    verifyToken =
      config.verifyToken || bot.connector.verifyToken || shortid.generate();
    router.get(path, verifyMessengerWebhook({ verifyToken }));
    middleware.unshift(verifyMessengerSignature(bot));
  } else if (bot.connector.platform === 'slack') {
    middleware.unshift(verifySlackWebhook(bot));
    middleware.unshift(verifySlackSignature(bot));
  } else if (bot.connector.platform === 'line') {
    middleware.unshift(verifyLineSignature(bot));
  } else if (bot.connector.platform === 'viber') {
    middleware.unshift(verifyViberSignature(bot));
  }

  router.post(path, ...middleware, createMiddleware(bot));

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

export default registerRoutes;
