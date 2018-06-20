import createMiddleware from '../createMiddleware';

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

it('should response 200 when no error be thrown', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const request = { body: {} };
  const response = {};

  await middleware({ request, response });

  expect(response.status).toBe(200);
});

it('should merge query and body then pass into requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const request = {
    query: { a: '1' },
    body: { b: 2 },
  };
  const response = {};
  const ctx = { request, response };

  await middleware(ctx);

  expect(requestHandler).toBeCalledWith({ a: '1', b: 2 }, ctx);
});

it('should overwrite query value if this key exists in body', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const request = {
    query: { a: '1' },
    body: { a: 2 },
  };
  const response = {};
  const ctx = { request, response };

  await middleware(ctx);

  expect(requestHandler).toBeCalledWith({ a: 2 }, ctx);
});

it('should response 200 if there is response return from requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue({});

  const middleware = createMiddleware(bot);

  const request = { body: {} };
  const response = {
    set: jest.fn(),
  };

  await middleware({ request, response });

  expect(response.set).toBeCalledWith({});
  expect(response.status).toBe(200);
  expect(response.body).toBe('');
});

it('should overwrite response when provided', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue({
    status: 400,
    headers: {
      'X-Header': 'x',
    },
    body: {
      name: 'x',
    },
  });

  const middleware = createMiddleware(bot);

  const request = { body: {} };
  const response = {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
    set: fields => Object.assign(response.headers, fields),
  };

  await middleware({ request, response });

  expect(response.status).toBe(400);
  expect(response.headers).toEqual({
    'X-Header': 'x',
    'content-type': 'text/plain; charset=utf-8',
  });
  expect(response.body).toEqual({
    name: 'x',
  });
});

it('should throw when no body exists', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const request = {};
  const response = {};

  let error;
  try {
    await middleware({ request, response });
  } catch (err) {
    error = err;
  }

  expect(error).toBeDefined();
  expect(error.message).toMatch(/Missing query and body/);
});
