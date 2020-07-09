import { mocked } from 'ts-jest/utils';

import Bot from '../Bot';
import MemorySessionStore from '../../session/MemorySessionStore';
import { Connector } from '../Connector';

jest.mock('../../session/MemorySessionStore');

const event = {
  rawEvent: {
    message: {
      text: 'hi',
    },
  },
  isMessage: true,
  isText: true,
  message: {
    text: 'hi',
  },
};

const session = {
  user: {
    id: '__id__',
  },
};

const body = {};

const requestContext = {
  method: 'post',
  path: '/webhooks/messengr',
  query: {},
  headers: {},
  rawBody: '{}',
  body: {},
  params: {},
  url: 'https://www.example.com/webhooks/messengr',
};

function App() {}

function setup({
  connector = {
    platform: 'any',
    getUniqueSessionKey: jest.fn(() => '__id__'),
    updateSession: jest.fn(),
    mapRequestToEvents: jest.fn(() => [event]),
    createContext: jest.fn((params) => ({ ...params, session })),
  },
  sessionStore = new MemorySessionStore(),
}: {
  connector?: Connector<any, any>;
  sessionStore?: MemorySessionStore;
} = {}): {
  bot: Bot<any, any, any, any>;
  connector: Connector<any, any>;
  sessionStore: MemorySessionStore;
  onRequest: Function;
} {
  const onRequest = jest.fn();
  const bot = new Bot({
    connector,
    sessionStore,
    sync: true,
    onRequest,
  });

  return {
    bot,
    connector,
    sessionStore,
    onRequest,
  };
}

beforeEach(() => {
  console.error = jest.fn();
});

describe('#connector', () => {
  it('should be the connector provided to the constructor', () => {
    const { bot, connector } = setup({});

    expect(bot.connector).toBe(connector);
  });
});

describe('#sessions', () => {
  it('should be the session store provided to the constructor', () => {
    const { bot, sessionStore } = setup();

    expect(bot.sessions).toBe(sessionStore);
  });
});

describe('#handler', () => {
  it('should be the action registered by onEvent', () => {
    const { bot } = setup();

    expect(bot.handler).toBeNull();

    bot.onEvent(App);

    expect(bot.handler).toBe(App);
  });
});

describe('#createRequestHandler', () => {
  it('should throw when no registered action', () => {
    const { bot } = setup();

    expect(() => bot.createRequestHandler()).toThrow();
  });

  it('requestHandler should throw when be called without a request body', async () => {
    const { bot } = setup();

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();
    let error;

    try {
      // @ts-expect-error
      await requestHandler();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should call updateSession with the session and the event', async () => {
    const { bot, connector, sessionStore } = setup();

    mocked(sessionStore).read.mockResolvedValue(null);

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body);

    expect(connector.updateSession).toBeCalledWith(expect.any(Object), event);
  });

  it('should call the registered action with the context', async () => {
    const { bot, sessionStore } = setup();

    mocked(sessionStore).read.mockResolvedValue(session);

    let receivedContext;
    bot.onEvent(function MyAction(context) {
      receivedContext = context;
    });

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body);

    expect(receivedContext).toEqual(
      expect.objectContaining({
        event,
        isSessionWritten: true,
        session: expect.objectContaining({
          id: 'any:__id__',
          platform: 'any',
          user: session.user,
          lastActivity: expect.any(Number),
        }),
      })
    );
  });

  it('should call the onRequest function with the body and the request context', async () => {
    const { bot, sessionStore, onRequest } = setup();

    mocked(sessionStore).read.mockResolvedValue(session);

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body, requestContext);

    expect(onRequest).toBeCalledWith(body, requestContext);
  });

  it('should return the response in sync mode', async () => {
    const { bot, connector, sessionStore } = setup();

    const ctx = {
      event,
      session,
      response: {
        status: 200,
        headers: {},
        body: null,
      },
    };

    mocked(connector).createContext.mockReturnValue(ctx);
    mocked(sessionStore).read.mockResolvedValue(session);

    bot.onEvent(function MyAction(context) {
      context.response.status = 200;
      context.response.headers = {
        'X-Header': 'x',
      };
      context.response.body = {
        name: 'x',
      };
    });

    const requestHandler = bot.createRequestHandler();

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
    const { bot } = setup();

    bot.onEvent(App);

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
    const { bot, connector } = setup();

    mocked(connector).getUniqueSessionKey.mockReturnValue(null);
    mocked(connector).createContext.mockReturnValue({
      event,
      session: undefined,
    });

    let receivedContext;
    bot.onEvent(function MyAction(context) {
      receivedContext = context;
    });

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body);

    expect(receivedContext).toEqual(
      expect.objectContaining({
        session: undefined,
      })
    );
  });

  it('should handle error thrown by async handler', async () => {
    const { bot } = setup();

    const handler = async () => {
      throw new Error('async handler error');
    };
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    let error;
    try {
      await requestHandler(body);
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();
  });

  it('should handle error thrown by sync handler', async () => {
    const { bot } = setup();

    const handler = () => {
      throw new Error('sync handler error');
    };
    bot.onEvent(handler);

    const requestHandler = bot.createRequestHandler();

    let error;
    try {
      await requestHandler(body);
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();
  });

  it('should call write on sessionStore', async () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1504514594622);

    const { bot, sessionStore } = setup();

    mocked(sessionStore).read.mockResolvedValue(session);

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

    await requestHandler({});

    expect(sessionStore.write).toBeCalledWith('any:__id__', {
      id: 'any:__id__',
      platform: 'any',
      user: session.user,
      lastActivity: Date.now(),
    });
    Date.now = _now;
  });

  it('should work with multiple events in one request', async () => {
    const { bot, connector, sessionStore } = setup();

    const event1 = {
      rawEvent: {
        message: {
          text: 'hi',
        },
      },
      isMessage: true,
      isText: true,
      message: {
        text: 'hi',
      },
    };
    const event2 = {
      rawEvent: {
        message: {
          text: 'hi',
        },
      },
      isMessage: true,
      isText: true,
      message: {
        text: 'hi',
      },
    };

    mocked(connector)
      .getUniqueSessionKey.mockReturnValueOnce('1')
      .mockReturnValueOnce('2');
    mocked(connector).mapRequestToEvents.mockReturnValue([event1, event2]);
    mocked(connector).createContext.mockImplementation((params) => ({
      event: params.event,
      session: params.session,
    }));

    mocked(sessionStore).read.mockResolvedValue(null);

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

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

    expect(connector.updateSession).toBeCalledWith(expect.any(Object), event1);
    expect(connector.updateSession).toBeCalledWith(expect.any(Object), event2);

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
    const { bot } = setup();

    expect(bot.use(function plugin() {})).toBe(bot);
  });

  it('can extend function to context', async () => {
    const { bot } = setup();

    const monkeyPatchFn = jest.fn();

    bot.use(function plugin(context) {
      context.monkeyPatchFn = monkeyPatchFn;
    });

    bot.onEvent(function MyAction(context) {
      context.monkeyPatchFn();
    });

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body);

    expect(monkeyPatchFn).toBeCalled();
  });
});

describe('#onEvent', () => {
  it('should return this', () => {
    const { bot } = setup();

    expect(bot.onEvent(App)).toBe(bot);
  });
});

describe('#onError', () => {
  it('should catch thrown handler error', async () => {
    const { bot } = setup();

    let receivedError;
    let receivedContext;

    const promise = new Promise((resolve) => {
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
    expect(receivedContext).toBeDefined();
  });

  it('should return this', () => {
    const { bot } = setup();

    expect(bot.onError(function HandleError() {})).toBe(bot);
  });
});

describe('#setInitialState', () => {
  it('should return this', () => {
    const { bot } = setup();

    expect(bot.setInitialState({})).toBe(bot);
  });

  it('initialState should be passed to createContext', async () => {
    const { bot, connector } = setup();

    bot.setInitialState({
      a: 1,
      b: {
        x: 2,
      },
    });

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

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
    const { bot, connector } = setup();

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body, requestContext);

    expect(connector.createContext).toBeCalledWith(
      expect.objectContaining({
        requestContext,
      })
    );
  });
});

describe('context life cycle', () => {
  it('should call context.handlerDidEnd when it exists', async () => {
    const handlerDidEnd = jest.fn();

    const { bot, connector } = setup();

    mocked(connector).createContext.mockReturnValue({
      event,
      session: undefined,
      handlerDidEnd,
    });

    bot.onEvent(App);

    const requestHandler = bot.createRequestHandler();

    await requestHandler(body);

    expect(handlerDidEnd).toBeCalled();
  });
});
