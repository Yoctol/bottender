export default {
  title: 'LINE',
  subcommands: new Set([]),
  get help() {
    return require('./help').default;
  },
};
