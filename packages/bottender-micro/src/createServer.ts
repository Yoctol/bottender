import micro from 'micro';

import createRequestHandler from './createRequestHandler';

function createServer(bot, config = {}) {
  const server = micro(createRequestHandler(bot, config));

  return server;
}

export default createServer;
