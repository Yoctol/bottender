module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500, // The maximum size of the cache, default will be 500.
      },
    },
  },
};
