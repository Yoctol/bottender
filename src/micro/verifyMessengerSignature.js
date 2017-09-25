import { text, send } from 'micro';

const verifyMessenferSignature = bot => async (req, res) => {
  const rawBody = await text(req);

  const verified = bot.connector.verifySignature(
    rawBody,
    req.headers['x-hub-signature']
  );

  if (!verified) {
    send(res, 400, {
      error: {
        message: 'Messenger Signature Validation Failed!',
        request: {
          rawBody,
          headers: {
            'x-hub-signature': req.headers['x-hub-signature'],
          },
        },
      },
    });
  }
  return verified;
};

export default verifyMessenferSignature;
