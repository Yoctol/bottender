import url from 'url';

import { send } from 'micro';

const verifyMessengerWebhook = ({ verifyToken }) => (req, res) => {
  const { query } = url.parse(req.url, true);
  if (
    query['hub.mode'] === 'subscribe' &&
    query['hub.verify_token'] === verifyToken
  ) {
    send(res, 200, query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    send(res, 403);
  }
};

export default verifyMessengerWebhook;
