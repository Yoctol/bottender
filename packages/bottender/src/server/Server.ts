import { IncomingMessage, ServerResponse } from 'http';

import getChannelBotAndRequestContext from '../shared/getChannelBotAndRequestContext';
import getConsoleBot from '../shared/getConsoleBot';

export type ServerOptions = {
  useConsole?: boolean;
  dev?: boolean;
};

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
    return this.run(req, res).catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  }

  private sendResponse(res: ServerResponse, response: any): void {
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
  }

  public async prepare(): Promise<void> {
    if (this.useConsole) {
      const bot = getConsoleBot();
      bot.createRuntime();
    }
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
      this.sendResponse(res, response);
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

    this.sendResponse(res, response);
  }
}

export default Server;
