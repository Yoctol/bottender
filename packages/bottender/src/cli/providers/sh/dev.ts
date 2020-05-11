import fs from 'fs';
import path from 'path';

import ngrok from 'ngrok';
import nodemon from 'nodemon';

import getBottenderConfig from '../../../shared/getBottenderConfig';
import { CliContext } from '../..';

import getSubArgs from './utils/getSubArgs';

const dev = async (ctx: CliContext): Promise<void> => {
  const argv = getSubArgs(ctx.argv, {
    '--console': Boolean,
    '--port': Number,
    '--inspect': String,

    // Aliases
    '-c': '--console',
    '-p': '--port',
  });

  const isConsole = argv['--console'] || false;
  const port = argv['--port'] || process.env.PORT || 5000;
  const inspectionUrl = argv['--inspect'];

  const config = getBottenderConfig();

  const { channels } = config;

  let isTypescript = false;
  try {
    isTypescript = Boolean(fs.statSync(path.resolve('tsconfig.json')).isFile);
  } catch {
    // fs.statSync may throw an ENOENT error when file is not found, so keep isTypescript false
  }

  // watch
  nodemon(
    [
      inspectionUrl ? `--inspect=${inspectionUrl} -- ` : '',
      isTypescript ? '--ext js,mjs,json,ts --ignore dist/ ' : '',
      '--exec "',
      isTypescript ? 'tsc && ' : '',
      'bottender start',
      isConsole ? ' --console' : '',
      ` --port ${port}"`,
    ].join('')
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
    let url = '';
    try {
      url = await ngrok.connect(port);
    } catch (err) {
      if (!(err instanceof Error) && err.msg) {
        throw new Error(`ngrok - ${err.msg}`);
      }
      throw err;
    }

    Object.entries(channels || {})
      .filter(([, { enabled }]) => enabled)
      .forEach(([channel, { path: webhookPath }]) => {
        const routePath = webhookPath || `/webhooks/${channel}`;

        console.log(`${channel} webhook URL: ${url}${routePath}`);
      });
  }
};

export default dev;
