const verifyMessengerWebhook = ({ verifyToken }) => (req, res, next) => {
  if (
    req.params.hub.mode === 'subscribe' &&
    req.params.hub.verify_token === verifyToken
  ) {
    res.end(req.params.hub.challenge);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.send(403);
  }
  return next();
};

export default verifyMessengerWebhook;
