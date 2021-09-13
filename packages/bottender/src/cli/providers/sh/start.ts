import * as http from 'http';

import bodyParser from 'body-parser';
import express from 'express';

import bottender from '../../../bottender';
import { CliContext } from '../..';

import getSubArgs from './utils/getSubArgs';

const start = async (ctx: CliContext): Promise<void> => {
  const argv = getSubArgs(ctx.argv, {
    '--console': Boolean,
    '--port': Number,

    // Aliases
    '-c': '--console',
    '-p': '--port',
  });

  const useConsole = argv['--console'] || false;
  const port = argv['--port'] || process.env.PORT || 5000;

  const app = bottender({
    dev: process.env.NODE_ENV !== 'production',
    useConsole,
  });

  const handle = app.getRequestHandler();

  await app.prepare();

  if (useConsole) {
    return;
  }

  const server = express();

  const verify = (
    req: http.IncomingMessage & { rawBody?: string },
    _: http.ServerResponse,
    buf: Buffer
  ) => {
    req.rawBody = buf.toString();
  };
  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`server is running on ${port} port...`);
  });
};

export default start;
