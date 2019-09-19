import chalk from 'chalk';

const help = (): void => {
  console.log(`
    bottender messenger <command> <action>

    ${chalk.dim('Commands:')}

      get-started             <action>    Manage get-started
      greeting                <action>    Manage greeting text
      menu, persistent-menu   <action>    Manage persistent-menu
      profile                 <action>    Manage Messenger profile
      webhook                 <action>    Manage webhook
      domains,
      whitelisted-domains     <action>    Manage whitelisted-domains
      persona                 <action>    Manage persona
      attachment              <action>    Manage attachment

    ${chalk.dim('Actions:')}

      set           Set the property you request
      del, delete   Delete the property you request
      help          Show more detail usage for the command

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set the messenger profile

      ${chalk.cyan('$ bottender messenger profile set')}

    ${chalk.dim('-')} Delete the persistent-menu

      ${chalk.cyan('$ bottender messenger persistent-menu del')}

    ${chalk.dim('-')} Show attachment command usage

      ${chalk.cyan('$ bottender messenger attachment help')}
  `);
};

export default help;
