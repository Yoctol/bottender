import micro from 'micro';
import shortid from 'shortid';

import connectNgrok from '../connectNgrok';

import createRequestHandler from './createRequestHandler';

function createServer(bot, config = {}) {
  config.verifyToken = config.verifyToken || shortid.generate();

  const server = micro(createRequestHandler(bot, config));

  const _listen = server.listen.bind(server);
  server.listen = (...args) => {
    _listen(...args);
    if (config.ngrok) {
      connectNgrok(args[0], (err, url) => {
        console.log(`webhook url: ${url}/`);
      });
    }
    console.log(`verify token: ${config.verifyToken}`);
  };

  return server;
}

export default createServer;
