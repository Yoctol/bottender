export default {
  title: 'LINE',
  subcommands: new Set(['menu']),
  get menu() {
    return require('./menu').default;
  },
};
