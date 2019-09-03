const verifyMessengerWebhook = ({ verifyToken }) => (req, res, next) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === verifyToken
  ) {
    res.end(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.send(403);
  }
  return next();
};

export default verifyMessengerWebhook;
