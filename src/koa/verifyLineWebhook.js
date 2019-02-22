const verifyLineWebhook = bot => (ctx, next) => {
  const { request, response } = ctx;
  if (bot.connector.isWebhookVerifyRequest(request.body)) {
    if (bot.connector.onWebhookVerify) {
      bot.connector.onWebhookVerify(ctx);
    }
    response.status = 200;
  } else {
    return next();
  }
};

export default verifyLineWebhook;
