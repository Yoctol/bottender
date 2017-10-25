import program from 'commander';
import didYouMean from 'didyoumean';

import pkg from '../../package.json';

import runMessengerCommand from './runMessengerCommand';
import { error, bold } from './shared/log';
import init from './actions/init';
import setTelegramWebhook from './actions/setTelegramWebhook';

program.version(pkg.version);

program
  .command('init')
  .description('Initialize your bot')
  .action(() => {
    init();
  });

program
  .command('messenger')
  .option('-h, --messengerHelp', 'Messenger-specific help')
  .action(options => {
    if (options.messengerHelp) {
      console.log('This is Messenger-specific help');
      process.exit(1);
    }
  });

program
  .command('telegram')
  .option('-h, --telegramHelp', 'Telegram-specific help')
  .action(options => {
    if (options.messengerHelp) {
      console.log('This is Telegram-specific help');
      process.exit(1);
    }
  });

program
  .command('messenger <command> <action>')
  .description('Messenger commands')
  .option(
    '-d, --domains <array of domain_name>',
    'All domains to set whitelisted domains, should separate by comma(,)'
  )
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .option(
    '-p, --payload <payload>',
    'The payload to set for get started button'
  )
  .option('-g, --greetingText <greeting_text>', 'The greeting text of the bot')
  .option('-w, --webhook <webhook_url>', 'The callback URL for webhook.')
  .option(
    '-v, --verifyToken <verify_token>',
    'The verify token for webhook usage.'
  )
  .action((command, action, options) => {
    runMessengerCommand(command, action, options);
  });

program
  .command('telegram <command> <action>')
  .description('Telegram commands')
  .option('-w, --webhook <webhook_url>', 'The callback URL for webhook.')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bottender.config.js`'
  )
  .action((command, action, { webhook, config }) => {
    setTelegramWebhook(webhook, config);
  });

program.on('--help', () => {
  console.log('');
  console.log('  This is Bottender help');
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
