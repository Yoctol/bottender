import { text, send } from 'micro';

const verifyLINESignature = bot => async (req, res) => {
  const rawBody = await text(req);

  const verified = bot.connector.verifySignature(
    rawBody,
    req.headers['x-line-signature']
  );

  if (!verified) {
    send(res, 400, {
      error: {
        message: 'LINE Signature Validation Failed!',
        request: {
          rawBody,
          headers: {
            'x-line-signature': req.headers['x-line-signature'],
          },
        },
      },
    });
  }
  return verified;
};

export default verifyLINESignature;
