import express from 'express';
import bodyParser from 'body-parser';
import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

import createMiddleware from './createMiddleware';
import verifyLineSignature from './verifyLineSignature';
import verifyMessengerSignature from './verifyMessengerSignature';
import verifyMessengerWebhook from './verifyMessengerWebhook';
import verifySlackWebhook from './verifySlackWebhook';

function createServer(bot, config = {}) {
  const path = config.path || '/';
  let verifyToken;
  const server = express();

  server.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );
  if (bot.connector.platform === 'messenger') {
    verifyToken = config.verifyToken || shortid.generate();
    server.get(path, verifyMessengerWebhook({ verifyToken }));
    server.post(path, verifyMessengerSignature(bot), createMiddleware(bot));
  } else if (bot.connector.platform === 'slack') {
    server.post(path, verifySlackWebhook(), createMiddleware(bot));
  } else if (bot.connector.platform === 'line') {
    server.post(path, verifyLineSignature(bot), createMiddleware(bot));
  } else {
    server.post(path, createMiddleware(bot));
  }

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
