import camelCase from 'camel-case';
import get from 'lodash/get';
import updateNotifier from 'update-notifier';

import pkg from '../../package.json';

import getArgs from './providers/sh/utils/getArgs';
import providers from './providers';
import { error } from './shared/log';

const main = async _argv => {
  let providerName;
  let subcommand;

  updateNotifier({ pkg }).notify({ defer: false });

  const argv = getArgs(
    _argv,
    {
      '--version': Boolean,
      '-v': '--version',
      '--token': String,
      '-t': '--token',
      '--yes': Boolean,
      '-y': '--yes',
      '--force': Boolean,
      '-f': '--force',
      '--ngrok-port': Number,
      '--webhook': String,
      '-w': '--webhook',
      '--out-file': String,
      '-o': '--out-file',
      '--name': String, // messenger persona
      '--pic': String, // messenger persona
      '--id': String, // messenger persona
      '--skip-validate': String, // getConfig
    },
    {
      permissive: true,
    }
  );

  switch (argv._[0]) {
    case 'messenger':
    case 'telegram':
    case 'line':
    case 'viber':
      providerName = argv._[0];
      subcommand = argv._[1];
      break;
    default:
      providerName = 'sh';
      subcommand = argv._[0];
  }

  if (argv['--version'] || argv._[0] === 'version') {
    console.log(pkg.version);
    process.exit(0);
  }

  const provider = providers[providerName];

  if (argv['--help']) {
    provider.help();
    process.exit(0);
  }

  // the context object to supply to the providers or the commands
  const ctx = {
    config: null, // FIXME
    argv,
  };

  try {
    const method = get(provider, camelCase(subcommand));
    if (method) {
      await provider[camelCase(subcommand)](ctx);
    } else {
      const subcommands = Array.from(provider.subcommands).join(', ');
      error(`Please specify a valid subcommand: ${subcommands}`);
      provider.help();
    }
  } catch (err) {
    console.error(
      error(
        `An unexpected error occurred in provider ${subcommand}: ${err.stack}`
      )
    );
  }
};

const handleUnexpected = err => {
  console.error(
    error(`An unexpected error occurred!\n  ${err.stack} ${err.stack}`)
  );
  process.exit(1);
};

const handleRejection = err => {
  if (err) {
    if (err instanceof Error) {
      handleUnexpected(err);
    } else {
      console.error(error(`An unexpected rejection occurred\n  ${err}`));
    }
  } else {
    console.error(error('An unexpected empty rejection occurred'));
  }
  process.exit(1);
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

main(process.argv.slice(2)).catch(handleUnexpected);
