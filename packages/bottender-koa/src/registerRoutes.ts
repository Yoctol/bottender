import Koa from 'koa';
import Router from 'koa-router';

import createMiddleware from './createMiddleware';
import { Bot, RouteConfig } from './types';

function registerRoutes(server: Koa, bot: Bot, config: RouteConfig = {}) {
  const path = config.path || '/';

  const router = new Router();

  server.use((ctx: Koa.Context, next: () => Promise<void>) => {
    const { request } = ctx;
    if (request.path !== path) {
      return next();
    }

    const { shouldNext, response } = bot.connector.preprocess({
      method: request.method,
      headers: request.headers,
      query: request.query,
      rawBody: request.rawBody,
      body: request.body,
    });

    if (shouldNext) {
      return next();
    }
    if (response) {
      ctx.response.status = response.status;
      if (response.body) {
        ctx.response.body = response.body;
      }
    }
  });

  router.post(path, createMiddleware(bot));

  server.use(router.routes());

  return server;
}

export default registerRoutes;
