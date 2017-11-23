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
  requestHandler.mockReturnValue(Promise.resolve());

  const middleware = createMiddleware(bot);

  const req = { body: {} };
  const res = {
    send: jest.fn(),
    status: jest.fn(),
  };

  await middleware(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith('');
});

it('should response 200 if there is response return from requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockReturnValue(Promise.resolve({}));

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
  requestHandler.mockReturnValue(
    Promise.resolve({
      status: 400,
      headers: {
        'X-Header': 'x',
      },
      body: {
        name: 'x',
      },
    })
  );

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
  requestHandler.mockReturnValue(Promise.resolve());

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
