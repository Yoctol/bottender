/* eslint-disable consistent-return */
import warning from 'warning';
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

    warning(domainWhitelist, '<domainWhitelist> is not found in config file');
    warning(greetingText, '<greetingText> is not found in config file');
    warning(persistentMenu, '<persistentMenu> is not found in config file');
    warning(
      getStartedButtonPayload,
      '<getStartedButtonPayload> is not found in config file'
    );

    const graphAPIClient = MessengerClient.factory(accessToken);

    await graphAPIClient.deleteMessengerProfile([
      'persistent_menu',
      'get_started',
    ]);
    // need to seperate 'gretting' fields to another API call
    await graphAPIClient.deleteMessengerProfile(['greeting']);

    if (getStartedButtonPayload) {
      await graphAPIClient.setGetStartedButton(getStartedButtonPayload);
      print('successfully set getStartedButton');
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
        `successfully set persistentMenu with composerInputDisabled: ${composerInputDisabled}`
      );
    }

    if (greetingText) {
      await graphAPIClient.setGreetingText(greetingText);
      print('successfully set greetingText');
    }

    if (domainWhitelist) {
      await graphAPIClient.setDomainWhitelist(domainWhitelist);
      print('successfully set domain whitelist');
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
