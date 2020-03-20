import Confirm from 'prompt-confirm';
import Table from 'cli-table3';
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getChannelConfig from '../../../shared/getChannelConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import getWebhookFromNgrok from '../../../shared/getWebhookFromNgrok';
import { Channel } from '../../../types';
import { CliContext } from '../..';
import { bold, error, print, warn } from '../../../shared/log';

const help = (): void => {
  console.log(`
    bottender messenger webhook <command> [option]

    ${chalk.dim('Commands:')}

      set                   Set Messenger webhook.

    ${chalk.dim('Options:')}

      -w, --webhook         Webhook callback URL
      --ngrok-port          ngrok port(default: 4040)

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set Messenger webhook URL

      ${chalk.cyan('$ bottender messenger webhook set -w http://example.com')}

    ${chalk.dim('-')} Use specific ngrok port and access token

      ${chalk.cyan('$ bottender messenger webhook set --ngrok-port 4041')}
  `);
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
    const config = getChannelConfig(Channel.Messenger);

    const {
      accessToken,
      appId,
      appSecret,
      verifyToken,
      pageId,
      path = '/webhooks/messenger',
    } = config;

    invariant(
      accessToken,
      '`accessToken` is not found in the `bottender.config.js` file'
    );
    invariant(appId, '`appId` is not found in the `bottender.config.js` file');
    invariant(
      appSecret,
      '`appSecret` is not found in the `bottender.config.js` file'
    );
    invariant(
      verifyToken,
      '`verifyToken` is not found in the `bottender.config.js` file'
    );

    const client = MessengerClient.connect({
      accessToken,
      appId,
      appSecret,
    });

    if (!webhook) {
      warn('We can not find the webhook callback URL you provided.');
      const prompt = new Confirm(
        `Are you using ngrok (get URL from ngrok server on http://127.0.0.1:${ngrokPort})?`
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

    const defaultFields = [
      'messages',
      'messaging_postbacks',
      'messaging_optins',
      'messaging_referrals',
      'messaging_handovers',
      'messaging_policy_enforcement',
    ];

    if (!config.fields) {
      print(
        `\`fields\` is not found in the \`bottender.config.js\` file, we will use ${bold(
          defaultFields.join(', ')
        )} to setup.`
      );
      print(
        'See more on: https://developers.facebook.com/docs/graph-api/reference/app/subscriptions'
      );
    }

    const fields = config.fields || defaultFields;

    const tokenInfo = await client.debugToken();

    invariant(tokenInfo.isValid, 'Page access token is invalid');
    invariant(tokenInfo.type === 'PAGE', 'Access token is not a page token');

    const pageInfo = await client.getPageInfo();

    const table = new Table();

    table.push(
      [chalk.green('Page ID'), pageInfo.id] as any,
      [chalk.green('Page Name'), pageInfo.name] as any,
      [chalk.green('App Name'), tokenInfo.application] as any,
      [
        chalk.green('Token Expires At'),
        tokenInfo.expiresAt === 0
          ? 'Never'
          : new Date(tokenInfo.expiresAt * 1000).toString(),
      ] as any,
      [chalk.green('Token Scopes'), tokenInfo.scopes.join(',')] as any,
      [chalk.green('App Fields'), fields.join(',')] as any,
      [chalk.green('Webhook URL'), webhook] as any
    );

    console.log(table.toString());

    const prompt = new Confirm(
      `Are you sure to create subscription with those settings?`
    );
    const result = await prompt.run();

    if (!result) {
      return;
    }

    const { success } = await client.createSubscription({
      object: 'page',
      callbackUrl: webhook as string,
      verifyToken: verifyToken as string,
      fields,
      accessToken: `${appId}|${appSecret}`,
    });

    invariant(success, 'Setting for webhook is failed');

    print('Successfully set Messenger webhook callback URL');

    if (pageId) {
      const { data } = await client.axios.post(
        `/${pageId}/subscribed_apps?access_token=${accessToken}`,
        {
          subscribedFields: fields.join(','),
        }
      );

      invariant(data.success, 'Subscribing app for page is failed');
    }

    print(
      `Check callback URL on: https://developers.facebook.com/apps/${appId}/webhooks/`
    );
    print(
      `Check selected events on: https://developers.facebook.com/apps/${appId}/messenger/`
    );
  } catch (err) {
    error('Failed to set Messenger webhook');

    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      warn(err.message);
    }

    return process.exit(1);
  }
}

export default async function main(ctx: CliContext): Promise<void> {
  const subcommand = ctx.argv._[2];

  switch (subcommand) {
    // TODO: implement get
    case 'set': {
      await setWebhook(ctx);
      break;
    }
    // TODO: implement delete
    case 'help':
      help();
      break;
    default:
      error(`Please specify a valid subcommand: set`);
      help();
  }
}
