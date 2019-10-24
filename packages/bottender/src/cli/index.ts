import path from 'path';

import camelCase from 'camel-case';
import fs from 'fs-extra';
import get from 'lodash/get';
import updateNotifier from 'update-notifier';
import { Result } from 'arg';

import { error } from '../shared/log';

import getArgs from './providers/sh/utils/getArgs';
import providers from './providers';

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
);

type Provider = 'messenger' | 'telegram' | 'line' | 'viber' | 'sh';

export type CliContext = {
  config: null; // FIXME
  argv: Result<{
    '--help': BooleanConstructor;
    '-h': string;
    '--version': BooleanConstructor;
    '-v': string;
  }>;
};

const main = async (argvFrom2: string[]) => {
  let providerName: Provider;
  let subcommand: string;

  updateNotifier({ pkg }).notify({ defer: false });

  const argv = getArgs(
    argvFrom2,
    {
      '--version': Boolean,
      '-v': '--version',
      '--help': Boolean,
      '-h': '--help',
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
      providerName = argv._[0] as Provider;
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
  const ctx: CliContext = {
    config: null, // FIXME
    argv,
  };

  try {
    const method = get(provider, camelCase(subcommand));
    if (method) {
      await (provider as any)[camelCase(subcommand)](ctx);
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

const handleUnexpected = (err: Error): void => {
  console.error(
    error(`An unexpected error occurred!\n  ${err.stack} ${err.stack}`)
  );
  process.exit(1);
};

const handleRejection = (reason: Error | any): void => {
  if (reason) {
    if (reason instanceof Error) {
      handleUnexpected(reason);
    } else {
      console.error(error(`An unexpected rejection occurred\n  ${reason}`));
    }
  } else {
    console.error(error('An unexpected empty rejection occurred'));
  }
  process.exit(1);
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

main(process.argv.slice(2)).catch(handleUnexpected);
