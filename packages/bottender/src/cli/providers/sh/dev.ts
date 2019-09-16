import ngrok from 'ngrok';
import nodemon from 'nodemon';

import getBottenderConfig from '../../shared/getBottenderConfig';
import { CliContext } from '../..';

import getSubArgs from './utils/getSubArgs';

type BottenderConfig = {
  channels: {
    messenger?: {
      enabled?: boolean;
      path?: string;
      [key: string]: any;
    };
    line?: {
      enabled?: boolean;
      path?: string;
      [key: string]: any;
    };
    slack?: {
      enabled?: boolean;
      path?: string;
      [key: string]: any;
    };
    telegram?: {
      enabled?: boolean;
      path?: string;
      [key: string]: any;
    };
    viber?: {
      enabled?: boolean;
      path?: string;
      [key: string]: any;
    };
  };
};

const dev = async (ctx: CliContext) => {
  const argv = getSubArgs(ctx.argv, {
    '--console': Boolean,
    '--port': Number,

    // Aliases
    '-c': '--console',
    '-p': '--port',
  });

  const isConsole = argv['--console'] || false;
  const port = argv['--port'] || 5000;

  const config: BottenderConfig = getBottenderConfig();

  const { channels = {} } = config;

  // watch
  nodemon(
    `--exec "bottender start ${isConsole ? '--console' : ''} --port ${port}"`
  )
    // TODO: improve messages
    .on('start', () => {
      console.log('App has started');
    })
    .on('quit', () => {
      console.log('App has quit');
      process.exit();
    })
    .on('restart', (files: string[]) => {
      console.log('App restarted due to: ', files);
    });

  if (!isConsole) {
    const url = await ngrok.connect(port);

    Object.entries(channels)
      .filter(([, { enabled }]) => enabled !== false)
      .forEach(([channel, { path: webhookPath }]) => {
        const routePath = webhookPath || `/webhooks/${channel}`;

        console.log(`${channel} webhook url: ${url}${routePath}`);
      });
  }
};

export default dev;
