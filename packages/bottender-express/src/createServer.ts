import bodyParser from 'body-parser';
import express from 'express';

import registerRoutes from './registerRoutes';
import { Bot, RouteConfig } from './types';

function createServer(bot: Bot, config: RouteConfig = {}) {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    bodyParser.json({
      verify: (req: express.Request & { rawBody?: string }, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  registerRoutes(server, bot, config);

  return server;
}

export default createServer;
