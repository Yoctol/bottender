import chalk from 'chalk';

const help = (): void => {
  console.log(`
    bottender messenger <command> <action>

    ${chalk.dim('Commands:')}

      profile                 <action>    Manage Messenger profile
      webhook                 <action>    Manage webhook
      persona                 <action>    Manage persona

    ${chalk.dim('Actions:')}

      set           Set the property you request
      del, delete   Delete the property you request
      help          Show more detail usage for the command

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set the messenger profile

      ${chalk.cyan('$ bottender messenger profile set')}
  `);
};

export default help;
