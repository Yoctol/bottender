function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    if (!req.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `body-parser` or other similar package before this middleware.'
      );
    }
    await requestHandler(req.body);
    res.sendStatus(200);
  };
}

export default createMiddleware;
