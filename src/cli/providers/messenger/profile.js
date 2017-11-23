/* eslint-disable consistent-return */
import { MessengerClient } from 'messaging-api-messenger';
import invariant from 'invariant';
import { diff, addedDiff, deletedDiff, updatedDiff } from 'deep-object-diff';

import getConfig from '../../shared/getConfig';
import { print, error, bold, log } from '../../shared/log';

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

export const trimDomain = profile => {
  const clone = Object.assign({}, profile);
  if (clone.whitelisted_domains) {
    clone.whitelisted_domains = clone.whitelisted_domains.map(domain =>
      domain.replace(/\/$/, '')
    );
  }
  return clone;
};

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

export async function setMessengerProfile(ctx) {
  const { force } = ctx.argv;
  try {
    const { accessToken, profile: _profile } = getConfig(
      'bottender.config.js',
      'messenger'
    );

    invariant(accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(accessToken);

    if (force) {
      await client.deleteMessengerProfile(FIELDS);
      print(
        `Successfully delete all ${bold(
          'messenger_profile'
        )} settings due to ${bold('--force')} option`
      );

      await client.setMessengerProfile(_profile);
      print(`Successfully set ${bold('messenger_profile')} settings`);
    } else {
      const [_existedProfile] = await client.getMessengerProfile(FIELDS);

      const profile = trimDomain(_profile);
      const existedProfile = trimDomain(_existedProfile);

      const diffResult = diff(existedProfile, profile);
      if (Object.keys(diffResult).length !== 0) {
        const shouldDeleteProfile = deletedDiff(existedProfile, profile);
        const shouldSetProfile = {
          ...addedDiff(existedProfile, profile),
          ...updatedDiff(existedProfile, profile),
        };
        if (Object.keys(shouldDeleteProfile).length > 0) {
          await client.deleteMessengerProfile(Object.keys(shouldDeleteProfile));
          const deleteFileds = Object.keys(shouldDeleteProfile).join(', ');
          print(`Successfully delete ${bold(deleteFileds)} settings`);
        }
        if (Object.keys(shouldSetProfile).length > 0) {
          await client.setMessengerProfile(shouldSetProfile);
          const setFields = Object.keys(shouldSetProfile).join(', ');
          print(`Successfully set ${bold(setFields)} settings`);
        }
      } else {
        print(`No change apply because the profile settings is the same.`);
      }
    }

    log(
      `You can use ${bold(
        'bottender messenger profile get'
      )} to see the full profile setting.`
    );
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
      await setMessengerProfile(ctx);
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
