/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient, MessengerTypes } from 'messaging-api-messenger';
import { addedDiff, deletedDiff, diff, updatedDiff } from 'deep-object-diff';
import { omit, pick } from 'lodash';

import getChannelConfig from '../../../shared/getChannelConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import { Channel } from '../../../types';
import { CliContext } from '../..';
import { bold, error, log, print } from '../../../shared/log';

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

export const help = (): void => {
  console.log(`
    bottender messenger profile <action> [option]

    ${chalk.dim('Actions:')}

      get           Get the messenger profile
      set           Set the messenger profile by diff
      del, delete   Delete all the messenger profile fields
      help          Show this help

    ${chalk.dim('Options:')}

      -f, --force   Force update the messenger profile by config

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set the messenger profile

      ${chalk.cyan('$ bottender messenger profile set')}

    ${chalk.dim('-')} Force update the messenger profile

      ${chalk.cyan('$ bottender messenger profile set --force')}
  `);
};

export const trimDomain = (
  profile: MessengerTypes.MessengerProfile
): MessengerTypes.MessengerProfile => {
  const clone = { ...profile };

  if (clone.whitelisted_domains) {
    clone.whitelisted_domains = clone.whitelisted_domains.map(
      (domain: string) => domain.replace(/\/$/, '')
    );
  }

  return clone;
};

export async function getMessengerProfile(_: CliContext): Promise<void> {
  try {
    const config = getChannelConfig(Channel.Messenger);

    const { accessToken } = config;

    invariant(
      accessToken,
      '`accessToken` is not found in the `bottender.config.js` file'
    );

    const client = MessengerClient.connect({
      accessToken,
    });

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

export async function setMessengerProfile(ctx: CliContext): Promise<void> {
  const argv = getSubArgs(ctx.argv, {
    '--force': Boolean,
    '-f': '--force',
  });

  const force = argv['--force'];

  try {
    const config = getChannelConfig(Channel.Messenger);

    const { accessToken } = config;

    invariant(
      accessToken,
      '`accessToken` is not found in the `bottender.config.js` file'
    );

    const { profile: _profile } = getChannelConfig(Channel.Messenger);

    const client = MessengerClient.connect({
      accessToken,
    });

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

export async function deleteMessengerProfile(_: CliContext): Promise<void> {
  try {
    const config = getChannelConfig(Channel.Messenger);

    invariant(
      config.accessToken,
      '`accessToken` is not found in the `bottender.config.js` file'
    );

    const accessToken = config.accessToken;

    const client = MessengerClient.connect({
      accessToken,
    });

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

export default async function main(ctx: CliContext): Promise<void> {
  const subcommand = ctx.argv._[2];

  switch (subcommand) {
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
      error(`Please specify a valid subcommand: get, set, delete, help`);
      help();
  }
}
