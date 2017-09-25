import micro from 'micro';

import verifyMessengerSignature from '../verifyMessengerSignature';

jest.mock('micro');

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifyMessengerSignature(bot);

const createReqRes = () => [
  {
    headers: {
      'x-hub-signature': 'signature from messenger',
    },
  },
  {
    send: jest.fn(),
    status: jest.fn(),
  },
];

it('should do nothing when verification pass', async () => {
  const [req, res] = createReqRes();
  micro.text.mockReturnValueOnce(Promise.resolve('raw body from messenger'));
  bot.connector.verifySignature.mockReturnValueOnce(true);

  await middleware(req, res);

  expect(micro.send).not.toBeCalled();
});

it('should send 400 when verification fail', async () => {
  const [req, res] = createReqRes();
  micro.text.mockReturnValueOnce('raw body from messenger');
  bot.connector.verifySignature.mockReturnValueOnce(false);

  await middleware(req, res);

  expect(micro.send).toBeCalledWith(res, 400, {
    error: {
      message: 'Messenger Signature Validation Failed!',
      request: {
        rawBody: 'raw body from messenger',
        headers: {
          'x-hub-signature': 'signature from messenger',
        },
      },
    },
  });
});
