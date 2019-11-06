module.exports = {
  session: {
    driver: 'file',
    stores: {
      file: {
        dirname: '.sessions',
      },
    },
  },
};
