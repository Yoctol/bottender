import path from 'path';

import get from 'lodash/get';
import importFresh from 'import-fresh';

const getConfig = (configPath, platform) => {
  try {
    const config = importFresh(path.resolve(configPath));
    return get(config, platform, config);
  } catch (e) {
    console.error('No module required.');
  }
};

module.exports = getConfig;
