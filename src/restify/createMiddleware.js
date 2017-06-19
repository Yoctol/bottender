function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res, next) => {
    if (!req.params) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `restify.plugins.bodyParser()` before this middleware.'
      );
    }
    await requestHandler(req.params);
    res.send(200);
    return next();
  };
}

export default createMiddleware;
