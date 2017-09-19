import micro from 'micro';

import verifyLineSignature from '../verifyLineSignature';

jest.mock('micro');

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifyLineSignature(bot);

const createReqRes = () => [
  {
    headers: {
      'x-line-signature': 'signature from line',
    },
  },
  {
    send: jest.fn(),
    status: jest.fn(),
  },
];

it('should do nothing when verification pass', async () => {
  const [req, res] = createReqRes();
  micro.text.mockReturnValueOnce(Promise.resolve('raw body from line'));
  bot.connector.verifySignature.mockReturnValueOnce(true);

  await middleware(req, res);

  expect(micro.send).not.toBeCalled();
});

it('should send 400 when verification fail', async () => {
  const [req, res] = createReqRes();
  micro.text.mockReturnValueOnce('raw body from line');
  bot.connector.verifySignature.mockReturnValueOnce(false);

  await middleware(req, res);

  expect(micro.send).toBeCalledWith(res, 400, {
    error: {
      message: 'LINE Signature Validation Failed!',
      request: {
        rawBody: 'raw body from line',
        headers: {
          'x-line-signature': 'signature from line',
        },
      },
    },
  });
});
