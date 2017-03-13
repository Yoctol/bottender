const verifyWebhook = ({ verifyToken }) => ({ request, response }) => {
  if (
    request.query['hub.mode'] === 'subscribe' &&
    request.query['hub.verify_token'] === verifyToken
  ) {
    console.log('Validating webhook');
    response.body = request.query['hub.challenge'];
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    response.status = 403;
  }
};

export default verifyWebhook;
