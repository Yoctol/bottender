/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import { bold, error, print } from '../../shared/log';
import { CliContext } from '../..';

const help = () => {
  console.log(`
    bottender messenger get-started <command> [option]

    ${chalk.dim('Commands:')}

      get               Get get_started setting.
      del, delete       Delete get_started setting.

    ${chalk.dim('Options:')}

      -t, --token       Specify Messenger access token.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get get_started setting

      ${chalk.cyan('$ bottender messenger get-started get')}

    ${chalk.dim('-')} Delete get_started setting with specific access token

      ${chalk.cyan(
        '$ bottender messenger get-started delete --token __FAKE_TOKEN__'
      )}
  `);
};

export async function getGetStarted(ctx: CliContext) {
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

    const getStarted = await client.getGetStarted();

    if (getStarted && getStarted.payload) {
      print(`Get started payload is: ${bold(getStarted.payload)}`);
    } else {
      error(`Failed to find ${bold('get_started')} setting`);
    }
    return;
  } catch (err) {
    error(`Failed to get ${bold('get_started')} setting`);
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

export async function deleteGetStarted(ctx: CliContext) {
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

    await client.deleteGetStarted();

    print(`Successfully delete ${bold('get_started')} setting`);
    return;
  } catch (err) {
    error(`Failed to delete ${bold('get_started')} setting`);
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

export default async function main(ctx: CliContext) {
  const subcommand = ctx.argv._[2];

  ctx.argv = getSubArgs(ctx.argv, {
    '--token': String,
    '-t': '--token',
  });

  switch (subcommand) {
    case 'get':
      await getGetStarted(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteGetStarted(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: get, delete`);
      help();
  }
}
