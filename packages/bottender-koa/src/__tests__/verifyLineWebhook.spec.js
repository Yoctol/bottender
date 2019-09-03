import verifyLineWebhook from '../verifyLineWebhook';

function setup() {
  const bot = {
    connector: {
      isWebhookVerifyRequest: jest.fn(),
    },
  };

  const middleware = verifyLineWebhook(bot);

  const ctx = {
    request: {
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
    },
    response: {},
  };

  const next = jest.fn();

  return {
    bot,
    middleware,
    ctx,
    next,
  };
}

beforeEach(() => {
  console.error = jest.fn();
});

it('should correctly response 200 when is webhook verify request', () => {
  const { bot, middleware, ctx, next } = setup();

  bot.connector.isWebhookVerifyRequest.mockReturnValueOnce(true);

  middleware(ctx, next);

  expect(ctx.response.status).toBe(200);
  expect(next).not.toBeCalled();
});

it('should call next when is not webhook verify request', () => {
  const { bot, middleware, ctx, next } = setup();

  bot.connector.isWebhookVerifyRequest.mockReturnValueOnce(false);

  middleware(ctx, next);

  expect(next).toBeCalled();
});
