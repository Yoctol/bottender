module.exports = {
  session: {
    driver: 'redis',
    stores: {
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
    },
  },
};
