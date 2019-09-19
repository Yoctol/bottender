import chalk from 'chalk';

const help = (): void => {
  console.log(`
    bottender viber <command> <action> [options]

    ${chalk.dim('Commands:')}

      webhook   <action>    Manage webhook

    ${chalk.dim('Actions:')}

      set                   Set the property you request
      del, delete           Delete the webhook

    ${chalk.dim('Options:')}

      -w, --webhook         Webhook callback URL
      --ngrok-port          Ngrok port(default: 4040)

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set viber webhook

      ${chalk.cyan('$ bottender viber webhook set -w http://example.com')}
  `);
};

export default help;
