import verifySlackSignature from '../verifySlackSignature';

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifySlackSignature(bot);

const createReqRes = () => [
  {
    body: { token: 'mytoken' },
  },
  {
    send: jest.fn(),
    status: jest.fn(),
  },
];

const _consoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = _consoleError;
});

it('should call next when verification pass', () => {
  const [req, res] = createReqRes();
  const next = jest.fn();
  bot.connector.verifySignature.mockReturnValueOnce(true);

  middleware(req, res, next);

  expect(next).toBeCalled();
});

it('should send 400 when verification fail', () => {
  const [req, res] = createReqRes();
  const next = jest.fn();
  bot.connector.verifySignature.mockReturnValueOnce(false);

  middleware(req, res, next);

  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledWith({
    error: {
      message: 'Slack Verification Token Validation Failed!',
      request: {
        body: { token: 'mytoken' },
      },
    },
  });
});
