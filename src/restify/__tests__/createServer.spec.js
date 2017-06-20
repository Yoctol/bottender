import { IncomingMessage } from 'http';

import request from 'supertest';

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

afterEach(() => {
  // restify did some dirty things to IncomingMessage.prototype so we delete it
  // https://github.com/restify/node-restify/blob/1430644b53b08051066e8d1798a90a18527d541d/lib/request.js#L261-L273
  delete IncomingMessage.prototype.query;
});

it('should handle token verification', async () => {
  const { bot } = setup();
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status, text } = await request(server).get('/').query({
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
  const { status } = await request(server).post('/').send({});

  expect(status).toBe(200);
});

it('should run connectNgrok when server listen and ngrok option is provided', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockReturnValue(Promise.resolve());
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken, ngrok: true });
  server.listen();

  expect(connectNgrok).toBeCalled();
});
