import Bot from '../Bot';

function setup({
  connector = {
    platform: 'any',
    getUniqueSessionIdFromRequest: jest.fn(),
    shouldSessionUpdate: jest.fn(),
    updateSession: jest.fn(),
    handleRequest: jest.fn(() => Promise.resolve(true)),
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

  it('should fetch user data when it does not exist in session', async () => {
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

  it('should not fetch user data when it exists in session', async () => {
    const { bot, connector, sessionStore } = setup({});

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    connector.shouldSessionUpdate.mockReturnValue(false);
    sessionStore.read.mockReturnValue(Promise.resolve({ user: {} }));

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    await requestHandler({});

    expect(connector.updateSession).not.toBeCalled();
  });

  it('should call handleRequest on connector', async () => {
    const { bot, connector, sessionStore } = setup({});

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    sessionStore.read.mockReturnValue(Promise.resolve({ user: {} }));

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    const body = {};
    await requestHandler(body);

    expect(connector.handleRequest).toBeCalledWith(
      expect.objectContaining({
        body,
        session: { user: {} },
        handler,
      })
    );
  });

  it('should call write on sessionStore', async () => {
    const { bot, connector, sessionStore } = setup({});

    connector.getUniqueSessionIdFromRequest.mockReturnValue('__id__');
    sessionStore.read.mockReturnValue(Promise.resolve({ user: {} }));

    const handler = () => {};
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    await requestHandler({});

    expect(sessionStore.write).toBeCalledWith(
      'any:__id__',
      { user: {} },
      525600
    );
  });
});
