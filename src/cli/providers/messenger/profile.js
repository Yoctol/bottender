/* eslint-disable consistent-return */
import { MessengerClient } from 'messaging-api-messenger';
import invariant from 'invariant';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function getMessengerProfile() {
  console.log('FIXME');
}

export async function setMessengerProfile() {
  try {
    const {
      accessToken,
      composerInputDisabled = false,
      domainWhitelist,
      greetingText,
      persistentMenu,
      getStartedButtonPayload,
    } = getConfig('bottender.config.js', 'messenger');

    const valid = {
      composerInputDisabled: !!composerInputDisabled,
      domainWhitelist: !!domainWhitelist,
      greetingText: !!greetingText,
      persistentMenu: !!persistentMenu,
      getStartedButtonPayload: !!getStartedButtonPayload,
    };

    const positive = [];
    const negative = [];

    Object.keys(valid).forEach(
      key =>
        valid[key]
          ? positive.push(`<${bold(key)}>`)
          : negative.push(`<${bold(key)}>`)
    );

    if (positive.length > 0) {
      print(
        `We found ${positive.join(
          ', '
        )} in your config file and we are trying to setup this value.`
      );
    }

    if (negative.length > 0) {
      print(`And we also support ${negative.join(', ')} in config file.`);
    }

    const client = MessengerClient.connect(accessToken);

    await client.deleteMessengerProfile(['persistent_menu', 'get_started']);
    // need to seperate 'gretting' fields to another API call
    await client.deleteMessengerProfile(['greeting']);

    if (getStartedButtonPayload) {
      await client.setGetStarted(getStartedButtonPayload);
      print('Successfully set getStartedButton');
    }

    if (Array.isArray(persistentMenu)) {
      if (composerInputDisabled) {
        await client.setPersistentMenu(persistentMenu, {
          composerInputDisabled,
        });
      } else {
        await client.setPersistentMenu(persistentMenu);
      }
      print(
        `Successfully set persistentMenu with composerInputDisabled: ${composerInputDisabled}`
      );
    }

    if (greetingText) {
      await client.setGreeting(greetingText);
      print('Successfully set greetingText');
    }

    if (domainWhitelist) {
      await client.setDomainWhitelist(domainWhitelist);
      print('Successfully set whitelisted domains');
    }
  } catch (err) {
    error('Failed to set messenger profile');
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(err.message);
    }
    return process.exit(1);
  }
}

export async function deleteMessengerProfile() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deleteMessengerProfile([
      'account_linking_url',
      'persistent_menu',
      'get_started',
      'greeting',
      'whitelisted_domains',
      'payment_settings',
      'target_audience',
      'home_url',
    ]);

    print(`Successfully delete ${bold('messenger_profile')} settings`);
  } catch (err) {
    error(`Failed to delete ${bold('messenger_profile')} settings`);
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(err.message);
    }
    return process.exit(1);
  }
}

export default async function main(ctx) {
  const subcommand = ctx.argv._[2];
  switch (subcommand) {
    case 'get':
      await getMessengerProfile();
      break;
    case 'set':
      await setMessengerProfile();
      break;
    case 'delete':
    case 'del':
      await deleteMessengerProfile();
      break;
    default:
  }
}
