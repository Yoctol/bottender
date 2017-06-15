function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res, next) => {
    await requestHandler(req.params);
    res.status(200);
    return next();
  };
}

export default createMiddleware;
