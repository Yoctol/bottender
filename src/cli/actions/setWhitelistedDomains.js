/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setWhitelistedDomains(_domains, _configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bottender.config.js';
    const config = getConfig(configPath, platform);
    const domains = _domains || config.domainWhitelist;

    invariant(config.accessToken, 'accessToken is not found in config file');
    invariant(
      domains,
      'domains is required but not found. using -d <array of domain_name> separate by comma(,) to setup or list `domainWhitelist` key it in config file.'
    );
    invariant(Array.isArray(domains), 'domains should be an array');
    invariant(domains.length < 10, 'The domains should less than 10');

    const client = MessengerClient.connect(config.accessToken);
    await client.setDomainWhitelist(domains);

    print(`Successfully set whitelisted domains to ${bold(domains)}`);
  } catch (err) {
    error('Failed to set whitelisted domains');
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
