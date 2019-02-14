import verifyLineWebhook from '../verifyLineWebhook';

function setup() {
  const bot = {
    connector: {
      isWebhookVerifyRequest: jest.fn(),
    },
  };

  const middleware = verifyLineWebhook(bot);

  const req = {
    query: {},
    body: {
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
    },
  };

  const res = {
    send: jest.fn(),
  };

  const next = jest.fn();

  return {
    bot,
    middleware,
    req,
    res,
    next,
  };
}

beforeEach(() => {
  console.error = jest.fn();
});

it('should correctly response 200 when is webhook verify request', () => {
  const { bot, middleware, req, res, next } = setup();

  bot.connector.isWebhookVerifyRequest.mockReturnValueOnce(true);

  middleware(req, res, next);

  expect(res.send).toBeCalledWith(200);
  expect(next).not.toBeCalled();
});

it('should call next when is not webhook verify request', () => {
  const { bot, middleware, req, res, next } = setup();

  bot.connector.isWebhookVerifyRequest.mockReturnValueOnce(false);

  middleware(req, res, next);

  expect(next).toBeCalled();
});
