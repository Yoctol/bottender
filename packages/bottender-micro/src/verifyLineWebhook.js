import { json, send } from 'micro';

const verifyLineWebhook = bot => async (req, res) => {
  const body = await json(req);

  if (bot.connector.isWebhookVerifyRequest(body)) {
    send(res, 200);
    return true;
  }

  return false;
};

export default verifyLineWebhook;
