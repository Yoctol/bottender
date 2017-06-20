import restify from 'restify';
import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

import createMiddleware from './createMiddleware';
import verifyMessengerWebhook from './verifyMessengerWebhook';

function createServer(bot, config = {}) {
  const path = config.path || '/';
  const verifyToken = config.verifyToken || shortid.generate();
  const server = restify.createServer();

  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.get(path, verifyMessengerWebhook({ verifyToken }));
  server.post(path, createMiddleware(bot));

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
