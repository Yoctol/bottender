import MessengerBot from '../MessengerBot';

jest.mock('../../api/FBGraphAPIClient');

const FBGraphAPIClient = require('../../api/FBGraphAPIClient').default;

const request = {
  body: {
    object: 'page',
    entry: [
      {
        id: '1895382890692545',
        time: 1486464322257,
        messaging: [
          {
            sender: {
              id: '1412611362105802',
            },
            recipient: {
              id: '1895382890692545',
            },
            timestamp: 1486464322190,
            message: {
              mid: 'mid.1486464322190:cb04e5a654',
              seq: 339979,
              text: '測試了',
            },
          },
        ],
      },
    ],
  },
};

const ACCESS_TOKEN = 'asdfghj';

let _graphAPIClient;

beforeEach(() => {
  _graphAPIClient = {
    getUserProfile: jest.fn(),
  };
  FBGraphAPIClient.factory = jest.fn(() => _graphAPIClient);
});

describe('MessengerBot', () => {
  it('init', () => {
    const bot = new MessengerBot({
      accessToken: ACCESS_TOKEN,
      filePath: 'file/path',
    });

    expect(bot).toBeDefined();
  });

  it('handle', () => {
    const bot = new MessengerBot({
      accessToken: ACCESS_TOKEN,
      filePath: 'file/path',
    });

    const mockHandler = jest.fn();

    bot.handle(mockHandler);
    expect(bot._handler).toBe(mockHandler);
  });

  describe('createKoaMiddleware', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls sessionManager init', async () => {
      const bot = new MessengerBot({
        accessToken: ACCESS_TOKEN,
        filePath: 'file/path',
      });

      bot._sessionManager.init = jest.fn(() => Promise.resolve(true));
      bot._sessionManager.createSessionDataIfNotExists = jest.fn(() =>
        Promise.resolve({ existed: true, sessionData: {} }));

      bot.handle(jest.fn());

      const middleware = bot.createKoaMiddleware();

      await middleware({ request, response: {} });
      expect(bot._sessionManager.init).toHaveBeenCalled();
      expect(bot._initialized).toBe(true);
    });

    it('not call sessionManager init if already initialized', async () => {
      const bot = new MessengerBot({
        accessToken: ACCESS_TOKEN,
        filePath: 'file/path',
      });

      bot._sessionManager.init = jest.fn(() => Promise.resolve(true));
      bot._sessionManager.createSessionDataIfNotExists = jest.fn(() =>
        Promise.resolve({ existed: true, sessionData: {} }));

      bot._initialized = true;
      bot.handle(jest.fn());

      const middleware = bot.createKoaMiddleware();

      await middleware({ request, response: {} });
      expect(bot._sessionManager.init).not.toHaveBeenCalled();
    });

    it('getUserProfile if not existed in session', async () => {
      const bot = new MessengerBot({
        accessToken: ACCESS_TOKEN,
        filePath: 'file/path',
      });

      bot._sessionManager.init = jest.fn(() => Promise.resolve(true));
      bot._sessionManager.createSessionDataIfNotExists = jest.fn(() =>
        Promise.resolve({ existed: false, sessionData: {} }));

      bot._graphAPIClient.getUserProfile.mockReturnValueOnce({ data: {} });

      bot._initialized = true;
      bot.handle(jest.fn());

      const middleware = bot.createKoaMiddleware();

      await middleware({ request, response: {} });
      expect(bot._graphAPIClient.getUserProfile).toHaveBeenCalledWith(
        '1412611362105802',
      );
    });

    it('handle getStartedRef', async () => {
      const bot = new MessengerBot({
        accessToken: ACCESS_TOKEN,
        filePath: 'file/path',
      });

      bot._sessionManager.init = jest.fn(() => Promise.resolve(true));
      bot._sessionManager.createSessionDataIfNotExists = jest.fn(() =>
        Promise.resolve({ existed: false, sessionData: {} }));

      bot._graphAPIClient.getUserProfile.mockReturnValueOnce({ data: {} });

      bot._initialized = true;

      const handler = jest.fn();
      bot.handle(handler);

      const middleware = bot.createKoaMiddleware();

      const getStartedRefRequest = {
        body: {
          entry: [
            {
              messaging: [
                {
                  sender: {
                    id: '1412611362105802',
                  },
                  postback: {
                    referral: {
                      ref: 'ref',
                    },
                  },
                },
              ],
            },
          ],
        },
      };

      await middleware({ request: getStartedRefRequest, response: {} });
      expect(handler.mock.calls[0][0]._data.user.ref).toBe('ref');
    });

    it('handle normalRef', async () => {
      const bot = new MessengerBot({
        accessToken: ACCESS_TOKEN,
        filePath: 'file/path',
      });

      bot._sessionManager.init = jest.fn(() => Promise.resolve(true));
      bot._sessionManager.createSessionDataIfNotExists = jest.fn(() =>
        Promise.resolve({ existed: false, sessionData: {} }));

      bot._graphAPIClient.getUserProfile.mockReturnValueOnce({ data: {} });

      bot._initialized = true;

      const handler = jest.fn();
      bot.handle(handler);

      const middleware = bot.createKoaMiddleware();

      const normalRefRequest = {
        body: {
          entry: [
            {
              messaging: [
                {
                  sender: {
                    id: '1412611362105802',
                  },
                  referral: {
                    ref: 'ref',
                  },
                },
              ],
            },
          ],
        },
      };

      await middleware({ request: normalRefRequest, response: {} });
      expect(handler.mock.calls[0][0]._data.user.ref).toBe('ref');
    });

    it('throw if no handler', async () => {
      const bot = new MessengerBot({
        accessToken: ACCESS_TOKEN,
        filePath: 'file/path',
      });

      bot._sessionManager.init = jest.fn(() => Promise.resolve(true));
      bot._sessionManager.createSessionDataIfNotExists = jest.fn(() =>
        Promise.resolve({ existed: true, sessionData: {} }));

      bot._initialized = true;

      const middleware = bot.createKoaMiddleware();

      expect(middleware({ request, response: {} }).then).toThrow();
      // will get warning:
      // UnhandledPromiseRejectionWarning:
      // Unhandled promise rejection (rejection id: 12): Error: must have at least 1 handler
    });
  });
});
