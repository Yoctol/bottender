import Bot from '../Bot';

function setup({
  connector = {
    platform: 'any',
    getUniqueSessionIdFromRequest: jest.fn(),
    shouldSessionUpdate: jest.fn(),
    updateSession: jest.fn(),
    mapRequestToEvents: jest.fn(() => [{}]),
    createContext: jest.fn(() => ({})),
  },
  sessionStore = {
    init: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  },
  sync = false,
}) {
  const bot = new Bot({ connector, sessionStore, sync });

  return {
    bot,
    connector,
    sessionStore,
  };
}

describe('#connector', () => {
  it('can be access', () => {
    const { bot, connector } = setup({});
    expect(bot.connector).toBe(connector);
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

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    connector.shouldSessionUpdate.mockReturnValue(true);
    sessionStore.read.mockReturnValue(Promise.resolve(null));

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
      getUniqueSessionIdFromRequest: jest.fn(),
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session })),
    };

    const { bot, sessionStore } = setup({ connector });

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    sessionStore.read.mockReturnValue(Promise.resolve(session));

    const handler = jest.fn();
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(handler).toBeCalledWith(
      expect.objectContaining({
        session: { platform: 'any', user: {}, id: 'any:__id__' },
      })
    );
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
      getUniqueSessionIdFromRequest: jest.fn(),
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => context),
    };

    const { bot, sessionStore } = setup({ connector, sync: true });

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    sessionStore.read.mockReturnValue(Promise.resolve(session));

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

  it('should call handler without session if unique session id is null', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionIdFromRequest: jest.fn(),
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionIdFromRequest.mockReturnValue(null);

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

  it('should call write on sessionStore', async () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1504514594622);
    const event = {};
    const session = { user: {} };
    const connector = {
      platform: 'any',
      getUniqueSessionIdFromRequest: jest.fn(),
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session })),
    };

    const { bot, sessionStore } = setup({ connector });

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    sessionStore.read.mockReturnValue(Promise.resolve(session));

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    await requestHandler({});
    await Promise.resolve();

    expect(sessionStore.write).toBeCalledWith('any:__id__', {
      id: 'any:__id__',
      platform: 'any',
      user: {},
      lastActivity: Date.now(),
    });
    Date.now = _now;
  });
});

describe('#extendContext', () => {
  it('can extend function to context', async () => {
    const event = {};
    const connector = {
      platform: 'any',
      getUniqueSessionIdFromRequest: jest.fn(),
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => ({ event, session: undefined })),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');

    const monkeyPatchFn = jest.fn();

    bot.extendContext(context => {
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
