import micro from 'micro';

import verifySlackSignature from '../verifySlackSignature';

jest.mock('micro');

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

it('should do nothing when verification pass', async () => {
  const [req, res] = createReqRes();
  micro.json.mockResolvedValueOnce({ token: 'mytoken' });
  bot.connector.verifySignature.mockReturnValueOnce(true);

  await middleware(req, res);

  expect(micro.send).not.toBeCalled();
});

it('should send 400 when verification fail', async () => {
  const [req, res] = createReqRes();
  micro.json.mockReturnValueOnce({ token: 'mytoken' });
  bot.connector.verifySignature.mockReturnValueOnce(false);

  await middleware(req, res);

  expect(micro.send).toBeCalledWith(res, 400, {
    error: {
      message: 'Slack Verification Token Validation Failed!',
      request: {
        body: { token: 'mytoken' },
      },
    },
  });
});
