/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

import help from './help';

export async function getGetStarted() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);
    const getStarted = await client.getGetStarted();
    if (getStarted && getStarted.payload) {
      print(`Get started payload is: ${bold(getStarted.payload)}`);
    } else {
      error(`Failed to find ${bold('get_started')} setting`);
    }
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

export async function deleteGetStarted() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deleteGetStarted();

    print(`Successfully ${bold('get_started')} setting`);
  } catch (err) {
    error(`Failed to ${bold('get_started')} setting`);
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
      await getGetStarted();
      break;
    case 'delete':
    case 'del':
      await deleteGetStarted();
      break;
    default:
      error(`Please specify a valid subcommand: get, delete`);
      help();
  }
}
