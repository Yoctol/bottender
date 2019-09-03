import { send, text } from 'micro';

const verifyViberSignature = bot => async (req, res) => {
  const rawBody = await text(req);

  const verified = bot.connector.verifySignature(
    rawBody,
    req.headers['x-viber-content-signature']
  );

  if (!verified) {
    send(res, 400, {
      error: {
        message: 'Viber Signature Validation Failed!',
        request: {
          rawBody,
          headers: {
            'x-viber-content-signature':
              req.headers['x-viber-content-signature'],
          },
        },
      },
    });
  }
  return verified;
};

export default verifyViberSignature;
