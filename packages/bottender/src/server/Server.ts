import { IncomingMessage, ServerResponse } from 'http';

import Bot from '../bot/Bot';
import getChannelBotAndRequestContext from '../shared/getChannelBotAndRequestContext';
import getChannelBots from '../shared/getChannelBots';
import getConsoleBot from '../shared/getConsoleBot';

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
    if (this.useConsole) {
      const bot = getConsoleBot();
      bot.createRuntime();
      return;
    }

    this._channelBots = getChannelBots();
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
    const { channelBot, requestContext } =
      getChannelBotAndRequestContext(req) || {};
    if (!channelBot || !requestContext) {
      return;
    }

    const bot = channelBot.bot;

    // eslint-disable-next-line no-await-in-loop
    const result = await (bot.connector as any).preprocess(requestContext);

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
        ...requestContext.query,
        ...requestContext.body,
      },
      requestContext
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
  }
}

export default Server;
