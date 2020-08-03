import path from 'path';
import url from 'url';
import { IncomingMessage, ServerResponse } from 'http';

import fromEntries from 'object.fromentries';
import invariant from 'invariant';
import merge from 'lodash/merge';
import { match } from 'path-to-regexp';
import { pascalcase } from 'messaging-api-common';

import Bot from '../bot/Bot';
import getBottenderConfig from '../shared/getBottenderConfig';
import getSessionStore from '../shared/getSessionStore';
import { Action, BottenderConfig, Plugin, RequestContext } from '../types';

export type ServerOptions = {
  useConsole?: boolean;
  dev?: boolean;
};

class Server {
  _channelBots: { webhookPath: string; bot: Bot<any, any, any, any> }[] = [];

  useConsole: boolean;

  constructor({ useConsole = false } = {}) {
    this.useConsole = useConsole;
  }

  private handleRequest(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    res.statusCode = 200;
    return this.run(req, res).catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  }

  public async prepare(): Promise<void> {
    const bottenderConfig = getBottenderConfig();

    const { initialState, plugins, channels = {} } = merge(
      bottenderConfig /* , config */
    ) as BottenderConfig;

    const sessionStore = getSessionStore();

    // TODO: refine handler entry, improve error message and hint
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
    const Entry: Action<any, any> = require(path.resolve('index.js'));
    let ErrorEntry: Action<any, any>;
    try {
      // eslint-disable-next-line import/no-dynamic-require
      ErrorEntry = require(path.resolve('_error.js'));
    } catch (err) {} // eslint-disable-line no-empty

    function initializeBot(bot: Bot<any, any, any, any>): void {
      if (initialState) {
        bot.setInitialState(initialState);
      }

      if (plugins) {
        plugins.forEach((plugin: Plugin<any>) => {
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

    const channelBots = (Object.entries(channels) as [string, any][])
      .filter(([, { enabled }]) => enabled)
      .map(
        ([
          channel,
          { path: webhookPath, sync, onRequest, connector, ...connectorConfig },
        ]) => {
          let channelConnector;
          if (
            [
              'messenger',
              'line',
              'telegram',
              'slack',
              'viber',
              'whatsapp',
            ].includes(channel)
          ) {
            // eslint-disable-next-line import/no-dynamic-require
            const ChannelConnector = require(`../${channel}/${pascalcase(
              channel
            )}Connector`).default;
            channelConnector = new ChannelConnector(connectorConfig);
          } else {
            invariant(connector, `The connector of ${channel} is missing.`);
            channelConnector = connector;
          }

          const channelBot = new Bot({
            sessionStore,
            sync,
            onRequest,
            connector: channelConnector,
          }) as Bot<any, any, any, any>;

          initializeBot(channelBot);

          return {
            webhookPath: webhookPath || `/webhooks/${channel}`,
            bot: channelBot,
          };
        }
      );

    this._channelBots = channelBots;
  }

  public getRequestHandler() {
    return this.handleRequest.bind(this);
  }

  protected async run(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    if (this.useConsole) {
      return;
    }

    // TODO: add proxy support in Bottender to apply X-Forwarded-Host and X-Forwarded-Proto
    // conditionally instead of replying on express.
    const hostname = (req as any).hostname || req.headers.host;
    const protocol = (req as any).protocol || 'https';

    const requestUrl = `${protocol}://${hostname}${req.url}`;

    const { pathname, searchParams } = new url.URL(requestUrl);

    const query = fromEntries(searchParams.entries());

    for (let i = 0; i < this._channelBots.length; i++) {
      const { webhookPath, bot } = this._channelBots[i];

      const matchPath = match<Record<string, string>>(webhookPath);
      const matchResult = matchPath(pathname);

      if (matchResult) {
        const httpContext: RequestContext = {
          id: (req as any).id,
          method: req.method as string,
          path: pathname,
          query,
          headers: req.headers,
          rawBody: (req as any).rawBody,
          body: (req as any).body,
          params: matchResult.params,
          url: requestUrl,
        };

        // eslint-disable-next-line no-await-in-loop
        const result = await (bot.connector as any).preprocess(httpContext);

        const { shouldNext } = result;
        let { response } = result;

        if (!shouldNext) {
          if (response) {
            Object.entries(response.headers || {}).forEach(([key, value]) => {
              res.setHeader(key, value as string);
            });
            res.statusCode = response.status || 200;
            if (
              response.body &&
              typeof response.body === 'object' &&
              !Buffer.isBuffer(response.body)
            ) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(response.body));
            } else {
              res.end(response.body || '');
            }
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
          httpContext
        );

        if (response) {
          Object.entries(response.headers || {}).forEach(([key, value]) => {
            res.setHeader(key, value as string);
          });
          res.statusCode = response.status || 200;
          if (response.body && typeof response.body === 'object') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.body));
          } else {
            res.end(response.body || '');
          }
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
