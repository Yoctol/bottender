function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    await requestHandler(req.body);
    res.sendStatus(200);
  };
}

export default createMiddleware;
