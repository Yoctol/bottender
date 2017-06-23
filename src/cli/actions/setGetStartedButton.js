/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setGetStartedButton(configPath, payload) {
  try {
    const platform = 'messenger';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');
    invariant(
      payload,
      'payload is not found, using -p <YOUR_PAYLOAD> to setup'
    );

    const graphAPIClient = MessengerClient.factory(config.accessToken);

    await graphAPIClient.setGetStartedButton(payload);

    print(`set get started button to ${bold(payload)} successfully`);
  } catch (err) {
    error('set get started button error with');
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
