import Server, { ServerOptions } from './server/Server';

type BottenderServerOptions = ServerOptions & {
  /**
   * Whether to launch Bottender in dev mode - @default false
   */
  dev?: boolean;
};

function bottender(options: BottenderServerOptions): Server {
  if (options.dev) {
    const DevServer = require('./server/DevServer').default;
    return new DevServer(options);
  }

  return new Server(options);
}

export default bottender;
