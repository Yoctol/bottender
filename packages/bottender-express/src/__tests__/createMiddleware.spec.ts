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

  const req = { body: {} };
  const res = {
    send: jest.fn(),
    status: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith('');
  expect(next).not.toBeCalled();
});

it('should merge query and body then pass into requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const req = {
    method: 'post',
    path: '/',
    query: { a: '1' },
    body: { b: 2 },
    headers: {},
  };
  const res = {
    send: jest.fn(),
    status: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(requestHandler).toBeCalledWith(
    { a: '1', b: 2 },
    {
      method: 'post',
      path: '/',
      query: { a: '1' },
      headers: {},
    }
  );
});

it('should overwrite query value if this key exists in body', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const req = {
    method: 'post',
    path: '/',
    query: { a: '1' },
    body: { a: 2 },
    headers: {},
  };
  const res = {
    send: jest.fn(),
    status: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(requestHandler).toBeCalledWith(
    { a: 2 },
    {
      method: 'post',
      path: '/',
      query: { a: '1' },
      headers: {},
    }
  );
});

it('should response 200 if there is response return from requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue({});

  const middleware = createMiddleware(bot);

  const req = { body: {} };
  const res = {
    set: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };

  await middleware(req, res);

  expect(res.set).toBeCalledWith({});
  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith('');
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

  const req = { body: {} };
  const res = {
    set: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };

  await middleware(req, res);

  expect(res.set).toBeCalledWith({ 'X-Header': 'x' });
  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledWith({ name: 'x' });
});

it('should throw when no body exists', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const req = {};
  const res = {};
  const next = jest.fn();

  await middleware(req, res, next);

  expect(next).toBeCalled();
  const error = next.mock.calls[0][0];

  expect(error).toBeDefined();
  expect(error.message).toMatch(/Missing query and body/);
});

it('should catch error when requestHandler error', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockRejectedValue(new Error('requestHandler error'));

  const middleware = createMiddleware(bot);

  const req = { body: {} };
  const res = {};
  const next = jest.fn();

  await middleware(req, res, next);

  expect(next).toBeCalled();
  const error = next.mock.calls[0][0];

  expect(error).toBeDefined();
  expect(error.message).toMatch(/requestHandler error/);
});
