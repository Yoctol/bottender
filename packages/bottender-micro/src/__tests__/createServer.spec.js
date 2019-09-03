import parseUrlencoded from 'urlencoded-body-parser';
import request from 'supertest';

import createServer from '../createServer';

jest.mock('urlencoded-body-parser');

function setup({ platform, verifyToken }) {
  const requestHandler = jest.fn();
  const bot = {
    createRequestHandler: () => requestHandler,
    connector: {
      platform,
      verifyToken,
    },
  };
  return {
    bot,
    requestHandler,
  };
}

beforeEach(() => {
  console.log = jest.fn();
});

it('should handle token verification', async () => {
  const { bot } = setup({ platform: 'messenger' });
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status, text } = await request(server)
    .get('/')
    .query({
      'hub.mode': 'subscribe',
      'hub.verify_token': verifyToken,
      'hub.challenge': 'chatbot is awesome',
    });

  expect(status).toBe(200);
  expect(text).toBe('chatbot is awesome');
});

it('should handle token verification if verify token is passed in bot ', async () => {
  const verifyToken = '1qaz2wsx';
  const { bot } = setup({ platform: 'messenger', verifyToken });
  const server = createServer(bot);
  const { status, text } = await request(server)
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
  const { status } = await request(server)
    .get('/')
    .query({
      'hub.mode': 'subscribe',
      'hub.verify_token': verifyToken,
      'hub.challenge': 'chatbot is awesome',
    });

  expect(status).toBe(405);
});

it('should handle bot request', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status } = await request(server)
    .post('/')
    .send({});

  expect(status).toBe(200);
});

it('should handle x-www-form-urlencoded request', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  const verifyToken = '1qaz2wsx';
  const server = createServer(bot, { verifyToken });
  const { status } = await request(server)
    .post('/')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({});

  expect(status).toBe(200);
  expect(parseUrlencoded).toBeCalled();
});
