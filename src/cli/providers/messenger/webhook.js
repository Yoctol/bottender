import Confirm from 'prompt-confirm';
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import getWebhookFromNgrok from '../../shared/getWebhookFromNgrok';
import { bold, error, print, warn } from '../../shared/log';

const help = () => {
  console.log(`
    bottender messenger webhook <command> [option]

    ${chalk.dim('Commands:')}

      set                   Set Messenger webhook.

    ${chalk.dim('Options:')}

      -w                    Webhook callback URL
      -v                    Verify token
      --ngrok-port          Ngrok port(default: 4040)
      -t, --token           Specify Messenger access token

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set Messenger webhook url

      ${chalk.cyan('$ bottender messenger webhook set -w http://example.com')}

    ${chalk.dim('-')} Set verify token

      ${chalk.cyan('$ bottender messenger webhook set -v abc123')}

    ${chalk.dim('-')} Use specific ngrok port and access token

      ${chalk.cyan(
        '$ bottender messenger webhook set --ngrok-port 4041 -token __FAKE_TOKEN__'
      )}
  `);
};

export async function setWebhook(
  accessToken,
  webhook,
  verifyToken,
  ngrokPort = '4040'
) {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    if (accessToken === undefined) {
      invariant(config.accessToken, 'accessToken is not found in config file');
      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

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

    const { success } = await client.createSubscription({
      app_id: config.appId,
      object: 'page',
      callback_url: webhook,
      verify_token: verifyToken,
      fields,
      access_token: `${config.appId}|${config.appSecret}`,
    });
    invariant(success, 'Setting for webhook is failed');

    print('Successfully set Messenger webhook callback URL');
    print(
      `Check callback URL on: https://developers.facebook.com/apps/${
        config.appId
      }/webhooks/`
    );
    print(
      `Check selected events on: https://developers.facebook.com/apps/${
        config.appId
      }/messenger/`
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

export default async function main(ctx) {
  const subcommand = ctx.argv._[2];
  switch (subcommand) {
    case 'set': {
      const accessToken = ctx.argv.t || ctx.argv.token;
      const webhook = ctx.argv.w;
      const verifyToken = ctx.argv.v;
      const ngrokPort = ctx.argv['ngrok-port'];

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
