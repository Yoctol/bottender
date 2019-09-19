import chalk from 'chalk';

const help = (): void => {
  console.log(`
    bottender telegram <command> <action> [options]

    ${chalk.dim('Commands:')}

      webhook   <action>    Manage webhook

    ${chalk.dim('Actions:')}

      get                   Get the webhook information
      set                   Set the property you request
      del, delete           Delete the webhook

    ${chalk.dim('Options:')}

      -w, --webhook         Webhook callback URL
      --ngrok-port          Ngrok port(default: 4040)

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set telegram webhook

      ${chalk.cyan('$ bottender telegram webhook set -w http://example.com')}
  `);
};

export default help;
