import invariant from 'invariant';

import { error, bold } from './shared/log';
import { setWebhook } from './actions/messenger/webhook';
import {
  getGetStarted,
  deleteGetStarted,
} from './actions/messenger/get-started';
import {
  getPersistentMenu,
  deletePersistentMenu,
} from './actions/messenger/persistent-menu';
import { getGreeting, deleteGreeting } from './actions/messenger/greeting';
import {
  getWhitelistedDomains,
  deleteWhitelistedDomains,
} from './actions/messenger/whitelisted-domains';
import { setProfile } from './actions/messenger/profile';

export default (function runMessengerCommand(command, action, options) {
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

      setWebhook(webhook, verifyToken);
      break;
    }

    case 'whitelisted-domains': {
      if (['get', 'delete'].indexOf(action) > -1) {
        if (action === 'get') {
          getWhitelistedDomains();
        } else if (action === 'delete') {
          deleteWhitelistedDomains();
        }
      } else {
        error(`messenger whitelisted-domains ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }

    case 'persistent-menu': {
      if (['get', 'delete'].indexOf(action) > -1) {
        if (action === 'get') {
          getPersistentMenu();
        } else if (action === 'delete') {
          deletePersistentMenu();
        }
      } else {
        error(`messenger persistent-menu ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }

    case 'get-started': {
      if (['get', 'delete'].indexOf(action) > -1) {
        if (action === 'get') {
          getGetStarted();
        } else if (action === 'delete') {
          deleteGetStarted();
        }
      } else {
        error(`messenger get-started ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }

    case 'greeting': {
      if (['get', 'delete'].indexOf(action) > -1) {
        if (action === 'get') {
          getGreeting();
        } else if (action === 'delete') {
          deleteGreeting();
        }
      } else {
        error(`messenger greeting-text ${action} is not supported.`);
        process.exit(1);
      }
      break;
    }

    case 'profile': {
      if (action === 'set') {
        setProfile();
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
