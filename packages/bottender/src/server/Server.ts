import path from 'path';
import url from 'url';
import { IncomingMessage, ServerResponse } from 'http';

import fromEntries from 'fromentries';
import merge from 'lodash/merge';
import { pascalcase } from 'messaging-api-common';

import Bot from '../bot/Bot';
import getBottenderConfig from '../shared/getBottenderConfig';
import {
  Action,
  BottenderConfig,
  Plugin,
  SessionConfig,
  SessionDriver,
} from '../types';

export type ServerOptions = {
  useConsole?: boolean;
  dev?: boolean;
};

function createSessionStore(
  sessionConfig: SessionConfig = { driver: SessionDriver.Memory, stores: {} }
) {
  const sessionDriver = (sessionConfig && sessionConfig.driver) || 'memory';
  let SessionStore;
  switch (sessionDriver) {
    case 'file':
      SessionStore = require('../session/FileSessionStore').default;
      break;
    case 'mongo':
      SessionStore = require('../session/MongoSessionStore').default;
      break;
    case 'redis':
      SessionStore = require('../session/RedisSessionStore').default;
      break;
    default:
      SessionStore = require('../session/MemorySessionStore').default;
  }

  const sessionDriverConfig =
    ((sessionConfig && sessionConfig.stores) || {})[sessionDriver] || {};

  return new SessionStore(
    sessionDriverConfig,
    sessionConfig && sessionConfig.expiresIn
  );
}

class Server {
  useConsole: boolean;

  constructor({ useConsole = false } = {}) {
    this.useConsole = useConsole;
  }

  private handleRequest(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    res.statusCode = 200;
    return this.run(req, res).catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async prepare() {
    // do nothing in production mode
  }

  public getRequestHandler() {
    return this.handleRequest.bind(this);
  }

  protected async run(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    const bottenderConfig = getBottenderConfig();

    const { initialState, plugins, session, channels } = merge(
      bottenderConfig /* , config */
    ) as BottenderConfig;

    const sessionStore = createSessionStore(session);

    // TODO: refine handler entry, improve error message and hint
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
    const Entry: Action<any, any> = require(path.resolve('index.js'));
    let ErrorEntry: Action<any, any>;
    try {
      // eslint-disable-next-line import/no-dynamic-require
      ErrorEntry = require(path.resolve('_error.js'));
    } catch (err) {} // eslint-disable-line no-empty

    function initializeBot(bot: Bot<any, any, any>): void {
      if (initialState) {
        bot.setInitialState(initialState);
      }

      if (plugins) {
        plugins.forEach((plugin: Plugin<any, any>) => {
          bot.use(plugin);
        });
      }

      bot.onEvent(Entry);
      if (ErrorEntry) {
        bot.onError(ErrorEntry);
      }
    }

    if (this.useConsole) {
      const ConsoleBot = require('../console/ConsoleBot').default;

      const bot = new ConsoleBot({
        fallbackMethods: true,
        sessionStore,
      });

      initializeBot(bot);

      bot.createRuntime();

      return;
    }

    const channelBots = Object.entries(channels || {})
      .filter(([, { enabled }]) => enabled)
      .map(([channel, { path: webhookPath, ...channelConfig }]) => {
        // eslint-disable-next-line import/no-dynamic-require
        const ChannelBot = require(`../${channel}/${pascalcase(channel)}Bot`)
          .default;
        const channelBot = new ChannelBot({
          ...channelConfig,
          sessionStore,
        }) as Bot<any, any, any>;

        initializeBot(channelBot);

        return {
          webhookPath: webhookPath || `/webhooks/${channel}`,
          bot: channelBot,
        };
      });

    const { pathname, searchParams } = new url.URL(
      `http://${req.headers.host}${req.url}`
    );

    const query = fromEntries(searchParams.entries());

    for (let i = 0; i < channelBots.length; i++) {
      const { webhookPath, bot } = channelBots[i];

      if (pathname === webhookPath) {
        const result = (bot.connector as any).preprocess({
          method: req.method,
          headers: req.headers,
          query,
          rawBody: (req as any).rawBody,
          body: (req as any).body,
        });

        const { shouldNext } = result;
        let { response } = result;

        if (!shouldNext) {
          if (response) {
            Object.entries(response.headers || {}).forEach(([key, value]) => {
              res.setHeader(key, value as string);
            });
            res.statusCode = response.status || 200;
            res.end(response.body || '');
          } else {
            res.statusCode = 200;
            res.end('');
          }
          return;
        }

        const requestHandler = bot.createRequestHandler();

        // eslint-disable-next-line no-await-in-loop
        response = await requestHandler(
          {
            ...query,
            ...(req as any).body,
          },
          {
            method: req.method as string,
            path: pathname,
            query,
            headers: req.headers as Record<string, string>,
          }
        );

        if (response) {
          Object.entries(response.headers || {}).forEach(([key, value]) => {
            res.setHeader(key, value as string);
          });
          res.statusCode = response.status || 200;
          res.end(response.body || '');
        } else {
          res.statusCode = 200;
          res.end('');
        }
        return;
      }
    }
  }
}

export default Server;
