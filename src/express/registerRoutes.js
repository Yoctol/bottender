import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

import createMiddleware from './createMiddleware';
import verifyLineSignature from './verifyLineSignature';
import verifyMessengerSignature from './verifyMessengerSignature';
import verifyMessengerWebhook from './verifyMessengerWebhook';
import verifySlackSignature from './verifySlackSignature';
import verifySlackWebhook from './verifySlackWebhook';

function registerRoutes(server, bot, config = {}) {
  const path = config.path || '/';
  let verifyToken;

  const middleware = config.webhookMiddleware ? [config.webhookMiddleware] : [];

  if (bot.connector.platform === 'messenger') {
    verifyToken = config.verifyToken || shortid.generate();
    server.get(path, verifyMessengerWebhook({ verifyToken }));
    middleware.unshift(verifyMessengerSignature(bot));
  } else if (bot.connector.platform === 'slack') {
    middleware.unshift(verifySlackWebhook(bot));
    middleware.unshift(verifySlackSignature(bot));
  } else if (bot.connector.platform === 'line') {
    middleware.unshift(verifyLineSignature(bot));
  }

  server.post(path, ...middleware, createMiddleware(bot));

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
