const verifyMessengerWebhook = ({ verifyToken }) => (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === verifyToken
  ) {
    console.log('Validating webhook');
    res.send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
};

export default verifyMessengerWebhook;
