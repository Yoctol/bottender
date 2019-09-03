import micro from 'micro';
import shortid from 'shortid';

import createRequestHandler from './createRequestHandler';

function createServer(bot, config = {}) {
  config.verifyToken =
    config.verifyToken || bot.connector.verifyToken || shortid.generate();

  const server = micro(createRequestHandler(bot, config));

  const _listen = server.listen.bind(server);
  server.listen = (...args) => {
    _listen(...args);

    if (bot.connector.platform === 'messenger') {
      console.log(`verify token: ${config.verifyToken}`);
    }
  };

  return server;
}

export default createServer;
