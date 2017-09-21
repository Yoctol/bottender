/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setGreetingText(_greetingText, _configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bottender.config.js';
    const config = getConfig(configPath, platform);
    const greetingText = _greetingText || config.greetingText;

    invariant(config.accessToken, 'accessToken is not found in config file');
    invariant(
      greetingText,
      'greetingText is required but not found. using -g <greetingText> to setup or list `greetingText` key it in config file.'
    );

    const client = MessengerClient.connect(config.accessToken);
    await client.setGreetingText(greetingText);

    print(`set greeting text to ${bold(greetingText)} successfully`);
  } catch (err) {
    error('set greeting text error with');
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
