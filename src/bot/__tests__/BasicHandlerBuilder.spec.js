import BasicHandlerBuilder from '../BasicHandlerBuilder';

const setup = () => {
  const builder = new BasicHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(BasicHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(BasicHandlerBuilder);
  });
});

describe('#before', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.before(handler)).toBe(builder);
  });

  it('should run every time', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    let i = 1;
    builder
      .before(handler)
      .on(
        () => i === 1,
        () => {
          i += 1;
        }
      )
      .on(
        () => i === 2,
        () => {
          i += 1;
        }
      )
      .onEvent(() => {});
    const rootHandler = builder.build();
    const context = {};
    await rootHandler(context);
    await rootHandler(context);
    await rootHandler(context);
    expect(handler).toHaveBeenCalledTimes(3);
  });

  it('should support multiple before handlers', async () => {
    const { builder } = setup();
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    let i = 1;
    builder
      .before(handler1)
      .before(handler2)
      .on(
        () => i === 1,
        () => {
          i += 1;
        }
      )
      .on(
        () => i === 2,
        () => {
          i += 1;
        }
      )
      .onEvent(() => {});
    const rootHandler = builder.build();
    const context = {};
    await rootHandler(context);
    await rootHandler(context);
    await rootHandler(context);
    expect(handler1).toHaveBeenCalledTimes(3);
    expect(handler2).toHaveBeenCalledTimes(3);
  });
});

describe('#beforeMessage', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.beforeMessage(handler)).toBe(builder);
  });

  it('should run before any message received', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    builder.beforeMessage(handler).onEvent(() => {});
    const rootHandler = builder.build();
    const contextWithMessageEvent = {
      event: {
        isMessage: true,
      },
    };
    const contextWithNotMessageEvent = {
      event: {
        isMessage: false,
      },
    };
    await rootHandler(contextWithMessageEvent);
    await rootHandler(contextWithNotMessageEvent);
    await rootHandler(contextWithMessageEvent);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('should support multiple beforeMessage handlers', async () => {
    const { builder } = setup();
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    builder.beforeMessage(handler1).beforeMessage(handler2).onEvent(() => {});
    const rootHandler = builder.build();
    const contextWithMessageEvent = {
      event: {
        isMessage: true,
      },
    };
    const contextWithNotMessageEvent = {
      event: {
        isMessage: false,
      },
    };
    await rootHandler(contextWithMessageEvent);
    await rootHandler(contextWithNotMessageEvent);
    await rootHandler(contextWithMessageEvent);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);
  });
});

describe('#on', () => {
  it('should return this', () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(builder.on(predicate, handler)).toBe(builder);
  });

  it('should receive context pass from builder in predicate and handler function', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler if predicate function return true', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler if predicate function return false', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => false);
    const handler = jest.fn();
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  it('should not call handler if predicate return Promise.resolve(false)', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => Promise.resolve(false));
    const handler = jest.fn();
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  it('should not call handler if predicate function not return boolean type', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => 'NotBooleanType');
    const handler = jest.fn();
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  it('should not call second predicate if already found a match predicate', async () => {
    const { builder } = setup();
    const context = {};
    const predicate1 = jest.fn(() => true);
    const predicate2 = jest.fn(() => true);
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    builder.on(predicate1, handler1).on(predicate2, handler2);
    await builder.build()(context);
    expect(handler1).toBeCalledWith(context);
    expect(predicate2).not.toBeCalled();
    expect(handler2).not.toBeCalled();
  });

  it('should support async predicate and handler function', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => Promise.resolve(true));
    const handler = jest.fn(() => Promise.resolve());
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should support string as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    const predicate = jest.fn(() => Promise.resolve(true));
    builder.on(predicate, '處理到');
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(context.sendText).toBeCalledWith('處理到');
  });

  it('should support array as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    const predicate = jest.fn(() => Promise.resolve(true));
    builder.on(predicate, ['處理到', '完成']);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(context.sendText).toBeCalledWith(expect.stringMatching(/處理到|完成/));
  });
});

describe('#onEvent', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.onEvent(handler)).toBe(builder);
  });

  it('should call fallback handler if can not find a match predicate', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => false);
    const handler = jest.fn();
    const fallbackHandler = jest.fn();
    builder.on(predicate, handler).onEvent(fallbackHandler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context);
  });

  it('should support async handler', async () => {
    const { builder } = setup();
    const context = {};
    const handler = jest.fn(() => Promise.resolve());
    builder.onEvent(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should support string as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    builder.onEvent('沒處理到');
    await builder.build()(context);
    expect(context.sendText).toBeCalledWith('沒處理到');
  });

  it('should support array as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    builder.onEvent(['沒處理到', '漏掉了']);
    await builder.build()(context);
    expect(context.sendText).toBeCalledWith(expect.stringMatching(/沒處理到|漏掉了/));
  });
});

describe('#onError', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.onError(handler)).toBe(builder);
  });

  it('should call error handler when error be thrown', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    builder
      .onEvent(() => {
        throw new Error('Boom!');
      })
      .onError(ctx => {
        ctx.sendText('Boom!');
      });
    await builder.build()(context);
    expect(context.sendText).toBeCalledWith('Boom!');
  });

  it('should call error handler when error thrown from child handler', async () => {
    const { builder } = setup();
    const { builder: builder2 } = setup();
    const context = {
      sendText: jest.fn(),
    };
    builder2.onEvent(() => {
      throw new Error('Boom!');
    });

    builder.onEvent(builder2.build()).onError(ctx => {
      ctx.sendText('Boom!');
    });
    await builder.build()(context);
    expect(context.sendText).toBeCalledWith('Boom!');
  });

  it('should pass error as second argument to error handler when error be thrown', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    const error = new Error('Boom!');
    const errorHandler = jest.fn();
    builder
      .onEvent(() => {
        throw error;
      })
      .onError(errorHandler);
    await builder.build()(context);

    expect(errorHandler).toBeCalledWith(context, error);
  });
});

describe('#build', () => {
  it('should return a function', () => {
    const { builder } = setup();
    expect(builder.build()).toBeInstanceOf(Function);
  });
});
