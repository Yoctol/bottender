import { json, send } from 'micro';

const verifySlackSignature = bot => async (req, res) => {
  const body = await json(req);

  const verified = bot.connector.verifySignature(body.token);

  if (!verified) {
    send(res, 400, {
      error: {
        message: 'Slack Verification Token Validation Failed!',
        request: {
          body,
        },
      },
    });
  }
  return verified;
};

export default verifySlackSignature;
