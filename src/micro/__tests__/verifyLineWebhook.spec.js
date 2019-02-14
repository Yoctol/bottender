import micro from 'micro';

import verifyLineWebhook from '../verifyLineWebhook';

jest.mock('micro');

function setup() {
  const bot = {
    connector: {
      isWebhookVerifyRequest: jest.fn(),
    },
  };

  const middleware = verifyLineWebhook(bot);

  const req = {
    headers: {
      'x-line-signature': 'signature from line',
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn(),
  };

  return {
    bot,
    middleware,
    req,
    res,
  };
}

it('should response 200 when verification pass', async () => {
  const { bot, middleware, req, res } = setup();

  micro.json.mockResolvedValueOnce({
    events: [
      {
        replyToken: '00000000000000000000000000000000',
        type: 'message',
        timestamp: 1513065174862,
        source: {
          type: 'user',
          userId: 'Udeadbeefdeadbeefdeadbeefdeadbeef',
        },
        message: {
          id: '100001',
          type: 'text',
          text: 'Hello, world',
        },
      },
      {
        replyToken: 'ffffffffffffffffffffffffffffffff',
        type: 'message',
        timestamp: 1513065174862,
        source: {
          type: 'user',
          userId: 'Udeadbeefdeadbeefdeadbeefdeadbeef',
        },
        message: {
          id: '100002',
          type: 'sticker',
          packageId: '1',
          stickerId: '1',
        },
      },
    ],
  });
  bot.connector.isWebhookVerifyRequest.mockReturnValueOnce(true);

  await middleware(req, res);

  expect(micro.send).toBeCalledWith(res, 200);
});

it('should send 400 when verification fail', async () => {
  const { bot, middleware, req, res } = setup();

  micro.json.mockReturnValueOnce({});
  bot.connector.isWebhookVerifyRequest.mockReturnValueOnce(false);

  await middleware(req, res);

  expect(micro.send).not.toBeCalled();
});
