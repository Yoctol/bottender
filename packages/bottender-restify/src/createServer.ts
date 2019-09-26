import restify from 'restify';

import registerRoutes from './registerRoutes';
import { Bot, RouteConfig } from './types';

function createServer(bot: Bot, config: RouteConfig = {}) {
  const server = restify.createServer();

  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  registerRoutes(server, bot, config);

  return server;
}

export default createServer;
