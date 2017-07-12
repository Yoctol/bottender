/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function deletePersistentMenu(_configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bot.json';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deletePersistentMenu();

    print('delete persistent menu successfully');
  } catch (err) {
    error('delete persistent menu error with');
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
