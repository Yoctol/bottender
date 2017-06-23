/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setGreetingText(configPath, greetingText) {
  try {
    const platform = 'messenger';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');
    invariant(
      greetingText,
      'greetingText is required but not found. using -g <greetingText> to setup.'
    );

    const client = MessengerClient.factory(config.accessToken);
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
