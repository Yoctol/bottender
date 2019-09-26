export default {
  title: 'Viber',
  subcommands: new Set(['help', 'webhook']),
  get webhook() {
    return require('./webhook').default;
  },
  get help() {
    return require('./help').default;
  },
};
