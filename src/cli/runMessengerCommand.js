import invariant from 'invariant';

import { error, bold } from './shared/log';
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

export default (function runMessengerCommand(command, action, options) {
  const { config } = options;

  switch (command) {
    case 'webhook': {
      const { webhook, verifyToken } = options;

      if (action !== 'set') {
        error(`messenger webhook ${action} is not supported.`);
        process.exit(1);
      }

      invariant(
        webhook,
        '-w --webhook <webhook_url> is required but not found.'
      );
      invariant(
        verifyToken,
        '-v --verifyToken <verify_token> is required but not found.'
      );

      setMessengerWebhook(webhook, config, verifyToken);
      break;
    }
    case 'whitelisted-domains': {
      if (['get', 'set', 'delete'].indexOf(action) > -1) {
        const { domains } = options;

        if (action === 'get') {
          getWhitelistedDomains(config);
        } else if (action === 'set') {
          invariant(
            domains,
            '-d --domains <array of domain_name> is required but not found.'
          );

          setWhitelistedDomains(domains.split(','), config);
        } else {
          deleteWhitelistedDomains(config);
        }
      } else {
        error(`messenger whitelisted-domains ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }
    case 'persistent-menu': {
      if (['get', 'set', 'delete'].indexOf(action) > -1) {
        invariant(
          config,
          '-c --config <config_file_path> is required but not found.'
        );

        if (action === 'get') {
          getPersistentMenu(config);
        } else if (action === 'set') {
          setPersistentMenu(config);
        } else {
          deletePersistentMenu(config);
        }
      } else {
        error(`messenger persistent-menu ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }
    case 'get-started': {
      if (['get', 'set', 'delete'].indexOf(action) > -1) {
        const { payload } = options;

        if (action === 'get') {
          getGetStartedButton(config);
        } else if (action === 'set') {
          setGetStartedButton(payload, config);
        } else {
          deleteGetStartedButton(config);
        }
      } else {
        error(`messenger get-started ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }
    case 'greeting-text': {
      if (['get', 'set', 'delete'].indexOf(action) > -1) {
        const { greetingText } = options;

        if (action === 'get') {
          getGreetingText(config);
        } else if (action === 'set') {
          invariant(
            greetingText,
            '-g --greetingText <greeting_text> is required but not found.'
          );

          setGreetingText(greetingText, config);
        } else {
          deleteGreetingText(config);
        }
      } else {
        error(`messenger greeting-text ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }
    case 'profile': {
      if (action === 'set') {
        setMessengerProfile(config);
      } else {
        error(`messenger profile ${action} is not supported.`);
        process.exit(1);
      }

      break;
    }
    default: {
      error(`unknown messenger command: ${bold(command)}`);
      process.exit(1);
    }
  }
});
