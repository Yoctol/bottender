import path from 'path';

import invariant from 'invariant';
import get from 'lodash/get';
import importFresh from 'import-fresh';

const getConfig = (configPath, platform) => {
  const config = importFresh(path.resolve(configPath));
  const result = get(config, platform, undefined);
  invariant(
    result,
    `Could not find \`${platform}\` key, please check your config file is in the correct format.`
  );
  return result;
};

module.exports = getConfig;
