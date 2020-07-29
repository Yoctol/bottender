export default {
  title: 'Bottender',
  subcommands: new Set(['help', 'init', 'start', 'dev', 'worker']),
  get init() {
    return require('./init').default;
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
  get worker() {
    return require('./worker').default;
  },
};
