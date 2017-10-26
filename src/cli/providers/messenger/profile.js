/* eslint-disable consistent-return */
import { MessengerClient } from 'messaging-api-messenger';
import invariant from 'invariant';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

import help from './help';

const FIELDS = [
  'account_linking_url',
  'persistent_menu',
  'get_started',
  'greeting',
  'whitelisted_domains',
  'payment_settings',
  'target_audience',
  'home_url',
];

export async function getMessengerProfile() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const profile = await client.getMessengerProfile(FIELDS);

    if (profile) {
      print('The profile is:');

      print(`\n${JSON.stringify(profile, null, 2)}`);
    } else {
      error(`Failed to find ${bold('messenger_profile')} setting`);
    }
  } catch (err) {
    error(`Failed to get ${bold('messenger_profile')} settings`);
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

export async function setMessengerProfile() {
  try {
    const { accessToken, profile } = getConfig(
      'bottender.config.js',
      'messenger'
    );

    invariant(accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(accessToken);

    await client.setMessengerProfile(profile);

    print(`Successfully set ${bold('messenger_profile')} settings`);
  } catch (err) {
    error(`Failed to set ${bold('messenger_profile')} settings`);
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

export async function deleteMessengerProfile() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deleteMessengerProfile(FIELDS);

    print(`Successfully delete ${bold('messenger_profile')} settings`);
  } catch (err) {
    error(`Failed to delete ${bold('messenger_profile')} settings`);
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
      await getMessengerProfile();
      break;
    case 'set':
      await setMessengerProfile();
      break;
    case 'delete':
    case 'del':
      await deleteMessengerProfile();
      break;
    default:
      error(`Please specify a valid subcommand: get, set, delete`);
      help();
  }
}
