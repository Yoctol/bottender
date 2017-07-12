/* eslint-disable consistent-return */
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setMessengerProfile(_configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bot.json';
    const {
      accessToken,
      composerInputDisabled = false,
      domainWhitelist,
      greetingText,
      persistentMenu,
      getStartedButtonPayload,
    } = getConfig(configPath, platform);

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

    const graphAPIClient = MessengerClient.connect(accessToken);

    await graphAPIClient.deleteMessengerProfile([
      'persistent_menu',
      'get_started',
    ]);
    // need to seperate 'gretting' fields to another API call
    await graphAPIClient.deleteMessengerProfile(['greeting']);

    if (getStartedButtonPayload) {
      await graphAPIClient.setGetStartedButton(getStartedButtonPayload);
      print('Successfully set getStartedButton');
    }

    if (Array.isArray(persistentMenu)) {
      if (composerInputDisabled) {
        await graphAPIClient.setPersistentMenu(persistentMenu, {
          composerInputDisabled,
        });
      } else {
        await graphAPIClient.setPersistentMenu(persistentMenu);
      }
      print(
        `Successfully set persistentMenu with composerInputDisabled: ${composerInputDisabled}`
      );
    }

    if (greetingText) {
      await graphAPIClient.setGreetingText(greetingText);
      print('Successfully set greetingText');
    }

    if (domainWhitelist) {
      await graphAPIClient.setDomainWhitelist(domainWhitelist);
      print('Successfully set domain whitelist');
    }
  } catch (err) {
    error('set messenger profile error with');
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(`message: ${bold(err.message)}`);
    }
    return process.exit(1);
  }
});
