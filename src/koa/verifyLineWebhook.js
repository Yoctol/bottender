const verifyLineWebhook = bot => ({ request, response }, next) => {
  if (bot.connector.isWebhookVerifyRequest(request.body)) {
    response.status = 200;
  } else {
    return next();
  }
};

export default verifyLineWebhook;
