import Bot from '../Bot';

function setup(
  connector = {
    hasHandler: true,
    setHandler: jest.fn(),
    getSenderIdFromRequest: jest.fn(() => 'SENDER_ID'),
    getUserProfile: jest.fn(),
    handleRequest: jest.fn(),
  },
) {
  const bot = new Bot({
    id: 'fake-id',
    filePath: 'fake://',
    connector,
  });
  bot.sessionManager.init = jest.fn();
  bot.sessionManager.createSessionDataIfNotExists = jest.fn();
  bot.sessionManager.saveSessionData = jest.fn();
  return {
    bot,
    connector,
  };
}

describe('#connector', () => {
  it('can be access', () => {
    const { bot, connector } = setup();
    expect(bot.connector).toBe(connector);
  });
});

describe('#sessionManager', () => {
  it('can be access', () => {
    const { bot } = setup();
    expect(bot.sessionManager).toBeDefined();
  });
});

describe('#handle', () => {
  it('can be access', () => {
    const { bot, connector } = setup();
    const handler = () => {};
    bot.handle(handler);
    expect(connector.setHandler).toBeCalledWith(handler);
  });
});

describe('#createKoaMiddleware', () => {
  it('throw when no handler', () => {
    const { bot } = setup({});
    expect(() => bot.createKoaMiddleware()).toThrow();
  });

  it('init session manager when first request', async () => {
    const { bot } = setup();
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData: {},
        existed: true,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(bot.sessionManager.init).toBeCalled();
  });

  it('call getSenderIdFromRequest with request', async () => {
    const { bot, connector } = setup();
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData: {},
        existed: true,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(connector.getSenderIdFromRequest).toBeCalledWith(request);
  });

  it('call getUserProfile when session not existed', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData: {},
        existed: false,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(connector.getUserProfile).toBeCalledWith('SENDER_ID');
  });

  it('call createSessionDataIfNotExists with seeder id', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData: {},
        existed: false,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(bot.sessionManager.createSessionDataIfNotExists).toBeCalledWith(
      'SENDER_ID',
    );
  });

  it('call handleRequest', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    const sessionData = {};
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData,
        existed: false,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(connector.handleRequest).toBeCalledWith({
      request,
      sessionData,
      db: expect.any(Object),
    });
  });

  it('call saveSessionData', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    const sessionData = {};
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData,
        existed: false,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(bot.sessionManager.saveSessionData).toBeCalledWith(
      'SENDER_ID',
      sessionData,
    );
  });

  it('should response status 200', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        sessionData: {},
        existed: false,
      }),
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(response.status).toBe(200);
  });
});
