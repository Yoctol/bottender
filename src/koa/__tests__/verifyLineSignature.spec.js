import verifyLineSignature from '../verifyLineSignature';

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifyLineSignature(bot);

const createContext = () => ({
  request: {
    rawBody: 'raw body from line',
    header: {
      'x-line-signature': 'signature from line',
    },
  },
  response: {},
});

const _consoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = _consoleError;
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
    'LINE Signature Validation Failed!'
  );
});
