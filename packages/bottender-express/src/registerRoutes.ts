import express from 'express';

import createMiddleware from './createMiddleware';
import { Bot, RouteConfig } from './types';

function registerRoutes(
  server: express.Application,
  bot: Bot,
  config: RouteConfig = {}
) {
  const path = config.path || '/';

  server.use(async (req, res, next) => {
    const { rawBody } = req as express.Request & { rawBody: string };
    if (req.path !== path) {
      next();
      return;
    }

    const url = `https://${req.get('host')}${req.originalUrl}`;

    const { shouldNext, response } = await bot.connector.preprocess({
      method: req.method,
      url,
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
