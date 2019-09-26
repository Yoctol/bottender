import { Request, Server } from 'restify';

import createMiddleware from './createMiddleware';
import { Bot, RouteConfig } from './types';

function registerRoutes(server: Server, bot: Bot, config: RouteConfig = {}) {
  const path = config.path || '/';

  server.pre((req, res, next) => {
    // rawBody is available on req: https://github.com/restify/plugins/issues/6
    const { rawBody } = req as Request & { rawBody: string };

    if (req.path() !== path) {
      next();
      return;
    }

    const { shouldNext, response } = bot.connector.preprocess({
      method: req.method,
      headers: req.headers,
      query: req.query,
      rawBody,
      body: req.body,
    });

    if (shouldNext) {
      next();
    } else if (response) {
      res.status(response.status);
      if (response.body) {
        if (typeof response.body === 'string') {
          res.sendRaw(response.body);
        } else {
          res.send(response.body);
        }
      }
    }
  });

  server.post(path, createMiddleware(bot));

  return server;
}

export default registerRoutes;
