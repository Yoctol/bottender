/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function getGetStartedButton(_configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bottender.config.js';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');

    const graphAPIClient = MessengerClient.connect(config.accessToken);
    const { data } = await graphAPIClient.getGetStartedButton();
    if (data.length) {
      print(
        `Get started button payload is: ${bold(data[0].get_started.payload)}`
      );
    } else {
      error('Failed to find get started button setting');
    }
  } catch (err) {
    error('Failed to get `get started button`');
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
});
