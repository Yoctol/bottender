export default {
  title: 'Bottender',
  subcommands: new Set(['help', 'init', 'test']),
  get init() {
    return require('./init').default;
  },
  get test() {
    return require('./test').default;
  },
  get help() {
    return require('./help').default;
  },
};
