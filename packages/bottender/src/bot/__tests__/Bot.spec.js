import Bot from '../Bot';
import Context from '../../context/Context';

function setup({
  connector = {
    platform: 'any',
    getUniqueSessionKey: jest.fn(),
    shouldSessionUpdate: jest.fn(),
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
  sync = false,
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
    connector.shouldSessionUpdate.mockReturnValue(true);
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
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session })),
    };

    const { bot, sessionStore } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue('__id__');
    sessionStore.read.mockResolvedValue(session);

    const handler = jest.fn();
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(handler).toBeCalledWith({
      event: {},
      session: expect.objectContaining({
        id: 'any:__id__',
        platform: 'any',
        user: {},
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue(null);

    const handler = jest.fn();
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(handler).toBeCalledWith(
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
});

describe('#use', () => {
  it('should return this', () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
        .onError((err, context) => {
          receivedError = err;
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

  it('should receive emitted error and context', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionKey: jest.fn(),
      shouldSessionUpdate: jest.fn(),
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
        .onEvent(context => {
          context.emitError(new Error('boom'));
        })
        .onError((err, context) => {
          receivedError = err;
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
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
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({
        event,
        session: undefined,
        handlerDidEnd,
      })),
      handlerDidEnd: jest.fn(),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionKey.mockReturnValue('__id__');

    bot.onEvent(() => {});

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(handlerDidEnd).toBeCalled();
  });
});
