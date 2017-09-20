import path from 'path';

import get from 'lodash/get';

const getConfig = (configPath, platform) => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const config = require(path.resolve(configPath));
    return get(config, platform, config);
  } catch (e) {
    console.error('No module required.');
  }
};

module.exports = getConfig;
