import Router from 'koa-router';

import createMiddleware from './createMiddleware';

function registerRoutes(server, bot, config = {}) {
  const path = config.path || '/';

  const router = new Router();

  server.use((ctx, next) => {
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
