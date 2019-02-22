import { json, send } from 'micro';

const verifyLineWebhook = bot => async (req, res) => {
  const body = await json(req);

  if (bot.connector.isWebhookVerifyRequest(body)) {
    if (bot.connector.onWebhookVerify) {
      bot.connector.onWebhookVerify({ req, res });
    }
    send(res, 200);
    return true;
  }

  return false;
};

export default verifyLineWebhook;
