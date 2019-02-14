import verifyMessengerSignature from '../verifyMessengerSignature';

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifyMessengerSignature(bot);

const createContext = () => ({
  request: {
    rawBody: 'raw body from messenger',
    headers: {
      'x-hub-signature': 'signature from messenger',
    },
  },
  response: {},
});

beforeEach(() => {
  console.error = jest.fn();
});

it('should call next when verification pass', () => {
  const ctx = createContext();
  const next = jest.fn();
  bot.connector.verifySignature.mockReturnValueOnce(true);

  middleware(ctx, next);

  expect(next).toBeCalled();
});

it('should send 400 when verification fail', () => {
  const ctx = createContext();
  const next = jest.fn();
  bot.connector.verifySignature.mockReturnValueOnce(false);

  middleware(ctx, next);

  expect(ctx.response.status).toBe(400);
  expect(ctx.response.body.error.message).toBe(
    'Messenger Signature Validation Failed!'
  );
});
