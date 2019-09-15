import Confirm from 'prompt-confirm';
import Table from 'cli-table3';
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import getWebhookFromNgrok from '../../shared/getWebhookFromNgrok';
import { bold, error, print, warn } from '../../shared/log';
import { CliContext } from '../..';

const help = () => {
  console.log(`
    bottender messenger webhook <command> [option]

    ${chalk.dim('Commands:')}

      set                   Set Messenger webhook.

    ${chalk.dim('Options:')}

      -w, --webhook         Webhook callback URL
      -v, --verify-token    Verify token
      -t, --token           Specify Messenger access token
      --ngrok-port          Ngrok port(default: 4040)

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set Messenger webhook url

      ${chalk.cyan('$ bottender messenger webhook set -w http://example.com')}

    ${chalk.dim('-')} Set verify token

      ${chalk.cyan('$ bottender messenger webhook set -v abc123')}

    ${chalk.dim('-')} Use specific ngrok port and access token

      ${chalk.cyan(
        '$ bottender messenger webhook set --ngrok-port 4041 --token __FAKE_TOKEN__'
      )}
  `);
};

export async function setWebhook(
  accessToken: string,
  webhook: string,
  verifyToken: string,
  ngrokPort = '4040'
) {
  try {
    const config = getConfig('messenger');

    if (accessToken === undefined) {
      invariant(config.accessToken, 'accessToken is not found in config file');
      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect({
      appId: config.appId,
      appSecret: config.appSecret,
      accessToken,
    });

    const defaultFields = [
      'messages',
      'messaging_postbacks',
      'messaging_optins',
      'messaging_referrals',
      'messaging_handovers',
      'messaging_policy_enforcement',
    ];

    if (!webhook) {
      warn('We can not find the webhook callback url you provided.');
      const prompt = new Confirm(
        `Are you using ngrok (get url from ngrok server on http://127.0.0.1:${ngrokPort})?`
      );
      const result = await prompt.run();
      if (result) {
        webhook = await getWebhookFromNgrok(ngrokPort);
      }
    }

    verifyToken = verifyToken || config.verifyToken;

    invariant(config.appId, '`appId` is not found in config file');
    invariant(config.appSecret, '`appSecret` is not found in config file');
    invariant(
      verifyToken,
      '`verifyToken` is required but not found. using -v <verifyToken> to setup or list `verifyToken` key it in config file.'
    );
    invariant(
      webhook,
      '`webhook` is required but not found. Use -w <webhook> to setup or make sure you are running ngrok server.'
    );

    if (!config.fields) {
      print(
        `\`fields\` is not found in config file, we will use ${bold(
          defaultFields.join(', ')
        )} to setup.`
      );
      print(
        'See more on: https://developers.facebook.com/docs/graph-api/reference/app/subscriptions'
      );
    }

    const fields = config.fields || defaultFields;

    const tokenInfo = await client.debugToken();

    invariant(tokenInfo.is_valid, 'Page access token is invalid');
    invariant(tokenInfo.type === 'PAGE', 'Access token is not a page token');

    const pageInfo = await client.getPageInfo();

    const table = new Table();

    table.push(
      [chalk.green('Page ID'), pageInfo.id],
      [chalk.green('Page Name'), pageInfo.name],
      [chalk.green('App Name'), tokenInfo.application],
      [
        chalk.green('Token Expires At'),
        tokenInfo.expires_at === 0
          ? 'Never'
          : new Date(tokenInfo.expires_at * 1000).toString(),
      ],
      [chalk.green('Token Scopes'), tokenInfo.scopes.join(',')],
      [chalk.green('App Fields'), fields.join(',')],
      [chalk.green('Webhook URL'), webhook]
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
      callback_url: webhook,
      verify_token: verifyToken,
      fields,
      access_token: `${config.appId}|${config.appSecret}`,
    });
    invariant(success, 'Setting for webhook is failed');

    print('Successfully set Messenger webhook callback URL');
    print(
      `Check callback URL on: https://developers.facebook.com/apps/${config.appId}/webhooks/`
    );
    print(
      `Check selected events on: https://developers.facebook.com/apps/${config.appId}/messenger/`
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

export default async function main(ctx: CliContext) {
  const subcommand = ctx.argv._[2];

  ctx.argv = getSubArgs(ctx.argv, {
    '--webhook': String,
    '-w': '--webhook',
    '--verify-token': String,
    '-v': '--verify-token',
    '--token': String,
    '-t': '--token',
    '--ngrok-port': Number,
  });

  switch (subcommand) {
    case 'set': {
      const accessToken = ctx.argv['--token'];
      const webhook = ctx.argv['--webhook'];
      const verifyToken = ctx.argv['--verify-token'];
      const ngrokPort = ctx.argv['--ngrok-port'];

      await setWebhook(accessToken, webhook, verifyToken, ngrokPort);
      break;
    }
    case 'help':
      help();
      break;
    default:
      error(`Please specify a valid subcommand: set`);
      help();
  }
}
