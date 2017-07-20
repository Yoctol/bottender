import { json, send } from 'micro';

const verifyMessengerWebhook = () => async (req, res) => {
  const body = await json(req);
  if (body.type === 'url_verification') {
    send(res, 200, body.challenge);
  }
};

export default verifyMessengerWebhook;
