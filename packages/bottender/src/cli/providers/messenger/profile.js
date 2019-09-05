/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';
import { addedDiff, deletedDiff, diff, updatedDiff } from 'deep-object-diff';
import { omit, pick } from 'lodash';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import { bold, error, log, print } from '../../shared/log';

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

export const help = () => {
  console.log(`
    bottender messenger profile <action> [option]

    ${chalk.dim('Actions:')}

      check         Check if messenger profile setting in bottender.config.js valids
      get           Get the messenger profile
      set           Set the messenger profile by diff
      del, delete   Delete all the messenger profile fields
      help          Show this help

    ${chalk.dim('Options:')}

      -f, --force   Force update the messenger profile by config
      -t, --token   Specify Messenger access token.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set the messenger profile

      ${chalk.cyan('$ bottender messenger profile set')}

    ${chalk.dim('-')} Force update the messenger profile

      ${chalk.cyan('$ bottender messenger profile set --force')}
  `);
};

export const trimDomain = profile => {
  const clone = { ...profile };
  if (clone.whitelisted_domains) {
    clone.whitelisted_domains = clone.whitelisted_domains.map(domain =>
      domain.replace(/\/$/, '')
    );
  }
  return clone;
};

export function checkMessengerProfile() {
  try {
    getConfig('messenger');
    print('Messenger profile check done.');
  } catch (e) {
    error(e.message);
    return process.exit(1);
  }
}

export async function getMessengerProfile(ctx) {
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
  const force = ctx.argv['--force'];
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

    const { profile: _profile } = getConfig('messenger');

    const client = MessengerClient.connect(accessToken);

    if (force) {
      await client.deleteMessengerProfile(FIELDS);
      print(
        `Successfully delete all ${bold(
          'messenger_profile'
        )} settings due to ${bold('--force')} option`
      );
      if (_profile.whitelisted_domains) {
        await client.setMessengerProfile(pick(_profile, 'whitelisted_domains'));
        await client.setMessengerProfile(omit(_profile, 'whitelisted_domains'));
      } else {
        await client.setMessengerProfile(_profile);
      }
      print(`Successfully set ${bold('messenger_profile')} settings`);
    } else {
      const [_existedProfile] = await client.getMessengerProfile(FIELDS);

      const profile = trimDomain(_profile);
      const existedProfile = trimDomain(_existedProfile);

      const diffResult = diff(existedProfile, profile);

      if (Object.keys(diffResult).length !== 0) {
        const shouldDeleteFields = Object.keys(
          deletedDiff(existedProfile, profile)
        );

        const shouldSetFields = [
          ...Object.keys(addedDiff(existedProfile, profile)),
          ...Object.keys(updatedDiff(existedProfile, profile)),
        ];

        if (shouldDeleteFields.length > 0) {
          await client.deleteMessengerProfile(shouldDeleteFields);
          const deleteFileds = shouldDeleteFields.join(', ');
          print(`Successfully delete ${bold(deleteFileds)} settings`);
        }

        if (shouldSetFields.length > 0) {
          const shouldSetProfile = pick(profile, shouldSetFields);

          if (shouldSetFields.includes('whitelisted_domains')) {
            await client.setMessengerProfile(
              pick(shouldSetProfile, 'whitelisted_domains')
            );
            await client.setMessengerProfile(
              omit(shouldSetProfile, 'whitelisted_domains')
            );
          } else {
            await client.setMessengerProfile(shouldSetProfile);
          }
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

export async function deleteMessengerProfile(ctx) {
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

  ctx.argv = getSubArgs(ctx.argv, {
    '--token': String,
    '-t': '--token',
    '--force': Boolean,
    '-f': '--force',
  });

  switch (subcommand) {
    case 'check':
      checkMessengerProfile();
      break;
    case 'get':
      await getMessengerProfile(ctx);
      break;
    case 'set':
      await setMessengerProfile(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteMessengerProfile(ctx);
      break;
    case 'help':
      help();
      break;
    default:
      error(`Please specify a valid subcommand: check, get, set, delete, help`);
      help();
  }
}
