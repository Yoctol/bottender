import restify from 'restify';
import shortid from 'shortid';
import ngrok from 'ngrok';

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

  console.log(`verify token: ${verifyToken}`);
  if (config.ngrok) {
    ngrok.connect((err, url) => {
      console.log(`webhook url: ${url}${path}`);
    });
  }

  return server;
}

export default createServer;
