import path from 'path';

const getConfig = () => {
  // eslint-disable-next-line import/no-dynamic-require
  const config = require(path.resolve('bottender.config.js'));

  return config;
};

module.exports = getConfig;
