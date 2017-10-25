import minimist from 'minimist';
import camelCase from 'camel-case';
import didYouMean from 'didyoumean'; // FIXME

import providers from './providers';
import { error } from './shared/log';

import pkg from '../../package.json'; // FIXME

const main = async argv => {
  console.log(argv);

  // the context object to supply to the providers or the commands
  const ctx = {
    config: null, // FIXME
    argv,
  };

  let providerName;
  let subcommand;

  switch (argv._[0]) {
    case 'messenger':
    case 'telegram':
      providerName = argv._[0];
      subcommand = argv._[1];
      break;
    default:
      providerName = 'sh';
      subcommand = argv._[0];
  }

  const provider = providers[providerName];

  try {
    await provider[camelCase(subcommand)](ctx);
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

main(minimist(process.argv.slice(2))).catch(handleUnexpected);
