import request from 'supertest';

import createServer from '../createServer';

function setup({ platform }) {
  const requestHandler = jest.fn();
  const bot = {
    createRequestHandler: () => requestHandler,
    connector: {
      platform,
      verifyToken: '1qaz2wsx',
      verifySignature: jest.fn(),
      preprocess: jest.fn(),
    },
  };
  return {
    bot,
    requestHandler,
  };
}

it('should respond accordingly if shouldNext = false', async () => {
  const { bot } = setup({ platform: 'messenger' });
  bot.connector.preprocess.mockReturnValue({
    shouldNext: false,
    response: {
      status: 200,
      body: 'chatbot is awesome',
    },
  });

  const server = createServer(bot);
  const { status, text } = await request(server.callback())
    .get('/')
    .query({
      'hub.mode': 'subscribe',
      'hub.verify_token': bot.connector.verifyToken,
      'hub.challenge': 'chatbot is awesome',
    });

  expect(status).toBe(200);
  expect(text).toBe('chatbot is awesome');
});

it('should handle bot request if shouldNext = true', async () => {
  const { bot, requestHandler } = setup({ platform: 'messenger' });
  bot.connector.preprocess.mockReturnValue({
    shouldNext: true,
  });
  requestHandler.mockResolvedValue();

  const server = createServer(bot);
  const { status } = await request(server.callback())
    .post('/')
    .send({});

  expect(status).toBe(200);
});
