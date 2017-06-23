/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setDomainWhitelist(configPath, domains) {
  try {
    const platform = 'messenger';
    const config = getConfig(configPath, platform);

    invariant(config.accessToken, 'accessToken is not found in config file');
    invariant(domains, 'domains is required but not found.');
    invariant(Array.isArray(domains), 'domains should be an array');
    invariant(domains.length < 10, 'The domains should less than 10');

    const client = MessengerClient.factory(config.accessToken);
    await client.setDomainWhitelist(domains);

    print(`successfully set whitelist to ${bold(domains)}`);
  } catch (err) {
    error('set whitelist error with');
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
