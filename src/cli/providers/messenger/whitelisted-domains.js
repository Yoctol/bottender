/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function getWhitelistedDomains() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

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
}

export async function deleteWhitelistedDomains() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deleteDomainWhitelist();

    print('Successfully delete whitelisted domains');
  } catch (err) {
    error('Failed to delete whitelisted domains');
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
}

export default async function main(ctx) {
  const subcommand = ctx.argv._[2];
  switch (subcommand) {
    case 'get':
      await getWhitelistedDomains();
      break;
    case 'delete':
    case 'del':
      await deleteWhitelistedDomains();
      break;
    default:
  }
}
