import chalk from 'chalk';

const help = () => {
  console.log(`
    bottender <command>

    ${chalk.dim('Commands:')}

      ${chalk.dim('Platform')}

        messenger   <command>   Manage your Messenger command
        telegram    <command>   Manage your Telegram command
        line        <command>   Manage your LINE command

      ${chalk.dim('Global')}

        init                    Init a bot skeleton
        help                    Show this help

    ${chalk.dim('Configs:')}

        --skip-validate         Skip the config validation

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Init a bot

      ${chalk.cyan('$ bottender init')}

    ${chalk.dim('-')} Get the help

      ${chalk.cyan('$ bottender help')}
      ${chalk.cyan('$ bottender messenger help')}

    ${chalk.dim('-')} Manage the Messenger command

      ${chalk.cyan('$ bottender messenger webhook set')}

    ${chalk.dim('-')} Skip config validation

      ${chalk.cyan('$ bottender messenger profile set --skip-validate')}
  `);
};

export default help;
