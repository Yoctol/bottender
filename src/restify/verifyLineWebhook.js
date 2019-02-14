const verifyLineWebhook = bot => (req, res, next) => {
  if (bot.connector.isWebhookVerifyRequest(req.rawBody)) {
    return res.send(200);
  }
  return next();
};

export default verifyLineWebhook;
