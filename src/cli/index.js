import program from 'commander';
import didYouMean from 'didyoumean';

import pkg from '../../package.json';

import { error, bold } from './shared/log';

program.version(pkg.version);

program.command('*').action(command => {
  error(`unknown command: ${bold(command)}`);
  const commandNames = program.commands
    .map(c => c._name)
    .filter(name => name !== '*');

  const closeMatch = didYouMean(command, commandNames);
  if (closeMatch) {
    error(`did you mean ${bold(closeMatch)}?`);
  }
  process.exit(1);
});

program.parse(process.argv);
