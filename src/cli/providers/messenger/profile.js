/* eslint-disable consistent-return */
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function setProfile() {
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
      await client.setGetStartedButton(getStartedButtonPayload);
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
      await client.setGreetingText(greetingText);
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

export default async function main(ctx) {
  console.log(ctx);
}
