export default {
  title: 'Line',
  subcommands: new Set(['menu']),
  get menu() {
    return require('./menu').default;
  },
};
