import chalk from 'chalk';

const help = () => {
  console.log(`
    bottender viber <command> <action> [options]

    ${chalk.dim('Commands:')}

      webhook   <action>    Manage webhook

    ${chalk.dim('Actions:')}

      set                   Set the property you request
      del, delete           Delete the webhook

    ${chalk.dim('Options:')}

      -w                    Webhook callback URL
      -e                    The types of Viber events. Seperate events by comma (e.g. delivered,seen)

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set viber webhook

      ${chalk.cyan(
        '$ bottender viber webhook set -w http://example.com -e delivered,seen'
      )}
  `);
};

export default help;
