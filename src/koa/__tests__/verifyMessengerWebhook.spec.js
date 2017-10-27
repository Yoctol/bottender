import verifyMessengerWebhook from '../verifyMessengerWebhook';

const VERIFY_TOKEN = '1qaz2wsx';

const middleware = verifyMessengerWebhook({ verifyToken: VERIFY_TOKEN });

const createContext = ({ verifyToken }) => ({
  request: {
    query: {
      'hub.mode': 'subscribe',
      'hub.verify_token': verifyToken,
      'hub.challenge': 'chatbot is awesome',
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

it('should correctly response the challenge when verifyToken is same', () => {
  const ctx = createContext({ verifyToken: '1qaz2wsx' });
  middleware(ctx);
  expect(ctx.response.body).toBe('chatbot is awesome');
});

it('should response status 403 when verifyToken is different', () => {
  const ctx = createContext({ verifyToken: 'I am a trouble maker' });
  middleware(ctx);
  expect(ctx.response.status).toBe(403);
});
