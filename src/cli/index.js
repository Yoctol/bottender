import program from 'commander';
import didYouMean from 'didyoumean';

import pkg from '../../package.json';

import { error, bold } from './shared/log';
import deleteDomainWhitelist from './actions/deleteDomainWhitelist';
import deleteGetStartedButton from './actions/deleteGetStartedButton';
import deleteGreetingText from './actions/deleteGreetingText';
import deletePersistentMenu from './actions/deletePersistentMenu';
import getDomainWhitelist from './actions/getDomainWhitelist';
import getGetStartedButton from './actions/getGetStartedButton';
import getGreetingText from './actions/getGreetingText';
import getPersistentMenu from './actions/getPersistentMenu';
import setDomainWhitelist from './actions/setDomainWhitelist';
import setGetStartedButton from './actions/setGetStartedButton';
import setGreetingText from './actions/setGreetingText';

program.version(pkg.version);

program
  .command('domain-whitelist:get')
  .alias('dwg')
  .description('get domain whitelist')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    getDomainWhitelist(config);
  });

program
  .command('domain-whitelist:set')
  .alias('dws')
  .description('set domains whitelist')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .option(
    '-d, --domains <array of domain_name>',
    'All domains to set domains whitelist, should separate by comma(,)'
  )
  .action(({ config, domains }) => {
    setDomainWhitelist(config, domains.split(','));
  });

program
  .command('domain-whitelist:delete')
  .alias('dwd')
  .description('delete domain whitelist')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    deleteDomainWhitelist(config);
  });

program
  .command('persistent-menu:get')
  .alias('pmg')
  .description('get persistent menu')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    getPersistentMenu(config);
  });

program
  .command('persistent-menu:delete')
  .alias('pmd')
  .description('delete persistent menu')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    deletePersistentMenu(config);
  });

program
  .command('get-started:get')
  .alias('gsg')
  .description('get get started button')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    getGetStartedButton(config);
  });

program
  .command('get-started:set')
  .alias('gss')
  .description('set get started button')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .option(
    '-p, --payload <payload>',
    'The payload to set for get started button'
  )
  .action(({ config, payload }) => {
    setGetStartedButton(config, payload);
  });

program
  .command('get-started:delete')
  .alias('gsd')
  .description('delete get started button')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    deleteGetStartedButton(config);
  });

program
  .command('greeting-text:get')
  .alias('gtg')
  .description('get greeting text')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    getGreetingText(config);
  });

program
  .command('greeting-text:set')
  .alias('gts')
  .description('set greeting text for specific project')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .option('-g, --greetingText <greeting_text>', 'The greeting text of the bot')
  .action(({ config, greetingText }) => {
    setGreetingText(config, greetingText);
  });

program
  .command('greeting-text:delete')
  .alias('gtd')
  .description('delete greeting text')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project.'
  )
  .action(({ config }) => {
    deleteGreetingText(config);
  });

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
