import initializeServer from '../../../initializeServer';
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

  const isConsole = argv['--console'] || false;
  const port = argv['--port'] || 5000;

  const server = initializeServer({ isConsole });

  if (server) {
    server.listen(port, () => {
      console.log(`server is running on ${port} port...`);
    });
  }
};

export default start;
