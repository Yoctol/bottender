import Confirm from 'prompt-confirm';
import invariant from 'invariant';
import { ViberClient, ViberEventType, ViberSender } from 'messaging-api-viber';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import getWebhookFromNgrok from '../../shared/getWebhookFromNgrok';
import { CliContext } from '../..';
import { bold, error, print, warn } from '../../shared/log';

import help from './help';

type ViberConfig = {
  accessToken: string;
  sender: ViberSender;
  eventTypes: ViberEventType[];
  path?: string;
};

export async function setWebhook(ctx: CliContext): Promise<void> {
  const argv = getSubArgs(ctx.argv, {
    '--webhook': String,
    '-w': '--webhook',
    '--ngrok-port': String,
  });

  let webhook = argv['--webhook'];
  const ngrokPort = argv['--ngrok-port'] || '4040';

  try {
    const config: ViberConfig = getConfig('viber');

    const { accessToken, sender, path = '/webhooks/viber' } = config;

    invariant(accessToken, 'accessToken is not found in config file');
    invariant(sender, 'sender is not found in config file');

    const client = ViberClient.connect(
      {
        accessToken,
        sender,
      },
      sender
    );

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

    await client.setWebhook(webhook as string, config.eventTypes);

    print('Successfully set Viber webhook callback URL');
  } catch (err) {
    error('Failed to set Viber webhook');

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
    const config: ViberConfig = getConfig('viber');

    const { accessToken, sender } = config;

    invariant(accessToken, 'accessToken is not found in config file');
    invariant(sender, 'sender is not found in config file');

    const client = ViberClient.connect(
      {
        accessToken,
        sender,
      },
      sender
    );

    await client.removeWebhook();

    print('Successfully delete Viber webhook');
  } catch (err) {
    error('Failed to delete Viber webhook');
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
    case 'set':
      await setWebhook(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteWebhook(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: set, delete`);
      help();
  }
}
