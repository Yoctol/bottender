function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res, next) => {
    if (!req.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `restify.plugins.bodyParser()` before this middleware.'
      );
    }

    const response = await requestHandler(req.body);
    if (response) {
      res.send(response.status || 200, response.body || '', response.headers);
    } else {
      res.send(200);
    }
    return next();
  };
}

export default createMiddleware;
