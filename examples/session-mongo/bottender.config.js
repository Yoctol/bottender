module.exports = {
  session: {
    driver: 'mongo',
    stores: {
      mongo: {
        url: 'mongodb://localhost:27017',
        collectionName: 'sessions',
      },
    },
  },
};
