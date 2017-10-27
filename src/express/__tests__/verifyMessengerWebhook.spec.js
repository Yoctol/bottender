import verifyMessengerWebhook from '../verifyMessengerWebhook';

const VERIFY_TOKEN = '1qaz2wsx';

const middleware = verifyMessengerWebhook({ verifyToken: VERIFY_TOKEN });

const createReqRes = ({ verifyToken }) => [
  {
    query: {
      'hub.mode': 'subscribe',
      'hub.verify_token': verifyToken,
      'hub.challenge': 'chatbot is awesome',
    },
  },
  {
    send: jest.fn(),
    sendStatus: jest.fn(),
  },
];

const _consoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = _consoleError;
});

it('should correctly response the challenge when verifyToken is same', () => {
  const [req, res] = createReqRes({ verifyToken: '1qaz2wsx' });
  middleware(req, res);
  expect(res.send).toBeCalledWith('chatbot is awesome');
});

it('should response status 403 when verifyToken is different', () => {
  const [req, res] = createReqRes({ verifyToken: 'I am a trouble maker' });
  middleware(req, res);
  expect(res.sendStatus).toBeCalledWith(403);
});
