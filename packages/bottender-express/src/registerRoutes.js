import createMiddleware from './createMiddleware';

function registerRoutes(server, bot, config = {}) {
  const path = config.path || '/';

  server.use((req, res, next) => {
    if (req.path !== path) {
      next();
      return;
    }

    const { shouldNext, response } = bot.connector.preprocess({
      method: req.method,
      headers: req.headers,
      query: req.query,
      rawBody: req.rawBody,
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
