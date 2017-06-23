/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function getGreetingText(configPath) {
  try {
    const platform = 'messenger';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.factory(config.accessToken);

    const { data } = await client.getGreetingText();
    if (data.data.length) {
      print(`greeting text is: ${bold(data.data[0].greeting[0].text)}`);
    } else {
      error('no greeting text setting could be found');
    }
  } catch (err) {
    error('get greeting text error with');
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
