import path from 'path';

import dotenv from 'dotenv';

import { BottenderConfig } from '../types';

dotenv.config();

/**
 * By default, it will try to require the module from `<root>/bottender.config.js`.
 */
const getBottenderConfig = (): BottenderConfig | never => {
  try {
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
    return require(path.resolve('bottender.config.js'));
  } catch (err) {
    // if config is not found, return empty config
    if (err.code && err.code === 'MODULE_NOT_FOUND') {
      return {};
    }

    throw err;
  }
};

export default getBottenderConfig;
