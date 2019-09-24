import micro from 'micro';

import createRequestHandler from './createRequestHandler';
import { Bot, RouteConfig } from './types';

function createServer(bot: Bot, config: RouteConfig = {}) {
  const server = micro(createRequestHandler(bot, config));

  return server;
}

export default createServer;
