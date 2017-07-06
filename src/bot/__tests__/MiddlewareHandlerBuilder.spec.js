import MiddlewareHandlerBuilder from '../MiddlewareHandlerBuilder';

const setup = () => {
  const builder = new MiddlewareHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(MiddlewareHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(MiddlewareHandlerBuilder);
  });
});

describe('#use', () => {
  it('should return this', () => {
    const { builder } = setup();
    const middleware = () => {};
    expect(builder.use(middleware)).toBe(builder);
  });

  it('should let middleware to be called', () => {
    const { builder } = setup();
    const middleware = jest.fn();

    builder.use(middleware);

    const handler = builder.build();

    const context = {};
    handler(context);

    expect(middleware).toBeCalled();
  });

  it('should let middleware to be called with context and next middleware', () => {
    const { builder } = setup();
    const middleware1 = jest.fn((middleware, next) => next());
    const middleware2 = jest.fn();

    builder.use(middleware1).use(middleware2);

    const handler = builder.build();

    const context = {};
    handler(context);

    expect(middleware1.mock.calls[0][0]).toBe(context);
    expect(middleware2.mock.calls[0][0]).toBe(context);
  });

  it('should work with 5 middleware', () => {
    const { builder } = setup();
    const middleware1 = jest.fn((middleware, next) => next());
    const middleware2 = jest.fn((middleware, next) => next());
    const middleware3 = jest.fn((middleware, next) => next());
    const middleware4 = jest.fn((middleware, next) => next());
    const middleware5 = jest.fn((middleware, next) => next());

    builder
      .use(middleware1)
      .use(middleware2)
      .use(middleware3)
      .use(middleware4)
      .use(middleware5);

    const handler = builder.build();

    const context = {};
    handler(context);

    expect(middleware1.mock.calls[0][0]).toBe(context);
    expect(middleware2.mock.calls[0][0]).toBe(context);
    expect(middleware3.mock.calls[0][0]).toBe(context);
    expect(middleware4.mock.calls[0][0]).toBe(context);
    expect(middleware5.mock.calls[0][0]).toBe(context);
  });

  it('should work with async middleware', async () => {
    const { builder } = setup();
    const middleware1 = jest.fn((context, next) =>
      Promise.resolve().then(next)
    );
    const middleware2 = jest.fn();

    builder.use(middleware1).use(middleware2);

    const handler = builder.build();

    const context = {};
    await handler(context);

    expect(middleware1.mock.calls[0][0]).toBe(context);
    expect(middleware2.mock.calls[0][0]).toBe(context);
  });
});

describe('#build', () => {
  it('should return a function', () => {
    const { builder } = setup();
    expect(builder.build()).toBeInstanceOf(Function);
  });
});
