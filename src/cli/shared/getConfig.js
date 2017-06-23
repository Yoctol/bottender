import fs from 'fs';
import path from 'path';

import get from 'lodash/get';

const getConfig = (configPath, platform) => {
  const config = JSON.parse(
    fs.readFileSync(path.resolve(configPath)).toString()
  );
  return get(config, platform, config);
};

module.exports = getConfig;
