import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import registerRoutes from './registerRoutes';
import { Bot, RouteConfig } from './types';

function createServer(bot: Bot, config: RouteConfig = {}) {
  const server = new Koa();

  server.use(bodyParser());

  registerRoutes(server, bot, config);

  return server;
}

export default createServer;
