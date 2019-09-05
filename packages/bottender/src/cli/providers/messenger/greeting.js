/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import { bold, error, print } from '../../shared/log';

const help = () => {
  console.log(`
    bottender messenger greeting <command> [option]

    ${chalk.dim('Commands:')}

      get               Get greeting setting.
      del, delete       Delete greeting setting.

    ${chalk.dim('Options:')}

      -t, --token       Specify Messenger access token.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get greeting setting

      ${chalk.cyan('$ bottender messenger greeting get')}

    ${chalk.dim('-')} Delete greeting setting with specific access token

      ${chalk.cyan(
        '$ bottender messenger greeting delete --token __FAKE_TOKEN__'
      )}
  `);
};

export async function getGreeting(ctx) {
  const token = ctx.argv['--token'];

  let accessToken;

  try {
    if (token) {
      accessToken = token;
    } else {
      const config = getConfig('messenger');

      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

    const greeting = await client.getGreeting();

    if (greeting && greeting[0] && greeting[0].text) {
      print(`The greeting is: ${bold(greeting[0].text)}`);
    } else {
      error(`Failed to find ${bold('greeting')} setting`);
    }
  } catch (err) {
    error(`Failed to get ${bold('greeting')} setting`);
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

export async function deleteGreeting(ctx) {
  const token = ctx.argv['--token'];

  let accessToken;

  try {
    if (token) {
      accessToken = token;
    } else {
      const config = getConfig('messenger');

      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

    await client.deleteGreeting();

    print(`Successfully delete ${bold('greeting')} setting`);
  } catch (err) {
    error(`Failed to delete ${bold('greeting')} setting`);
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

  ctx.argv = getSubArgs(ctx.argv, {
    '--token': String,
    '-t': '--token',
  });

  switch (subcommand) {
    case 'get':
      await getGreeting(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteGreeting(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: get, delete`);
      help();
  }
}
