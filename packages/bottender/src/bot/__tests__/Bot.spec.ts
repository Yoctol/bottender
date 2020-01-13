import Bot from '../Bot';
import Context from '../../context/Context';

function setup({
  connector = {
    platform: 'any',
    getUniqueSessionKey: jest.fn(),
    updateSession: jest.fn(),
    mapRequestToEvents: jest.fn(() => [{}]),
    createContext: jest.fn(() => ({})),
    customAccessToken: 'anyToken',
  },
  sessionStore = {
    init: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  },
  sync = true,
  mapPageToAccessToken,
}) {
  const bot = new Bot({ connector, sessionStore, sync, mapPageToAccessToken });

  return {
    bot,
    connector,
    sessionStore,
    mapPageToAccessToken,
  };
}

beforeEach(() => {
  console.error = jest.fn();
});

describe('#connector', () => {
  it('can be access', () => {
    const { bot, connector } = setup({});
    expect(bot.connector).toBe(connector);
  });
});

describe('#sessions', () => {
  it('can be access', () => {
    const { bot, sessionStore } = setup({});
    expect(bot.sessions).toBe(sessionStore);
  });
});

describe('#handler', () => {
  it('can be access', () => {
    const { bot } = setup({});

    expect(bot.handler).toBeNull();

    const handler = () => {};
    bot.onEvent(handler);
    expect(bot.handler).toBe(handler);
  });
});

describe('#createRequestHandler', () => {
  it('throw when no handler', () => {
    const { bot } = setup({});
    expect(() => bot.createRequestHandler()).toThrow();
  });

  it('throw when call without request body', async () => {
    const { bot } = setup({});

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();
    let error;
    try {
      await requestHandler();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should call updateSession with session and body', async () => {
    const { bot, connector, sessionStore } = setup({});

    connector.getUniqueSessionKey.mockReturnValue('__id__');
    sessionStore.read.mockResolvedValue(null);

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(connector.updateSession).toBeCalledWith(expect.any(Object), body);
  });

  it('should call handler', async () => {
    const event = {};
    const session = { user: {} };
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session })),
    };

    const { bot, sessionStore } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue('__id__');
    sessionStore.read.mockResolvedValue(session);

    let receivedContext;
    const Action = context => {
      receivedContext = context;
    };
    bot.onEvent(Action);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(receivedContext).toEqual({
      event: {},
      isSessionWritten: true,
      session: expect.objectContaining({
        id: 'any:__id__',
        platform: 'any',
        user: {},
        lastActivity: expect.any(Number),
      }),
    });
  });

  it('should return response in sync mode', async () => {
    const event = {};
    const session = { user: {} };
    const context = {
      event,
      session,
      response: {
        status: 200,
        headers: {},
        body: null,
      },
    };
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => context),
    };

    const { bot, sessionStore } = setup({ connector, sync: true });

    connector.getUniqueSessionKey.mockReturnValue('__id__');
    sessionStore.read.mockResolvedValue(session);

    const handler = ({ response }) => {
      response.status = 200;
      response.headers = {
        'X-Header': 'x',
      };
      response.body = {
        name: 'x',
      };
    };
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    const response = await requestHandler(body);

    expect(response).toEqual({
      status: 200,
      headers: {
        'X-Header': 'x',
      },
      body: {
        name: 'x',
      },
    });
  });

  it('should throw error if no handler after createRequestHandler', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector, sync: true });

    connector.getUniqueSessionKey.mockReturnValue(null);

    bot.onEvent(() => {});
    const requestHandler = bot.createRequestHandler();
    bot._handler = null;

    let error;
    try {
      await requestHandler({});
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should call handler without session if unique session id is null', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue(null);

    let receivedContext;
    const Action = context => {
      receivedContext = context;
    };
    bot.onEvent(Action);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(receivedContext).toEqual(
      expect.objectContaining({
        session: undefined,
      })
    );
  });

  it('should handle error thrown by async handler', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: 123456 })),
    };

    const { bot } = setup({ connector, sync: true });

    connector.getUniqueSessionKey.mockReturnValue(null);

    const handler = jest.fn(async () => {
      throw new Error('async handler error');
    });
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    let error;
    try {
      await requestHandler(body);
    } catch (err) {
      error = err;
    }

    expect(handler).toBeCalled();
    expect(error).toBeUndefined();
  });

  it('should handle error thrown by sync handler', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: 123456 })),
    };

    const { bot } = setup({ connector, sync: true });

    connector.getUniqueSessionKey.mockReturnValue(null);

    const handler = jest.fn(() => {
      throw new Error('sync handler error');
    });
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    let error;
    try {
      await requestHandler(body);
    } catch (err) {
      error = err;
    }

    expect(handler).toBeCalled();
    expect(error).toBeUndefined();
  });

  it('should call write on sessionStore', async () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1504514594622);
    const event = {};
    const session = { user: {} };
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session })),
    };

    const { bot, sessionStore } = setup({ connector, sync: true });

    connector.getUniqueSessionKey.mockReturnValue('__id__');
    sessionStore.read.mockResolvedValue(session);

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    await requestHandler({});

    expect(sessionStore.write).toBeCalledWith('any:__id__', {
      id: 'any:__id__',
      platform: 'any',
      user: {},
      lastActivity: Date.now(),
    });
    Date.now = _now;
  });

  it('should work with multiple events in one request', async () => {
    const event1 = {};
    const event2 = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event1, event2]),
      createContext: jest.fn(({ event, session }) => ({ event, session })),
    };
    const { bot, sessionStore } = setup({ connector });

    connector.getUniqueSessionKey
      .mockReturnValueOnce('1')
      .mockReturnValueOnce('2');
    sessionStore.read.mockResolvedValue(null);

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(sessionStore.read).toBeCalledWith('any:1');
    expect(sessionStore.read).toBeCalledWith('any:2');

    expect(connector.getUniqueSessionKey).toBeCalledWith(event1, undefined);
    expect(connector.getUniqueSessionKey).toBeCalledWith(event2, undefined);

    expect(connector.createContext).toBeCalledWith(
      expect.objectContaining({
        event: event1,
        session: expect.objectContaining({ id: 'any:1', platform: 'any' }),
      })
    );
    expect(connector.createContext).toBeCalledWith(
      expect.objectContaining({
        event: event2,
        session: expect.objectContaining({ id: 'any:2', platform: 'any' }),
      })
    );

    expect(connector.updateSession).toBeCalledWith(expect.any(Object), body);
    expect(connector.updateSession).toBeCalledWith(expect.any(Object), body);

    expect(sessionStore.write).toBeCalledWith('any:1', {
      id: 'any:1',
      platform: 'any',
      lastActivity: expect.any(Number),
    });
    expect(sessionStore.write).toBeCalledWith('any:2', {
      id: 'any:2',
      platform: 'any',
      lastActivity: expect.any(Number),
    });
  });
});

describe('#use', () => {
  it('should return this', () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    expect(bot.use(() => {})).toBe(bot);
  });

  it('can extend function to context', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue('__id__');

    const monkeyPatchFn = jest.fn();

    bot.use(context => {
      context.monkeyPatchFn = monkeyPatchFn;
    });

    const handler = context => context.monkeyPatchFn();
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(monkeyPatchFn).toBeCalled();
  });
});

describe('#onEvent', () => {
  it('should return this', () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    expect(bot.onEvent(() => {})).toBe(bot);
  });
});

describe('#onError', () => {
  it('should catch thrown handler error', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: ({ emitter }) =>
        new Context({ event, session: undefined, emitter }),
    };

    const { bot } = setup({ connector });

    let receivedError;
    let receivedContext;

    const promise = new Promise(resolve => {
      bot
        .onEvent(() => {
          throw new Error('boom');
        })
        .onError((context, { error }) => {
          receivedError = error;
          receivedContext = context;
          resolve();
        });
    });

    const requestHandler = bot.createRequestHandler();

    await requestHandler({});

    await promise;

    expect(receivedError).toBeInstanceOf(Error);
    expect(receivedContext).toBeInstanceOf(Context);
  });

  it('should return this', () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    expect(bot.onError(() => {})).toBe(bot);
  });
});

describe('#setInitialState', () => {
  it('should return this', () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    expect(bot.setInitialState({})).toBe(bot);
  });

  it('initialState should be passed to createContext', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue('__id__');

    bot.setInitialState({
      a: 1,
      b: {
        x: 2,
      },
    });

    bot.onEvent(() => {});

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(connector.createContext).toBeCalledWith(
      expect.objectContaining({
        initialState: {
          a: 1,
          b: {
            x: 2,
          },
        },
      })
    );
  });
});

describe('request context', () => {
  it('requestContext should be passed to createContext', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue('__id__');

    bot.onEvent(() => {});

    const requestHandler = bot.createRequestHandler();

    const body = {};
    const requestContext = { req: {}, res: {} };
    await requestHandler(body, requestContext);

    expect(connector.createContext).toBeCalledWith(
      expect.objectContaining({
        requestContext,
      })
    );
  });
});

describe('context lifecycle', () => {
  it('should call context.handlerDidEnd when it exists', async () => {
    const event = {};
    const handlerDidEnd = jest.fn();
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({
        event,
        session: undefined,
        handlerDidEnd,
      })),
    };

    const { bot } = setup({ connector, sync: true });

    connector.getUniqueSessionKey.mockReturnValue('__id__');

    bot.onEvent(() => {});

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(handlerDidEnd).toBeCalled();
  });
});
