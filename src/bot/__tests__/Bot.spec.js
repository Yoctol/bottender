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
}) {
  const bot = new Bot({ connector, sessionStore });

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
        session: { user: {} },
      })
    );
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

    expect(sessionStore.write).toBeCalledWith(
      'any:__id__',
      { user: {} },
      525600
    );
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

describe('#setMessageDelay', () => {
  it('can setMessageDelay on context', async () => {
    const event = {};
    const context = {
      event,
      session: undefined,
      setMessageDelay: jest.fn(),
    };
    const connector = {
      platform: 'any',
      getUniqueSessionIdFromRequest: jest.fn(),
      shouldSessionUpdate: jest.fn(),
      updateSession: jest.fn(),
      mapRequestToEvents: jest.fn(() => [event]),
      createContext: jest.fn(() => context),
    };

    const { bot } = setup({ connector });

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');

    bot.setMessageDelay(5000);

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(context.setMessageDelay).toBeCalledWith(5000);
  });
});
