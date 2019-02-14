import request from 'supertest';

import connectNgrok from '../../connectNgrok';
import createServer from '../createServer';

jest.mock('../../connectNgrok');

function setup({ platform }) {
  const requestHandler = jest.fn();
  const bot = {
    createRequestHandler: () => requestHandler,
    connector: {
      platform,
      verifySignature: jest.fn(),
    },
  };
  return {
    bot,
    requestHandler,
  };
}

beforeEach(() => {
  console.error = jest.fn();
});

it('should handle token verification', async () => {
  const { bot } = setup({ platform: 'messenger' });
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status, text } = await request(server.callback())
    .get('/')
    .query({
      'hub.mode': 'subscribe',
      'hub.verify_token': verifyToken,
      'hub.challenge': 'chatbot is awesome',
    });

  expect(status).toBe(200);
  expect(text).toBe('chatbot is awesome');
});

it('should not handle token verification if platform is not messenger', async () => {
  const { bot } = setup({ platform: 'line' });
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status } = await request(server.callback())
    .get('/')
    .query({
      'hub.mode': 'subscribe',
      'hub.verify_token': verifyToken,
      'hub.challenge': 'chatbot is awesome',
    });

  expect(status).toBe(404);
});

it('should handle Messenger signature verification if platform is messenger', async () => {
  const { bot, requestHandler } = setup({ platform: 'messenger' });
  requestHandler.mockResolvedValue();

  const server = createServer(bot);
  const { status } = await request(server.callback())
    .post('/')
    .send({});

  expect(status).toBe(400);
});

it('should handle LINE signature verification if platform is LINE', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  requestHandler.mockResolvedValue();

  const server = createServer(bot);
  const { status } = await request(server.callback())
    .post('/')
    .send({});

  expect(status).toBe(400);
});

it('should handle bot request', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status } = await request(server.callback())
    .post('/')
    .send({});

  expect(status).toBe(200);
});

it('should run connectNgrok when server listen and ngrok option is provided', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken, ngrok: true });
  server.listen();

  expect(connectNgrok).toBeCalled();
});

it('should work with additional webhook middleware', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  const mockFn = jest.fn();
  const webhookMiddleware = (ctx, next) => {
    mockFn();
    return next();
  };
  const server = createServer(bot, { webhookMiddleware });
  const { status } = await request(server.callback())
    .post('/')
    .send({});

  expect(status).toBe(200);
  expect(mockFn).toBeCalled();
});
