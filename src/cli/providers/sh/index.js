export default {
  title: 'Bottender',
  subcommands: new Set(['help', 'init']),
  get init() {
    return require('./init').default;
  },
  get help() {
    return require('./help').default;
  },
};
