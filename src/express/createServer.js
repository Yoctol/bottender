import express from 'express';
import bodyParser from 'body-parser';
import shortid from 'shortid';
import ngrok from 'ngrok';

import createMiddleware from './createMiddleware';
import verifyMessengerWebhook from './verifyMessengerWebhook';

function createServer(bot, config = {}) {
  const path = config.path || '/';
  const verifyToken = config.verifyToken || shortid.generate();
  const server = express();

  server.use(bodyParser.json());
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
