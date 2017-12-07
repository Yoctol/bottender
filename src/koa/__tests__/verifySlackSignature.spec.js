import verifySlackSignature from '../verifySlackSignature';

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifySlackSignature(bot);

const createContext = () => ({
  request: {
    body: { token: 'mytoken' },
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
    'Slack Verification Token Validation Failed!'
  );
});
