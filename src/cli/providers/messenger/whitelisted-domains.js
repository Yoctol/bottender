/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';
import chalk from 'chalk';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

const help = () => {
  console.log(`
    bottender messenger whitelisted-domains <command> [option]

    ${chalk.dim('Commands:')}

      get               Get whitelisted-domains setting.
      del, delete       Delete whitelisted-domains setting.

    ${chalk.dim('Options:')}

      -t, --token       Specify Messenger access token.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get whitelisted-domains setting

      ${chalk.cyan('$ bottender messenger whitelisted-domains get')}

    ${chalk.dim('-')} Delete persistent-menu setting with specific access token

      ${chalk.cyan(
        '$ bottender messenger persistent-menu delete --token __FAKE_TOKEN__'
      )}
  `);
};

export async function getWhitelistedDomains(ctx) {
  const { t, token: _token } = ctx.argv;

  let accessToken;

  try {
    if (t || _token) {
      accessToken = t || _token;
    } else {
      const config = getConfig('bottender.config.js', 'messenger');

      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

    const whitelistedDomains = await client.getWhitelistedDomains();
    if (whitelistedDomains) {
      for (let i = 0; i < whitelistedDomains.length; i++) {
        print(`The whitelisted domains is: ${bold(whitelistedDomains[i])}`);
      }
    } else {
      error(`Failed to find ${bold('whitelisted-domains')} setting`);
    }
  } catch (err) {
    error(`Failed to get ${bold('whitelisted-domains')} setting`);
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

export async function deleteWhitelistedDomains(ctx) {
  const { t, token: _token } = ctx.argv;

  let accessToken;

  try {
    if (t || _token) {
      accessToken = t || _token;
    } else {
      const config = getConfig('bottender.config.js', 'messenger');

      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

    await client.deleteWhitelistedDomains();

    print(`Successfully delete ${bold('whitelisted-domains')} setting`);
  } catch (err) {
    error(`Failed to delete ${bold('whitelisted-domains')} setting`);
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
      await getWhitelistedDomains(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteWhitelistedDomains(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: get, delete`);
      help();
  }
}
