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
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(res.send).toBeCalledWith(200);
  expect(next).toBeCalled();
});

it('should merge query and body then pass into requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const req = {
    query: { a: '1' },
    body: { b: 2 },
  };
  const res = {
    send: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(requestHandler).toBeCalledWith({ a: '1', b: 2 });
});

it('should overwrite query value if this key exists in body', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const req = {
    query: { a: '1' },
    body: { a: 2 },
  };
  const res = {
    send: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(requestHandler).toBeCalledWith({ a: 2 });
});

it('should response 200 if there is response return from requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue({ headers: {} });

  const middleware = createMiddleware(bot);

  const req = { body: {} };
  const res = {
    send: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(res.send).toBeCalledWith(200, '', {});
  expect(next).toBeCalled();
});

it('should overwrite response when provide', async () => {
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
    send: jest.fn(),
  };
  const next = jest.fn();

  await middleware(req, res, next);

  expect(res.send).toBeCalledWith(400, { name: 'x' }, { 'X-Header': 'x' });
  expect(next).toBeCalled();
});

it('should throw when no body exists', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockResolvedValue();

  const middleware = createMiddleware(bot);

  const req = {};
  const res = {};

  let error;
  try {
    await middleware(req, res);
  } catch (err) {
    error = err;
  }

  expect(error).toBeDefined();
  expect(error.message).toMatch(/Missing body parser/);
});
