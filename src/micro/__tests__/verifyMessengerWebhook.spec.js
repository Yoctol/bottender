import micro from 'micro';

import verifyMessengerWebhook from '../verifyMessengerWebhook';

jest.mock('micro');

const VERIFY_TOKEN = '1qaz2wsx';

const middleware = verifyMessengerWebhook({ verifyToken: VERIFY_TOKEN });

const createReqRes = ({ verifyToken }) => [
  {
    url: `http://example.com/?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.challenge=chatbot%20is%20awesome`,
  },
  {
    send: jest.fn(),
    sendStatus: jest.fn(),
  },
];

beforeEach(() => {
  console.error = jest.fn();
});

it('should correctly response the challenge when verifyToken is same', () => {
  const [req, res] = createReqRes({ verifyToken: '1qaz2wsx' });
  middleware(req, res);
  expect(micro.send).toBeCalledWith(res, 200, 'chatbot is awesome');
});

it('should response status 403 when verifyToken is different', () => {
  const [req, res] = createReqRes({ verifyToken: 'I am a trouble maker' });
  middleware(req, res);
  expect(micro.send).toBeCalledWith(res, 403);
});
