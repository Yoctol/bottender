import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import registerRoutes from './registerRoutes';

function createServer(bot, config = {}) {
  const server = new Koa();

  server.use(bodyParser());

  registerRoutes(server, bot, config);

  return server;
}

export default createServer;
