import chalk from 'chalk';

const help = () => {
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

    ${chalk.dim('Actions:')}

      set           Set the property you request
      del, delete   Delete the property you request

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set the messenger profile

      ${chalk.cyan('$ bottender messenger profile set')}

    ${chalk.dim('-')} Delete the persistent-menu

      ${chalk.cyan('$ bottender messenger persistent-menu del')}
  `);
};

export default help;
