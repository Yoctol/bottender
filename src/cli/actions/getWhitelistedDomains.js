/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function getWhitelistedDomains(_configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bottender.config.js';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const { data } = await client.getDomainWhitelist();
    if (data.length) {
      for (let i = 0; i < data[0].whitelisted_domains.length; i++) {
        print(
          `The whitelisted domains is: ${bold(data[0].whitelisted_domains[i])}`
        );
      }
    } else {
      error('Failed to find whitelisted domains setting');
    }
  } catch (err) {
    error('Failed to get whitelisted domains');
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
