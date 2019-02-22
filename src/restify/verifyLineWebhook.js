const verifyLineWebhook = bot => (req, res, next) => {
  if (bot.connector.isWebhookVerifyRequest(req.rawBody)) {
    if (bot.connector.onWebhookVerify) {
      bot.connector.onWebhookVerify({ req, res });
    }
    return res.send(200);
  }
  return next();
};

export default verifyLineWebhook;
