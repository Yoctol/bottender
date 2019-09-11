import restify from 'restify';

import registerRoutes from './registerRoutes';

function createServer(bot, config = {}) {
  const server = restify.createServer();

  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  registerRoutes(server, bot, config);

  return server;
}

export default createServer;
