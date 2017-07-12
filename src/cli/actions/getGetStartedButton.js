/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function getGetStartedButton(_configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bot.json';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');

    const graphAPIClient = MessengerClient.connect(config.accessToken);
    const { data } = await graphAPIClient.getGetStartedButton();
    if (data.length) {
      print(
        `get started button payload is: ${bold(data[0].get_started.payload)}`
      );
    } else {
      error('no get started button setting could be found');
    }
  } catch (err) {
    error('get get started button error with');
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
