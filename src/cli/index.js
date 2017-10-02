import program from 'commander';
import didYouMean from 'didyoumean';
import invariant from 'invariant';

import pkg from '../../package.json';

import { error, bold } from './shared/log';
import init from './actions/init';
import deleteWhitelistedDomains from './actions/deleteWhitelistedDomains';
import deleteGetStartedButton from './actions/deleteGetStartedButton';
import deleteGreetingText from './actions/deleteGreetingText';
import deletePersistentMenu from './actions/deletePersistentMenu';
import getWhitelistedDomains from './actions/getWhitelistedDomains';
import getGetStartedButton from './actions/getGetStartedButton';
import getGreetingText from './actions/getGreetingText';
import getPersistentMenu from './actions/getPersistentMenu';
import setWhitelistedDomains from './actions/setWhitelistedDomains';
import setGetStartedButton from './actions/setGetStartedButton';
import setGreetingText from './actions/setGreetingText';
import setMessengerProfile from './actions/setMessengerProfile';
import setPersistentMenu from './actions/setPersistentMenu';
import setMessengerWebhook from './actions/setMessengerWebhook';
import setTelegramWebhook from './actions/setTelegramWebhook';

program.version(pkg.version);

program
  .command('init')
  .description('Initialize your bot')
  .action(() => {
    init();
  });

program
  .command('whitelisted-domains:get')
  .alias('wdg')
  .description('Get `Whitelisted Domains`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    getWhitelistedDomains(config);
  });

program
  .command('whitelisted-domains:set')
  .alias('wds')
  .description('Set `Whitelisted Domains`')
  .option(
    '-d, --domains <array of domain_name>',
    'All domains to set whitelisted domains, should separate by comma(,)'
  )
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config, domains }) => {
    invariant(domains, '-d <array of domain_name> is required but not found.');
    setWhitelistedDomains(domains.split(','), config);
  });

program
  .command('whitelisted-domains:delete')
  .alias('wdd')
  .description('Delete `Whitelisted Domains`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    deleteWhitelistedDomains(config);
  });

program
  .command('persistent-menu:get')
  .alias('pmg')
  .description('Get `Persistent Menu`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    getPersistentMenu(config);
  });

program
  .command('persistent-menu:set')
  .alias('pms')
  .description('Set `Persistent Menu`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    setPersistentMenu(config);
  });

program
  .command('persistent-menu:delete')
  .alias('pmd')
  .description('Delete `Persistent Menu`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    deletePersistentMenu(config);
  });

program
  .command('get-started:get')
  .alias('gsg')
  .description('Get `Get Started Button`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    getGetStartedButton(config);
  });

program
  .command('get-started:set')
  .alias('gss')
  .description('Set `Get Started Button`')
  .option(
    '-p, --payload <payload>',
    'The payload to set for get started button'
  )
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ payload, config }) => {
    setGetStartedButton(payload, config);
  });

program
  .command('get-started:delete')
  .alias('gsd')
  .description('Delete `Get Started Button`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    deleteGetStartedButton(config);
  });

program
  .command('greeting-text:get')
  .alias('gtg')
  .description('Get `Greeting Text`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    getGreetingText(config);
  });

program
  .command('greeting-text:set')
  .alias('gts')
  .description('Set `Greeting Text`')
  .option('-g, --greetingText <greeting_text>', 'The greeting text of the bot')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config, greetingText }) => {
    invariant(greetingText, '-g <greeting_text> is required but not found.');
    setGreetingText(greetingText, config);
  });

program
  .command('greeting-text:delete')
  .alias('gtd')
  .description('Delete `Greeting Text`')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    deleteGreetingText(config);
  });

program
  .command('messenger-profile:set')
  .alias('mps')
  .description('Set `Messenger Profile` from config file')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ config }) => {
    setMessengerProfile(config);
  });

program
  .command('set-messenger-webhook')
  .alias('smwh')
  .description('Set Messenger webhook callback URL')
  .option('-w, --webhook <webhook_url>', 'The callback URL for webhook.')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .option(
    '-v, --verifyToken <verify_token>',
    'The verify token for webhook usage.'
  )
  .action(({ webhook, config, verifyToken }) => {
    setMessengerWebhook(webhook, config, verifyToken);
  });

program
  .command('set-telegram-webhook')
  .alias('stwh')
  .description('Set Telegram webhook callback URL')
  .option('-w, --webhook <webhook_url>', 'The callback URL for webhook.')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action(({ webhook, config }) => {
    setTelegramWebhook(webhook, config);
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
