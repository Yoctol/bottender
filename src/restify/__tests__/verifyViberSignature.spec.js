import verifyViberSignature from '../verifyViberSignature';

const bot = {
  connector: {
    verifySignature: jest.fn(),
  },
};

const middleware = verifyViberSignature(bot);

const createReqRes = () => [
  {
    rawBody: 'raw body from viber',
    headers: {
      'x-viber-content-signature': 'signature from viber',
    },
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
      message: 'Viber Signature Validation Failed!',
      request: {
        rawBody: req.rawBody,
        headers: {
          'x-viber-content-signature': req.headers['x-viber-content-signature'],
        },
      },
    },
  });
});
