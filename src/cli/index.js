import program from 'commander';
import didYouMean from 'didyoumean';
import invariant from 'invariant';

import pkg from '../../package.json';

import { error, bold } from './shared/log';
import { toAbsolutePath } from './shared/path';
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
import uploadImages from './actions/uploadImages';

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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
    invariant(domains, '-d <array of domain_name> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
    invariant(config, '-p <payload> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
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
    invariant(config, '-c <config_file_path> is required but not found.');
    deleteGreetingText(config);
  });

program
  .command('upload-images <folder>')
  .alias('img')
  .description('upload all images in the folder')
  .option(
    '-o, --output <output_path>',
    'The out path of the upload result json file.'
  )
  .option('-c, --container <container_name>', 'The URL prefix of the file')
  .action((folderPath, { output, container }) => {
    uploadImages({
      folderPath: toAbsolutePath(folderPath),
      outputPath: output,
      container,
    });
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
