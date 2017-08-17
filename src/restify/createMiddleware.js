function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res, next) => {
    if (!req.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `restify.plugins.bodyParser()` before this middleware.'
      );
    }

    await requestHandler(req.body);
    res.send(200);
    return next();
  };
}

export default createMiddleware;
