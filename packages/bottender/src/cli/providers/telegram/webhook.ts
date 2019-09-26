import Confirm from 'prompt-confirm';
import invariant from 'invariant';
import { TelegramClient } from 'messaging-api-telegram';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import getWebhookFromNgrok from '../../shared/getWebhookFromNgrok';
import { CliContext } from '../..';
import { bold, error, print, warn } from '../../shared/log';

import help from './help';

export async function getWebhook(_: CliContext): Promise<void> {
  try {
    const config = getConfig('telegram');

    const { accessToken } = config;

    invariant(accessToken, 'accessToken is not found in config file');

    const client = TelegramClient.connect({
      accessToken,
    });

    const result = await client.getWebhookInfo();

    Object.entries(result).forEach(([key, value]) => print(`${key}: ${value}`));
  } catch (err) {
    error('Failed to get Telegram webhook');

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

export async function setWebhook(ctx: CliContext): Promise<void> {
  const argv = getSubArgs(ctx.argv, {
    '--webhook': String,
    '-w': '--webhook',
    '--ngrok-port': String,
  });

  const ngrokPort = argv['--ngrok-port'] || '4040';
  let webhook = argv['--webhook'];

  try {
    const config = getConfig('telegram');

    const { accessToken, path = '/webhooks/telegram' } = config;

    invariant(accessToken, 'accessToken is not found in config file');

    const client = TelegramClient.connect({
      accessToken,
    });

    if (!webhook) {
      warn('We can not find the webhook callback url you provided.');
      const prompt = new Confirm(
        `Are you using ngrok (get url from ngrok server on http://127.0.0.1:${ngrokPort})?`
      );
      const result = await prompt.run();
      if (result) {
        webhook = `${await getWebhookFromNgrok(ngrokPort)}${path}`;
      }
    }

    invariant(
      webhook,
      '`webhook` is required but not found. Use -w <webhook> to setup or make sure you are running ngrok server.'
    );

    await client.setWebhook(webhook as string);

    print('Successfully set Telegram webhook callback URL');
  } catch (err) {
    error('Failed to set Telegram webhook');

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

export async function deleteWebhook(_: CliContext): Promise<void> {
  try {
    const config = getConfig('telegram');

    const { accessToken } = config;

    invariant(accessToken, 'accessToken is not found in config file');

    const client = TelegramClient.connect({
      accessToken,
    });

    await client.deleteWebhook();

    print('Successfully delete Telegram webhook');
  } catch (err) {
    error('Failed to delete Telegram webhook');

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
      await getWebhook(ctx);
      break;
    case 'set':
      await setWebhook(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteWebhook(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: get, set, delete`);
      help();
  }
}
