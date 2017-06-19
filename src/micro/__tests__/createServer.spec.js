import listen from 'test-listen';
import request from 'superagent';

import connectNgrok from '../../connectNgrok';
import createServer from '../createServer';

jest.mock('../../connectNgrok');

function setup() {
  const requestHandler = jest.fn();
  const bot = {
    createRequestHandler: () => requestHandler,
  };
  return {
    bot,
    requestHandler,
  };
}

it('should handle token verification', async () => {
  const { bot } = setup();
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const url = await listen(server);
  const { status, text } = await request.get(`${url}/`).query({
    'hub.mode': 'subscribe',
    'hub.verify_token': verifyToken,
    'hub.challenge': 'chatbot is awesome',
  });

  expect(status).toBe(200);
  expect(text).toBe('chatbot is awesome');
});

it('should handle bot request', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockReturnValue(Promise.resolve());
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const url = await listen(server);
  const { status } = await request.post(`${url}/`).send({});

  expect(status).toBe(200);
});

it('should run connectNgrok when server listen and ngrok option is provided', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockReturnValue(Promise.resolve());
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken, ngrok: true });
  await listen(server);

  expect(connectNgrok).toBeCalled();
});
