export default {
  title: 'Bottender',
  subcommands: new Set(['help', 'init', 'test']),
  get init() {
    return require('./init').default;
  },
  get test() {
    return require('./test').default;
  },
  get start() {
    return require('./start').default;
  },
  get dev() {
    return require('./dev').default;
  },
  get help() {
    return require('./help').default;
  },
};
