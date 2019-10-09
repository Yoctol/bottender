import chalk from 'chalk';

const help = () => {
  console.log(`
    bottender <command>

    ${chalk.dim('Commands:')}

      ${chalk.dim('Platform')}

        messenger   <command>   Manage your Messenger command
        telegram    <command>   Manage your Telegram command
        line        <command>   Manage your LINE command
        viber       <command>   Manage your Viber command

      ${chalk.dim('Global')}

        init                    Init a bot skeleton
        help                    Show this help

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Init a bot

      ${chalk.cyan('$ bottender init')}

    ${chalk.dim('-')} Get the help

      ${chalk.cyan('$ bottender help')}
      ${chalk.cyan('$ bottender messenger help')}

    ${chalk.dim('-')} Manage the Messenger command

      ${chalk.cyan('$ bottender messenger webhook set')}
  `);
};

export default help;
