import chalk from 'chalk';

const help = () => {
  console.log(`
    bottender telegram <command> <action> [options]

    ${chalk.dim('Commands:')}

      webhook   <action>    Manage webhook

    ${chalk.dim('Actions:')}

      get                   Get the webhook information
      set                   Set the property you request
      del, delete           Delete the webhook

    ${chalk.dim('Options:')}

      -w                    Webhook callback URL
      -t, --token           Specify Telegram access token.
      --ngrok-port          Ngrok port(default: 4040)

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set telegram webhook

      ${chalk.cyan('$ bottender telegram webhook set -w http://example.com')}
  `);
};

export default help;
