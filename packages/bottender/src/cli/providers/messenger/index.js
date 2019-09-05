export default {
  title: 'Bottender',
  subcommands: new Set([
    'help',
    'get-started',
    'greeting',
    'persistent-menu',
    'persona',
    'profile',
    'webhook',
    'whitelisted-domains',
  ]),
  get getStarted() {
    return require('./get-started').default;
  },
  get greeting() {
    return require('./greeting').default;
  },
  get persistentMenu() {
    return require('./persistent-menu').default;
  },
  get persona() {
    return require('./persona').default;
  },
  get profile() {
    return require('./profile').default;
  },
  get webhook() {
    return require('./webhook').default;
  },
  get whitelistedDomains() {
    return require('./whitelisted-domains').default;
  },
  get help() {
    return require('./help').default;
  },

  // alias
  get menu() {
    return this.persistentMenu;
  },
  get domains() {
    return this.whitelistedDomains;
  },
};
