import path from 'path';

import { BottenderConfig } from './types';

const getConfig = (): BottenderConfig => {
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
  const config = require(path.resolve('bottender.config.js'));

  return config;
};

export default getConfig;
