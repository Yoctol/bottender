const verifyLineWebhook = bot => (req, res, next) => {
  if (bot.connector.isWebhookVerifyRequest(req.body)) {
    if (bot.connector.onWebhookVerify) {
      bot.connector.onWebhookVerify({ req, res });
    }
    res.sendStatus(200);
  } else {
    return next();
  }
};

export default verifyLineWebhook;
