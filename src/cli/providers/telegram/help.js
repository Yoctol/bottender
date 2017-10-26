import chalk from 'chalk';

const help = () => {
  console.log(`
    bottender telegram <command> <action>

    ${chalk.dim('Commands:')}

      webhook   <action>    Manage webhook

    ${chalk.dim('Actions:')}

      set                   Set the property you request

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set telegram webhook

      ${chalk.cyan('$ bottender telegram webhook set -w http://example.com')}
  `);
};

export default help;
