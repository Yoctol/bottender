import { json, send } from 'micro';

const verifySlackWebhook = () => async (req, res) => {
  const body = await json(req);
  if (body.type === 'url_verification') {
    send(res, 200, body.challenge);
  }
};

export default verifySlackWebhook;
