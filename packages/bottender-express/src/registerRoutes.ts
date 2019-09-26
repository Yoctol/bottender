import express from 'express';

import createMiddleware from './createMiddleware';
import { Bot, RouteConfig } from './types';

function registerRoutes(
  server: express.Application,
  bot: Bot,
  config: RouteConfig = {}
) {
  const path = config.path || '/';

  server.use((req, res, next) => {
    const { rawBody } = req as express.Request & { rawBody: string };
    if (req.path !== path) {
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
        res.send(response.body);
      }
    }
  });

  server.post(path, createMiddleware(bot));

  return server;
}

export default registerRoutes;
