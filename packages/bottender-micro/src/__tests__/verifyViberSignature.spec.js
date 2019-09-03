import micro from 'micro';

import verifyViberSignature from '../verifyViberSignature';

jest.mock('micro');

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifyViberSignature(bot);

const createReqRes = () => [
  {
    headers: {
      'x-viber-content-signature': 'signature from viber',
    },
  },
  {
    send: jest.fn(),
    status: jest.fn(),
  },
];

it('should do nothing when verification pass', async () => {
  const [req, res] = createReqRes();
  micro.text.mockResolvedValueOnce('raw body from viber');
  bot.connector.verifySignature.mockReturnValueOnce(true);

  await middleware(req, res);

  expect(micro.send).not.toBeCalled();
});

it('should send 400 when verification fail', async () => {
  const [req, res] = createReqRes();
  micro.text.mockReturnValueOnce('raw body from viber');
  bot.connector.verifySignature.mockReturnValueOnce(false);

  await middleware(req, res);

  expect(micro.send).toBeCalledWith(res, 400, {
    error: {
      message: 'Viber Signature Validation Failed!',
      request: {
        rawBody: 'raw body from viber',
        headers: {
          'x-viber-content-signature': 'signature from viber',
        },
      },
    },
  });
});
