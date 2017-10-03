import Handler from '../Handler';

const setup = () => {
  const builder = new Handler();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(Handler).toBeDefined();
    expect(builder).toBeInstanceOf(Handler);
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

  it('should work with handler instance', async () => {
    const { builder } = setup();
    const context = {};
    const predicate = jest.fn(() => Promise.resolve(true));
    const cb = jest.fn(() => Promise.resolve());
    const handler = new Handler().on(predicate, cb);
    builder.on(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(cb).toBeCalledWith(context);
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
});

describe('#onMessage', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onMessage(predicate, handler)).toBe(builder);
  });

  it('should call predicate when received message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
      },
    };
    builder.onMessage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: false,
      },
    };
    builder.onMessage(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalledWith(context);
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => Promise.resolve(false));
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
      },
    };
    builder.onMessage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onText', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onText('text', handler)).toBe(builder);
  });

  describe('should support catch all handler', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            id: '325708',
            type: 'text',
            text: 'awesome',
          },
        },
      };
      builder.onText(handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: false,
          isTextMessage: false,
        },
      };
      builder.onText(handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support string', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            id: '325708',
            type: 'text',
            text: 'awesome',
          },
        },
      };
      builder.onText('awesome', handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            text: 'awesome',
          },
        },
      };
      builder.onText('awful', handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });

    it('not match with different message type', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isImageMessage: true,
          message: {
            id: '325708',
            type: 'image',
          },
        },
      };
      builder.onText('awful', handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support regex', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            text: 'awesome',
          },
        },
      };

      builder.onText(/awesome/, handler);

      await builder.build()(context);

      const match = ['awesome'];
      match.index = 0;
      match.input = 'awesome';

      expect(handler).toBeCalledWith(context, match);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            text: 'awesome',
          },
        },
      };
      builder.onText(/awful/, handler);

      await builder.build()(context);

      expect(handler).not.toBeCalled();
    });
  });
});

describe('#onUnhandled', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.onUnhandled(handler)).toBe(builder);
  });

  it('should be call when context is not handled', async () => {
    const { builder } = setup();
    const handler = jest.fn();

    const rootHandler = builder.onUnhandled(handler).build();

    const context = {
      handled: false,
    };

    await rootHandler(context);

    expect(handler).toBeCalledWith(context);
  });

  it('should not be call when context was handled', async () => {
    const { builder } = setup();
    const handler = jest.fn();

    const rootHandler = builder.onUnhandled(handler).build();

    const context = {
      handled: true,
    };

    await rootHandler(context);

    expect(handler).not.toBeCalledWith(context);
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
