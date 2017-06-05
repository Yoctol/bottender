import Bot from '../Bot';

function setup(
  connector = {
    platform: 'yoctol',
    hasHandler: true,
    setHandler: jest.fn(),
    getSenderIdFromRequest: jest.fn(() => 'SENDER_ID'),
    getUserProfile: jest.fn(),
    handleRequest: jest.fn(),
  }
) {
  const logs = {
    insert: jest.fn(),
  };
  const users = {
    findOne: jest.fn(),
    insert: jest.fn(),
  };
  const bot = new Bot({
    id: 'fake-id',
    filePath: 'fake://',
    connector,
  });

  return {
    bot,
    connector,
    logs,
    users,
  };
}

describe('#connector', () => {
  it('can be access', () => {
    const { bot, connector } = setup();
    expect(bot.connector).toBe(connector);
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

  // FIXME: sessionManager
  xit('call getSenderIdFromRequest with request', async () => {
    const { bot, connector } = setup();
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        session: {},
        existed: true,
      })
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(connector.getSenderIdFromRequest).toBeCalledWith(request);
  });

  // FIXME: sessionManager
  xit('call getUserProfile when session not existed', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({}));
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        session: {},
        existed: false,
      })
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(connector.getUserProfile).toBeCalledWith('SENDER_ID');
  });

  // FIXME: sessionManager
  xit('call createSessionDataIfNotExists with seeder id', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        session: {},
        existed: false,
      })
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(bot.sessionManager.createSessionDataIfNotExists).toBeCalledWith(
      'yoctol:SENDER_ID'
    );
  });

  // FIXME: sessionManager
  xit('call handleRequest', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    const session = {};
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        session,
        existed: false,
      })
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(connector.handleRequest).toBeCalledWith({
      request,
      session,
    });
  });

  // FIXME: sessionManager
  xit('call saveSessionData', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    const session = {};
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        session,
        existed: false,
      })
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(bot.sessionManager.saveSessionData).toBeCalledWith(
      'yoctol:SENDER_ID',
      session
    );
  });

  // FIXME: sessionManager
  xit('should response status 200', async () => {
    const { bot, connector } = setup();
    connector.getUserProfile.mockReturnValue(Promise.resolve({ data: {} }));
    bot.sessionManager.createSessionDataIfNotExists.mockReturnValue(
      Promise.resolve({
        session: {},
        existed: false,
      })
    );
    const middleware = bot.createKoaMiddleware();
    const request = {};
    const response = {};
    await middleware({ request, response });
    expect(response.status).toBe(200);
  });
});

xdescribe('#createExpressMiddleware', () => {
  // FIXME: createExpressMiddleware
});
