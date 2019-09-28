import childProcess from 'child_process';

import Watchpack from 'watchpack';
import ngrok from 'ngrok';

import getBottenderConfig from '../../shared/getBottenderConfig';
import { CliContext } from '../..';

import getSubArgs from './utils/getSubArgs';

const dev = async (ctx: CliContext): Promise<void> => {
  const argv = getSubArgs(ctx.argv, {
    '--console': Boolean,
    '--port': Number,

    // Aliases
    '-c': '--console',
    '-p': '--port',
  });

  const isConsole = argv['--console'] || false;
  const port = argv['--port'] || 5000;

  const config = getBottenderConfig();

  const { channels } = config;

  const createProcess = () =>
    childProcess.spawn(
      `npx bottender start ${isConsole ? '--console' : ''} --port ${port}`,
      {
        stdio: 'inherit',
      }
    );

  let cp = createProcess();

  const handleExit = (code: number | null) => {
    process.exit(code || undefined);
  };

  cp.on('exit', handleExit);

  const wp = new Watchpack({
    aggregateTimeout: 1000,
    poll: true,
    ignored: ['**/.git', '**/node_modules'],
  });

  wp.watch([], ['.']);

  wp.on('aggregated', (changes, removals) => {
    console.log('App restarted due to: ', changes, removals);
    cp.off('exit', handleExit);
    cp.kill('SIGTERM');

    cp = createProcess();
  });

  const useTypeScript = false; // FIXME

  if (useTypeScript) {
    // watch js and run cp
    // watch ts and compile to dist
  } else {
    // watch all and run cp
  }

  if (!isConsole) {
    const url = await ngrok.connect(port);

    Object.entries(channels || {})
      .filter(([, { enabled }]) => enabled)
      .forEach(([channel, { path: webhookPath }]) => {
        const routePath = webhookPath || `/webhooks/${channel}`;

        console.log(`${channel} webhook url: ${url}${routePath}`);
      });
  }
};

export default dev;
