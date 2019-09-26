export default {
  title: 'Bottender',
  subcommands: new Set(['help', 'persona', 'profile', 'webhook']),
  get persona() {
    return require('./persona').default;
  },
  get profile() {
    return require('./profile').default;
  },
  get webhook() {
    return require('./webhook').default;
  },
  get help() {
    return require('./help').default;
  },
};
