import invariant from 'invariant';

import { error, bold } from './shared/log';
import { setWebhook } from './actions/messenger/webhook';
import {
  getGetStarted,
  setGetStarted,
  deleteGetStarted,
} from './actions/messenger/get-started';
import {
  getPersistentMenu,
  setPersistentMenu,
  deletePersistentMenu,
} from './actions/messenger/persistent-menu';
import {
  getGreeting,
  setGreeting,
  deleteGreeting,
} from './actions/messenger/greeting';
import {
  getWhitelistedDomains,
  setWhitelistedDomains,
  deleteWhitelistedDomains,
} from './actions/messenger/whitelisted-domains';
import { setProfile } from './actions/messenger/profile';

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

      setWebhook(webhook, config, verifyToken);
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
          getGetStarted(config);
        } else if (action === 'set') {
          setGetStarted(payload, config);
        } else {
          deleteGetStarted(config);
        }
      } else {
        error(`messenger get-started ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }
    case 'greeting-text': {
      if (['get', 'set', 'delete'].indexOf(action) > -1) {
        const { greeting } = options;

        if (action === 'get') {
          getGreeting(config);
        } else if (action === 'set') {
          invariant(
            greeting,
            '-g --greeting <greeting_text> is required but not found.'
          );

          setGreeting(greeting, config);
        } else {
          deleteGreeting(config);
        }
      } else {
        error(`messenger greeting-text ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }
    case 'profile': {
      if (action === 'set') {
        setProfile(config);
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
